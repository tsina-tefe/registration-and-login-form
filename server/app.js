require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("./db");
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../public"));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Wabians Family");
});

app.get("/register", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public", "register.html"));
});

app.get("/login", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public", "login.html"));
});

//register a new user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const cryptedpass = await bcrypt.hash(password, 8);
  console.log("post request");

  const insertUser = `
        INSERT INTO wabiOne(name, email, password)
        VALUES (?, ?, ?)
    `;

  db.query(insertUser, [name, email, cryptedpass], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }
      console.log("Insertioin error: ", err);
      return res
        .status(500)
        .json({ message: "Something went wrong, try again later" });
    }
    console.log("all done safe and sound");
    return res.status(201).json("Account created successfully");
  });
});

//login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const getUser = `
        SELECT * FROM wabiOne
        WHERE email = ?
    `;

  db.query(getUser, [email], async (err, results) => {
    if (err) {
      console.log("Error getting user: ", err);
      return res
        .status(500)
        .json({ message: "Something went wrong, please try again later" });
    }

    if (results.length === 0) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login succeffully" });
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

require("dotenv").config({ path: "../.env"});
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT;
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// db.connect((err) => {
//     if(err) {
//         console.log("Connection Error: ", err);
//         process.exit(1);
//     }
//     console.log("Connected to database");

//     db.query("CREATE DATABASE IF NOT EXISTS wabians", (err) => {
//         if(err) {
//             console.log("Error Creating database: ", err);
//             process.exit(1);
//         }
//         console.log("Created database");

//     });
// });

db.connect((err) => {
    if(err) {
        console.log("connection error: ", err);
        process.exit(1);
    }
    console.log("Conneted successfully");

    const createTable = 
    `
        CREATE TABLE IF NOT EXISTS wabiOne (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL)
    `;

    db.query(createTable, (err) => {
        if(err) {
            console.log("Couldn't create table: ", err);
            return res.status(500).json({message: "Something went wrong, try again later"});
        }
        console.log('Created table');
    })
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("Request recieved");
    next();
});

app.get('/', (req, res) => {
    res.status(200).send("Welcome to Wabians Family");
});

//register new user
app.post('/reg', async (req, res) => {
    const {name, email, password} = req.body;
    const cryptedpass = await bcrypt.hash(password, 8);
    console.log('post request');

    const insertUser = 
    `
        INSERT INTO wabiOne(name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(insertUser, [name, email, cryptedpass], (err) => {
        if(err) {
            if(err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({message: "Email already exists"});
            }
            console.log("Insertioin error: ", err);
            return res.status(500).json({message: "Something went wrong, try again later"});
        }
        console.log("all done safe and sound");
        return res.status(201).json("Account created successfully");
    });
});

//login user
app.post('/login', (req, res) => {
    const {email, password} = req.body;

    const getUser = 
    `
        SELECT * FROM wabiOne
        WHERE email = ?
    `;

    db.query(getUser, [email], async (err, results) => {
        if(err) {
            console.log('Error getting user: ', err);
            return res.status(500).json({message: "Something went wrong, please try again later"});
        }

        if(results.length === 0) {
            console.log('User not found');
            return res.status(400).json({message: "Invalid credentials"});
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            console.log("password mismatch");
            return res.status(400).json({message: "Invalid credentials"});
        }

        res.status(200).json({message: "Login succeffully"});
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
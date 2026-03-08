const togglePassword = document.getElementById("togglePassword");
const togglePasswordReEntery = document.getElementById(
  "togglePasswordReEntery",
);
const password = document.getElementById("password");
const form = document.getElementById("loginForm");
const footer = document.querySelector(".footer");

togglePassword.addEventListener("click", function () {
  const isPassword = password.type === "password";
  password.type = isPassword ? "text" : "password";

  icon.classList.toggle("bi-eye");
  icon.classList.toggle("bi-eye-slash");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userCredentials = Object.fromEntries(formData.entries());

  login(userCredentials);
});

async function login(userCredentials) {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message);
    }
    if (!res.ok)
      throw new Error("Something went wrong, please try again later");

    if (res.status === 200) {
      window.location.href = "/public/index.html";
    }
  } catch (err) {
    const errMessage = document.createElement("p");
    errMessage.textContent = err.message;
    errMessage.style.color = "red";
    footer.appendChild(errMessage);

    setTimeout(() => {
      errMessage.remove();
    }, 3000);
  }
}

    const togglePassword = document.getElementById("togglePassword");
    const togglePasswordReEntery = document.getElementById("togglePasswordReEntery");
    const password = document.getElementById("password");
    const form = document.getElementById('loginForm');
    
    togglePassword.addEventListener("click", function () {
        const isPassword = password.type === "password";
        password.type = isPassword ? "text" : "password";

        icon.classList.toggle("bi-eye");
        icon.classList.toggle("bi-eye-slash");
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const userCredentials = Object.fromEntries(formData.entries());

        login(userCredentials);
    });

    async function login(userCredentials) {
        const res = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCredentials)
        });

        const data = await res.json();
        console.log(data);
    }


const togglePassword = document.getElementById("togglePassword");
const togglePasswordReEntery = document.getElementById("togglePasswordReEntery");
const password = document.getElementById("password");
const passwordReEntery = document.getElementById("re-entery");
const icon = togglePassword.querySelector("i");
const iconReEntery = togglePasswordReEntery.querySelector("i");
const passMismatch = document.querySelector('#password-mismatch');
const footer = document.querySelector('.footer');

togglePassword.addEventListener("click", function () {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";

    icon.classList.toggle("bi-eye");
    icon.classList.toggle("bi-eye-slash");
});

togglePasswordReEntery.addEventListener("click", function () {
    const isPassword = passwordReEntery.type === "password";
    passwordReEntery.type = isPassword ? "text" : "password";

    iconReEntery.classList.toggle("bi-eye");
    iconReEntery.classList.toggle("bi-eye-slash");
});

const form = document.querySelector('#registerForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData .get("password");
    const reEntery = formData.get("re-entery");

    

    if(password !== reEntery) {
        passMismatch.classList.add('show');

        setTimeout(() => {
            passMismatch.classList.remove('show');
        }, 4000);
    } else {
        register(Object.fromEntries(formData.entries()));
    }

});

async function register(userDetails) {
    try {
        const res = await fetch('http://localhost:3000/reg', {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        });

        const data = await res.json();

        if(res.status > 401) throw new Error("Something went wrong, try again later");

        else if(res.status === 400) throw new Error(data.message)

        else if(res.status === 201) {
            // const successMessage = document.createElement('p');
            // successMessage.textContent = data;
            // successMessage.style.color = "green";
            // footer.appendChild(successMessage);

            // setTimeout(() => {
            //     successMessage.remove();
            // }, 3000);
            window.alert("Account created successfully");
            window.location.href = "/login.html";
        }
    } catch(err) {
        const errMessage = document.createElement('p');
        errMessage.textContent = err.message;
        errMessage.style.color = "red";
        footer.appendChild(errMessage);

        setTimeout(() => {
            errMessage.remove();
        }, 3000);
}
}
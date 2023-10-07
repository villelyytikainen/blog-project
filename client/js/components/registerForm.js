import api from "../modules/api.js";
import updatePage from "./updatePage.js";

const renderRegisterForm = () => {
    const mainContent = document.querySelector(".main-content");
    const logo = document.createElement("img");
    logo.src = "./img/logo.jpg";
    const formContainer = document.createElement("div");
    formContainer.classList.add("register-form-container");
    formContainer.innerHTML = `
    <h1>Register</h1>
    <form class="register-form">
        <input name="username" type="text" placeholder="Username" class="username-input" required>
        <input name="email" type="email" placeholder="Email" class="email-input" required>
        <input name="password" type="password" placeholder="Password" class="password-input" required>
        <button type="submit" class="submit-register">REGISTER</button>
    </form>
    `;

    mainContent.appendChild(formContainer);
    const registerForm = document.querySelector(".register-form");

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const response = await api.createUser(data);
        const user = await response.data;

        console.log(user);
        console.log(response);

        if (response.status === "success") {
            console.log("reayd to login");
            const loggedUser = await api.loginUser(data);
            localStorage.setItem("user", JSON.stringify(loggedUser));
            console.log(response);
            updatePage();
        }
    });
};

export default renderRegisterForm;

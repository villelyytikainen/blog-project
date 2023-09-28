import api from "../modules/api.js";
import updatePage from "./updatePage.js";

const renderLoginModal = () => {
    const mainContent = document.querySelector(".main-content");
    const modal = document.createElement("div");
    modal.classList.add("modal-container");
    modal.innerHTML = `
            <form class="login-form">
                <label for="username">Username</label>
                <input name="username" type="text"></input>
                <label for="password">Password</label>
                <input name="password" type="password"></input>
                <button type="submit" class="login-submit">Log In</button>
            </form>
    `;

    mainContent.appendChild(modal);
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const user = await api.loginUser(data);
        if (user.loggedIn) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            return data.message;
        }
        mainContent.removeChild(modal);
        updatePage();
    });
};

export default renderLoginModal;

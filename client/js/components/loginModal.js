import api from "../modules/api.js";
import updatePage from "./updatePage.js";

const renderLoginModal = () => {
    const mainContent = document.querySelector(".main-content");
    const modal = document.createElement("div");
    modal.classList.add("modal-container");
    modal.innerHTML = `
            <form class="login-form">
                <h2>Login</h2>
                <input name="username" type="text" placeholder="Username"></input>
                <input name="password" type="password" placeholder="Password"></input>
                <button type="submit" class="login-submit">Log In</button>
            </form>
    `;

    mainContent.appendChild(modal);
    const loginForm = document.querySelector(".login-form");

    document.addEventListener("click", (e) => {
        if (e.target === modal) {
            mainContent.removeChild(modal);
        }
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const user = await api.loginUser(data);

        console.log(user);
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

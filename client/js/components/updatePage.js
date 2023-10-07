import renderUserPage from "./userPage.js";
import renderRegisterForm from "./registerForm.js";
import renderLoginModal from "./loginModal.js";
import renderPostModal from "./postModal.js";

const loginLink = document.querySelector(".login-link");

loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    renderLoginModal();
});

const updatePage = () => {
    const nav = document.querySelector(".nav-buttons");
    const mainContent = document.querySelector(".main-content");
    const profileLink = document.createElement("a");
    const logoutLink = document.createElement("a");
    const addNewPost = document.createElement("button");
    addNewPost.classList.add("add-new-post-button");
    const navChilds = Array.from(nav.childNodes);
    const mainChilds = Array.from(mainContent.childNodes);
    const user = JSON.parse(localStorage.getItem("user"));

    profileLink.textContent = "Profile";
    logoutLink.textContent = "Logout";
    addNewPost.textContent = "Add new";

    if (user !== null && user.loggedIn) {
        navChilds.forEach((element) => element.remove());
        nav.appendChild(addNewPost);
        nav.appendChild(profileLink);
        nav.appendChild(logoutLink);
        Array.from(mainContent.childNodes).forEach((element) =>
            element.remove()
        );
        renderUserPage();

        addNewPost.addEventListener("click", (e) => {
            renderPostModal();
        });

        logoutLink.addEventListener("click", (e) => {
            localStorage.removeItem("user");
            updatePage();
        });
    } else {
        mainChilds.forEach((element) => element.remove());
        navChilds.forEach((element) => element.replaceWith(loginLink));
        renderRegisterForm();
    }
};

export default updatePage;

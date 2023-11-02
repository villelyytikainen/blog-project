import api from "../modules/api.js";
import updatePage from "./updatePage.js";

const renderPostModal = () => {
    const mainContent = document.querySelector(".main-content");
    const modal = document.createElement("div");
    const user = JSON.parse(localStorage.getItem("user"));
    modal.classList.add("modal-container");
    modal.innerHTML = `
            <form class="post-form">
                <h2>Add new post</h2>
                <input name="title" type="text" placeholder="Title"></input>
                <textarea name="content" placeholder="Content"></textarea>
                <button type="submit" class="post-submit">Submit</button>
            </form>
    `;

    mainContent.appendChild(modal);

    document.addEventListener("click", (e) => {
        if (e.target === modal) {
            mainContent.removeChild(modal);
        }
    });

    const postForm = document.querySelector(".post-form");
    postForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const response = await api.createPost({
            userId: user.id,
            title: data.title,
            content: data.content,
        });

        updatePage();
        e.target.remove();
    });
};

export default renderPostModal;

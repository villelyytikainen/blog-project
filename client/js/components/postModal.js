import api from "../modules/api.js";
import updatePage from "./updatePage.js";

const renderPostModal = () => {
    const modal = document.createElement("div");
    const user = JSON.parse(localStorage.getItem("user"));
    modal.classList.add("post-modal-container");
    modal.innerHTML = `
            <form class="post-form">
                <label for="title">Title</label>
                <input name="title" type="text"></input>
                <label for="image-url">Image</label>
                <input name="content" type="Content"></input>
                <button type="submit" class="post-submit">Submit</button>
            </form>
    `;

    document.body.appendChild(modal);

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

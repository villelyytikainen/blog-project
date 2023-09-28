const renderPostModal = () => {
    const modal = document.createElement("div");
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
};

export default renderPostModal;

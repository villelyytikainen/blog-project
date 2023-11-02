import api from "../modules/api.js";

const renderBlogPost = (post) => {
    const postsList = document.querySelector(".posts-list");
    const postItem = document.createElement("li");
    postItem.classList.add("post-item");
    postItem.innerHTML = `
        <h2 class="post-title">${post.title}</h2>
        <p class="post-content">${post.content}</p>
        <div class="post-item-button-container">
            <button class="post-edit-button">Edit</button>
            <button class="post-delete-button">Delete</button>
        </div>
    `;
    postsList.appendChild(postItem);

    postItem.addEventListener("click", async (e) => {
        e.preventDefault();
        const target = e.target;
        const parentNode = target.parentNode;

        if (target.classList.contains("post-edit-button")) {
            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            for (let i = 0; i < 2; ++i) {
                const childInput = document.createElement("input");
                childInput.classList.add(
                    `${postItem.children[i].className}-input`
                );
                childInput.value = postItem.children[i].textContent;

                postItem.children[i].replaceWith(childInput);
            }

            target.replaceWith(saveButton);

            saveButton.addEventListener("click", async (e) => {
                e.preventDefault();
                const newObject = {
                    title: parentNode.children[0].value,
                    content: parentNode.children[1].value,
                };
                console.log(parentNode.children[0].value);
                const response = await api.updatePost(newObject, post);

                const title = document.createElement("h2");
                title.classList.add("post-title");

                const content = document.createElement("p");

                saveButton.replaceWith(target);

                title.textContent = newObject.title;
                postItem.children[0].replaceWith(title);

                content.textContent = newObject.content;
                postItem.children[1].replaceWith(content);
            });
        }

        if (target.classList.contains("post-delete-button")) {
            e.preventDefault();
            await api.deletePost(post);
            postItem.remove();
        }
    });
};

export default renderBlogPost;

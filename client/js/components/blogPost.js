import api from "../modules/api.js";

const renderBlogPost = (post) => {
    const postsList = document.querySelector(".posts-list");
    const postItem = document.createElement("li");
    postItem.classList.add("post-item");
    postItem.innerHTML = `
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image-src" src="${post.img}" />
        <p class="post-content">${post.content}</p>
        <button class="post-edit-button">Edit</button>
        <button class="post-delete-button">Delete</button>
    `;
    postsList.appendChild(postItem);

    const postTitle = document.querySelector(".post-title");
    const postImage = document.querySelector(".post-image-src");
    const postContent = document.querySelector(".post-content");

    postItem.addEventListener("click", async (e) => {
        e.preventDefault();
        const target = e.target;

        if (target.classList.contains("post-edit-button")) {
            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            for (let i = 0; i <= 2; ++i) {
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
                    title: postItem.children[0].value,
                    image: postItem.children[1].value,
                    content: postItem.children[2].value,
                };
                const response = await api.updatePost(newObject, post);

                console.log(response.data);
                saveButton.replaceWith(target);

                postTitle.textContent = newObject.title;
                postItem.children[0].replaceWith(postTitle);

                postImage.src = newObject.image;
                postItem.children[1].replaceWith(postImage);

                postContent.textContent = newObject.content;
                postItem.children[2].replaceWith(postContent);
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

import api from "../modules/api.js";
import renderBlogPost from "./blogPost.js";

const renderUserPage = async (e) => {
    const mainContent = document.querySelector(".main-content");
    const postsContainer = document.createElement("section");
    postsContainer.classList.add("posts-container");

    const postsList = document.createElement("ul");
    postsList.classList.add("posts-list");

    postsContainer.appendChild(postsList);
    mainContent.appendChild(postsContainer);

    await renderPosts();
};

const renderPosts = async (e) => {
    const posts = await api.getPostsByUserId();

    return posts.map((post) => renderBlogPost(post));
};

export default renderUserPage;

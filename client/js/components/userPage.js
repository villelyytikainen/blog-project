import api from "../modules/api.js";

const renderUserPage = async() => {
    const mainContent = document.querySelector('.main-content');
    const postsContainer = document.createElement('div');
    postsContainer.innerHTML = await renderPosts()

    mainContent.appendChild(postsContainer);
}

const renderPosts = async (e) => {
    const posts = await api.getPosts();

    return `
        <ul>
            ${posts.map(post => {
                return `
                    <li>${post.title}</li>
                `
            })}
        </ul>
    `
};

export default renderUserPage;
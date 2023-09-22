import api from './api.js'
import utils from './utils.js'
const {
    createUser,
    loginUser,
    getLoggedStatus,
    getUsers,
    getUserById,
    getPosts,
    createPost,
    updatePost,
    deletePost
} = api;

const { createForm } = utils;
const mainContainer = document.querySelector('.main-content')

//Render buttons in the navigation bar depending on if the user is logged in or logged out
const renderNavButtons = async () => {
    const navBarBtnContainer = document.querySelector('.nav-buttons')
    Array.from(navBarBtnContainer.childNodes).map(e => e.remove())
    let loggedIn = checkUserState();

    if (loggedIn) {
        const buttons = document.createElement('div')
        buttons.classList.add('navigation-buttons')

        const addNewPost = document.createElement('button');
        const maxOlderPosts = 5
        const maxPreviewTextLength = 30
        addNewPost.classList.add('add-new-button');
        addNewPost.textContent = 'Add New';

        addNewPost.addEventListener('click', renderModal);
        navBarBtnContainer.appendChild(addNewPost);

        const logoutBtn = document.createElement('button');
        logoutBtn.classList.add('logout-button');
        logoutBtn.textContent = 'Logout'
        logoutBtn.addEventListener('click', logout);
        navBarBtnContainer.appendChild(logoutBtn);

        buttons.append(addNewPost, logoutBtn)
        navBarBtnContainer.appendChild(buttons)

        const posts = await getPosts();
        if (posts.length < 1) {
            const noPostsText = document.createElement('h1');
            noPostsText.textContent = 'No posts yet';
            mainContainer.appendChild(noPostsText);
        } else {
            const sortedPosts = posts
                .sort((postA, postB) => Date.parse(postB.createdAt) - Date.parse(postA.createdAt))
                .slice(0, maxOlderPosts);
            sortedPosts.forEach(post => renderPost(post, maxPreviewTextLength));
        }
    } else {
        console.log('not logged')
        const buttons = document.createElement('div')
        buttons.classList.add('navigation-buttons')

        const loginButton = document.createElement('button')
        loginButton.classList.add('login-button')
        loginButton.textContent = 'Login'

        const pleaseLogin = document.createElement('h1')
        pleaseLogin.textContent = 'Please login'

        const registerButton = document.createElement('button')
        registerButton.classList.add('register-button')
        registerButton.textContent = 'Register'

        registerButton.addEventListener('click', renderModal)
        loginButton.addEventListener('click', renderModal)

        buttons.append(loginButton, registerButton)
        navBarBtnContainer.appendChild(buttons)
    }
};

//Render login modal using the utility function 'CreateForm'
const renderLoginModal = () => {
    const fields = [
        { label: 'Username', name: 'username' },
        { label: 'Password', name: 'password', type: 'password' },
    ];
    //Title, input fields, submit button text, the desired function
    createForm('Login', fields, 'Login', loginUser);
};

//Render register modal using the utility function 'CreateForm'
const renderRegisterModal = () => {
    const fields = [
        { label: 'Username', name: 'username' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Email', name: 'email', type: 'email' },
    ];
    //Title, input fields, submit button text, the desired function
    createForm('Register', fields, 'Register', createUser);
};

//Render new post modal using the utility function 'CreateForm'
const renderNewPostModal = (e) => {

    const fields = [
        { label: 'Title', name: 'title', required: true },
        { label: 'Image', name: 'image', type: 'url' },
        { label: 'Content', name: 'content', class: 'modal-content', required: true }
    ]

    //Title, input fields, submit button text, the desired function
    createForm('Add new post', fields, 'Submit', createPost);
};

//Render particular modal depending on what button user presses
const renderModal = (e) => {

    console.log('render modal', e.target.className)

    switch (e.target.className) {
        case 'register-button':
            renderRegisterModal()
            break;
        case 'login-button':
            renderLoginModal()
            break;
        case 'add-new-button':
            renderNewPostModal()
            break;
    }
};

//Update post item into edit mode
const editPost = (element, post, event) => {
    console.log(post)
    const itemTitle = element.children[0]
    const itemContent = element.children[1].nodeName.toLowerCase() === 'p' ? event.target.parentNode.parentNode.children[1] : null
    const itemImage = element.children[2]
    const editButton = event.target

    const titleInput = document.createElement('input')
    titleInput.value = itemTitle.textContent

    const contentInput = document.createElement('input')
    contentInput.value = itemContent.textContent

    const imageInput = document.createElement('input')
    imageInput.value = itemImage.textContent

    const saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

    console.log(event.target.parentNode.parentNode)

    itemTitle.replaceWith(titleInput)
    itemContent.replaceWith(contentInput)
    itemImage.replaceWith(imageInput)
    editButton.replaceWith(saveButton)


    const savePost = async (event) => {
        const modifiedItem = {
            title: titleInput.value,
            content: contentInput.value,
            imageSrc: imageInput.value
        }

        updatePost(modifiedItem, post)

        itemTitle.textContent = modifiedItem.title
        itemContent.textContent = modifiedItem.content
        itemImage.textContent = modifiedItem.imageSrc

        saveButton.replaceWith(editButton)
        titleInput.replaceWith(itemTitle)
        contentInput.replaceWith(itemContent)
        imageInput.replaceWith(itemImage)

    }

    saveButton.addEventListener('click', savePost)
}

//Render posts
const renderPost = (post, maxPreviewTextLength) => {
    const olderPostsList = document.querySelector('.older-posts');
    const latestPosts = document.querySelector('.latest-posts')
    const item = document.createElement('li')
    item.classList.add('post-item')

    const itemTitle = document.createElement('h2')
    itemTitle.classList.add('post-item-title')
    itemTitle.textContent = post.title

    const itemBody = document.createElement('p')
    itemBody.classList.add('post-item-body')
    itemBody.textContent = post.content.length <= maxPreviewTextLength ? post.content : `${post.content.slice(0, maxPreviewTextLength)}...`

    const itemImg = document.createElement('img')
    itemImg.classList.add('post-item-img')
    itemImg.src = post.image

    const buttonContainer = document.createElement('div')
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'

    buttonContainer.append(editBtn, deleteBtn)
    item.append(itemTitle, itemBody, itemImg, buttonContainer)

    editBtn.addEventListener('click', (event) => editPost(item, post, event))
    deleteBtn.addEventListener('click', (event) => deletePost(item, post, event))

    if (latestPosts.children.length < 4) {
        latestPosts.appendChild(item)
    }
    else {
        const olderItem = document.createElement('li')
        olderItem.append(itemTitle, itemBody)
        olderItem.setAttribute('class', 'post-item-older')
        olderPostsList.appendChild(olderItem)
    }
}

const checkUserState = () => {
    const token = localStorage.getItem('token')
    return token !== null
}

const login = () => {

}

const logout = () => {
    localStorage.removeItem('token')
    renderNavButtons()
}

export default {
    renderNavButtons
}

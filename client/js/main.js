import api from './modules/api.js'
import utils from './modules/utils.js'

const {
    createUser,
    getUsers,
    getUserById,
    getPosts,
    createPost,
    updatePost
} = api;

const { createForm } = utils;
const mainContainer = document.querySelector('.main-content')

//Render buttons in the navigation bar
const renderNavButtons = async () => {
    const navBarBtnContainer = document.querySelector('.nav-buttons')
    let userLoggedIn = false;
    if (userLoggedIn) {
        const addNewPost = document.createElement('button');
        const maxOlderPosts = 5
        const maxPreviewTextLength = 30
        addNewPost.classList.add('new-post-button');
        addNewPost.textContent = 'Add New';

        addNewPost.addEventListener('click', renderModal);
        navBarBtnContainer.appendChild(addNewPost);

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
        const buttons = document.createElement('div')

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
        mainContainer.appendChild(pleaseLogin)
    }
};

//Render login modal using the utility function 'CreateForm'
const renderLoginModal = () => {
    const fields = [
        { label: 'Username', name: 'username' },
        { label: 'Password', name: 'password', type: 'password' },
    ];

    const loginForm = createForm('Login', fields, 'Login', (data) => {
        // login user
    });

    mainContainer.appendChild(loginForm);
};

//Render register modal using the utility function 'CreateForm'
const renderRegisterModal = () => {
    const fields = [
        { label: 'Username', name: 'username' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Email', name: 'email', type: 'email' },
    ];

    const registerForm = createForm('Register', fields, 'Register', createUser);

    mainContainer.appendChild(registerForm);
};

const renderNewPostModal = (e) => {

    const modalContainer = document.createElement("div");
    const modalForm = document.createElement("form");
    const body = document.body;

    modalForm.setAttribute("class", "modal-form");
    modalContainer.setAttribute("class", "modal-container");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";

    const title = document.createElement("input");
    title.setAttribute("name", "title");
    title.required = true;

    const imageLabel = document.createElement("label");
    imageLabel.textContent = "Image";

    const image = document.createElement("input");
    image.setAttribute("name", "image");
    image.required = true;

    const contentLabel = document.createElement("label");
    contentLabel.textContent = "Content";

    const content = document.createElement("textarea");
    content.setAttribute("name", "content");
    content.classList.add("modal-content");
    content.required = true;

    const submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.classList.add("modal-submit-btn");

    modalForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const item = Object.fromEntries(formData.entries());
        createPost(item).then((data) => renderPost(data));
    });

    modalForm.append(
        titleLabel,
        title,
        imageLabel,
        image,
        contentLabel,
        content,
        submit
    );

    modalContainer.appendChild(modalForm);
    body.appendChild(modalContainer);

    modalContainer.addEventListener("click", (e) => {
        if (modalContainer !== e.target) return;
        body.removeChild(modalContainer);
    });
};

//Render particular modal depending on what button user presses
const renderModal = (e) => {

    switch (e.target.className) {
        case 'register-button':
            console.log('register')
            renderRegisterModal()
            break;
        case 'login-button':
            console.log('login')
            renderLoginModal()
            break;
        case 'new-post-button':
            console.log('add new')
            renderNewPostModal()
            break;
    }
};

//Update post item into edit mode
const editItem = (element, post, event) => {
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


    const saveItem = async (event) => {
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

    saveButton.addEventListener('click', saveItem)
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

    editBtn.addEventListener('click', (event) => editItem(item, post, event))
    deleteBtn.addEventListener('click', (event) => deleteItem(item, post, event))

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

document.addEventListener('DOMContentLoaded', () => {

    renderNavButtons()
})




const router = async () => {
    const routes = [
        { path: '/', view: () => console.log('dash') },
        { path: '/posts', view: () => console.log('posts') },
        { path: '/settings', view: () => console.log('settings') }
    ]

    //test each rroute for potential match
    const potentialMatch = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatch.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        }
    }

    console.log(potentialMatch)
}

document.addEventListener('DOMContentLoaded', () => router())

const olderPostsList = document.querySelector('.older-posts');
const latestPosts = document.querySelector('.latest-posts')
const mainContainer = document.querySelector('.main-content')
const navBarBtnContainer = document.querySelector('.nav-buttons')
const maxOlderPosts = 5
const maxPreviewTextLength = 30
let userLoggedIn = true;

const renderNavButtons = () => {
    if (userLoggedIn) {
        const addNewPost = document.createElement('button')
        addNewPost.classList.add('new-post-button')
        addNewPost.textContent = 'Add New'

        addNewPost.addEventListener('click', renderModal)

        navBarBtnContainer.appendChild(addNewPost)
    }
    else {
        const buttons = document.createElement('div')
        const loginButton = document.createElement('button')
        loginButton.classList.add('login-button')
        loginButton.textContent = 'Login'
        const registerButton = document.createElement('button')
        registerButton.classList.add('register-button')
        registerButton.textContent = 'Register'

        buttons.append(loginButton, registerButton)
        navBarBtnContainer.appendChild(buttons)
    }
}

const getPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    const posts = data.data

    return posts
}

const renderPost = (post) => {
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

    let editMode = false;

    buttonContainer.append(editBtn, deleteBtn)
    item.append(itemTitle, itemBody, buttonContainer)

    const toggleEditMode = () => {
        const titleInput = document.createElement('input')
        const bodyInput = document.createElement('input')
        const imageInput = document.createElement('input')
        editMode = !editMode

        console.log(editMode)
        if (editMode) {
            itemTitle.replaceWith(titleInput)
            itemBody.replaceWith(bodyInput)
            itemImg.replaceWith(imageInput)
        }
        else if(!editMode){
            itemTitle.textContent = titleInput.value
            itemBody.textContent = bodyInput.value
            itemImg.textContent = imageInput.value
            console.log(itemTitle)
            titleInput.replaceWith(itemTitle)
            bodyInput.replaceWith(itemBody)
            imageInput.replaceWith(itemImg)
        }
    }

    editBtn.addEventListener('click', async (event) => {
        const editedItem = {
            title: itemTitle.textContent,
            body: itemBody.textContent,
            image: itemImg.textContent,
        }

        //edit the card
        //send edited content to the server

        toggleEditMode()
    })
    deleteBtn.addEventListener('click', async (event) => {
        item.remove()
        await fetch(`/api/posts/${post._id}`, {
            method: 'DELETE'
        })
    })

    if (latestPosts.children.length < 4) {
        console.log('render latest')
        latestPosts.appendChild(item)
    }
    if (latestPosts.children.length >= 4 && olderPostsList.children.length < maxOlderPosts) {
        console.log('render older')
        const olderItem = document.createElement('li')
        olderItem.append(itemTitle)
        olderItem.setAttribute('class', 'post-item-older')
        olderPostsList.appendChild(olderItem)
    }
    // else if (olderPostsList.children.length >= maxOlderPosts && !olderPostsList.children[maxOlderPosts]) {
    //     const moreButton = document.createElement('button')
    //     moreButton.textContent = 'Show more'
    //     moreButton.setAttribute('class', 'show-more-button')
    //     olderPostsList.appendChild(moreButton)
    // }
}

const renderModal = (e) => {
    const modalContainer = document.createElement('div')
    const modalForm = document.createElement('form')
    const body = document.body

    modalForm.setAttribute('class', 'modal-form')
    modalContainer.setAttribute('class', 'modal-container')
    e.preventDefault()

    const addPostFormContent = {
        'titleLabel': document.createElement('label'),
        'title': document.createElement('input'),
        'imageLabel': document.createElement('label'),
        'image': document.createElement('input'),
        'contentLabel': document.createElement('label'),
        'content': document.createElement('textarea'),
        'submit': document.createElement('button')
    }

    addPostFormContent.titleLabel.textContent = 'Title';
    addPostFormContent.title.setAttribute('name', 'title');
    addPostFormContent.title.required = true
    addPostFormContent.imageLabel.textContent = 'Image';
    addPostFormContent.image.setAttribute('name', 'image');
    addPostFormContent.image.required = true
    addPostFormContent.contentLabel.textContent = 'Content';
    addPostFormContent.content.setAttribute('name', 'content');
    addPostFormContent.content.classList.add('modal-content')
    addPostFormContent.content.required = true
    addPostFormContent.submit.textContent = 'Submit';
    addPostFormContent.submit.classList.add('modal-submit-btn')


    modalForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        console.log('frontend', Object.fromEntries(formData.entries()))
        await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        renderPost(Object.fromEntries(formData.entries()))
    })

    Object.values(addPostFormContent).forEach(element => {
        modalForm.appendChild(element)
    })

    modalContainer.appendChild(modalForm)

    body.appendChild(modalContainer)
    modalContainer.addEventListener('click', (e) => {
        if (modalContainer !== e.target) return
        body.removeChild(modalContainer)
    })
}

renderNavButtons()
getPosts().then(posts => {
    if (posts.length < 1) {
        const noPostsText = document.createElement('h1')
        noPostsText.textContent = 'No posts yet'
        mainContainer.appendChild(noPostsText)
    }
    else {
        const sortedPosts = posts.sort((postA, postB) => Date.parse(postB.createdAt) - Date.parse(postA.createdAt))
        console.log(sortedPosts)
        sortedPosts.forEach(post => {
            console.log(post)
            renderPost(post)
        })
    }
})



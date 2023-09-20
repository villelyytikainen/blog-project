const localStorage = window.localStorage;

// Create a new user
const createUser = async (user) => {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data)
    if (data.status === "success") {
        console.log('user created successfully')
    }
    else {
        console.error('Registration failed: ', data.message);
    }
};

const loginUser = async (user) => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.hasOwnProperty('token')) {
            console.log(data)
            console.log(`${data.username} logged in`);
            localStorage.setItem("token", data.token)
            getPosts()
        }
        else {
            console.error(data.message)
        }
    } catch (err) {
        console.error(err)
    }
}

// Get all users
const getUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
};

// Get a user by ID
const getUserById = async (id) => {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    console.log(data);
};

// Get all posts
const getPosts = async () => {
    console.log('get all posts', localStorage.getItem('token'))
    const response = await fetch('/api/posts',{
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.data;
};

// Create a new post
const createPost = async (item) => {
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data.data;
};

// Update a post
const updatePost = async (item, post) => {
    await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' }
    });
};

// Delete a post
const deletePost = async (element, post, event) => {
    element.remove();
    const response = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
};

export default {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    getPosts,
    createPost,
    updatePost,
    deletePost
}
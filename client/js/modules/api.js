const localStorage = window.localStorage;

// Create a new user
const createUser = async (user) => {
    try{
        const response = await fetch("/api/users/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        return data;
    }catch(err){
        return err;
    }
    // if (data.status === "success") {
    //     console.log(data, "user created successfully");
    // } else {
    //     console.error("Registration failed: ", data.message);
    // }
};

const loginUser = async (user) => {
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return err;
    }
};

// Get all users
const getUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
};

// Get a user by ID
const getUserById = async (id) => {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return data;
};

const updateUser = async (user) => {
    const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        header: {
            Authorization: user.token,
            "Content-Type": "application/json",
        },
    });
};

// Get all posts
const getPosts = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data.data;
};

//Get posts by userId
const getPostsByUserId = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
            userId: user.id,
            Authorization: user.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data.data;
};

// Create a new post
const createPost = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data.data;
};

// Update a post
const updatePost = async (item, post) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

// Delete a post
const deletePost = async (post) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

export default {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    getPosts,
    getPostsByUserId,
    createPost,
    updatePost,
    deletePost,
};

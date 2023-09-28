const postService = require("../services/BlogService");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json({ data: posts, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body);
        console.log(post)
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await postService.deletePost(req.params.id);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

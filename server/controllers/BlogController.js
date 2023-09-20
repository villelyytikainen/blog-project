const postService = require('../services/BlogService')
const authMiddleware = require('../services/authMiddleware')

exports.getAllPosts = authMiddleware, async (req, res) => {
    try {
        const posts = await postService.getAllPosts()
        res.json({ data: posts, status: 'success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

exports.createPost = authMiddleware, async (req, res) => {
    try {
        const post = await postService.createPost(req.body)
        res.json({ data: post, status: 'success' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPostById = authMiddleware, async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = authMiddleware, async (req, res) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = authMiddleware, async (req, res) => {
    try {
        const post = await postService.deletePost(req.params.id);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

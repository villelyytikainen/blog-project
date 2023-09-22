const authMiddleware = require('../middlewares/authMiddleware')

const express = require('express')
const {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/BlogController')

const router = express.Router()

router.route('/').get(authMiddleware, getAllPosts).post(createPost)
router.route('/:id').get(authMiddleware, getPostById).put(updatePost).delete(deletePost)

module.exports = router
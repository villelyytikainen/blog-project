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

router.route('/').all(authMiddleware).get(getAllPosts).post(createPost)
router.route('/:id').all(authMiddleware).get(getPostById).put(updatePost).delete(deletePost)

module.exports = router
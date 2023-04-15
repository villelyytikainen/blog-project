const express = require('express')
const {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    deleteAll
} = require('../controllers/BlogController')

const router = express.Router()

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost)

module.exports = router
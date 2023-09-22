const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const {
    getAllUsers,
    createUser,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser,
    login
} = require('../controllers/UserController')
const router = express.Router()

router.route('/').get(authMiddleware, getAllUsers)
router.route('/login').post(login)
router.route('/register').post(createUser)
router.route('/:id').get(authMiddleware, getUserById).put(authMiddleware, updateUser).delete(authMiddleware, deleteUser)

module.exports = router
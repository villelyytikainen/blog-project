
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const {
    getAllUsers,
    createUser,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser,
    login,
    verifyUser
} = require('../controllers/UserController')
const router = express.Router()

router.route('/').get(authMiddleware)
router.route('/login').post(login)
router.route('/register').post(createUser)
router.route('/verify/:id').get(verifyUser)
router.route('/:id').all(authMiddleware).get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router
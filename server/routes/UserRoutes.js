const express = require('express')
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

router.route('/').get(getAllUsers)
router.route('/login').post(login)
router.route('/register').post(createUser)
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: String,
    loggedIn: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (err) {
        console.error(err)
        next(err)
    }
})

module.exports = mongoose.model("User", userSchema)
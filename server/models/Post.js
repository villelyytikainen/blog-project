const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    content: String,
    userId: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Post", postSchema)
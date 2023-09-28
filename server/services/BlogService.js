const PostModel = require("../models/Post");

exports.getAllPosts = async () => {
    return await PostModel.find(); //.sort({_id:-1})
};

exports.getPostById = async (id) => {
    return await PostModel.findById(id);
};

exports.createPost = async (post) => {
    return await PostModel.create(post);
};

exports.updatePost = async (id, post) => {
    return await PostModel.findByIdAndUpdate(id, post);
};
exports.deletePost = async (id) => {
    return await PostModel.findByIdAndRemove(id);
};

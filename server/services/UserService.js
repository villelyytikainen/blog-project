const UserModel = require("../models/User");

exports.getAllUsers = async () => {
    return await UserModel.find();
};

exports.getUserByUsername = async (user) => {
    return await UserModel.findOne({ username: user });
};

exports.getUserByEmail = async (email) => {
    return await UserModel.findOne({ email: email });
};

exports.getUserById = async (id) => {
    return await UserModel.findById(id);
};

exports.createUser = async (user) => {
    return await UserModel.create(user);
};

exports.updateUser = async (id, user) => {
    return await UserModel.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
    return await UserModel.findByIdAndRemove(id);
};

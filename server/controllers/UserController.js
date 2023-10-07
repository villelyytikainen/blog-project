const userService = require("../services/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.testFunc = (req, res) => {
    res.render("Nav.ejs");
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ data: users, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: "Authentication failed because no user" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Authentication failed because wrong password" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET
        );

        res.json({
            id: user._id,
            username: user.username,
            message: "Authentication successful",
            loggedIn: true,
            token,
        });
    } catch (err) {
        console.error(err);
    }
};

exports.getUserByUsername = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.body.username);
    } catch (err) {
        console.log("username");
        res.status(500).json({ error: err.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

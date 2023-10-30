const userService = require("../services/UserService");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ data: users, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    try {
        const { email } = req.body;

        if (!email) {
            return res.json(422).send({ message: "Missing email." });
        }

        const existingUser = await userService.getUserByEmail(email);

        if (existingUser) {
            return res.status(409).send({
                message: "Email is already in use.",
            });
        }

        const user = await userService.createUser(req.body);

        const verificationToken = user.generateVerificationToken();
        const url = `http://localhost:3001/api/users/verify/${verificationToken}`;

        transporter.sendMail({
            to: email,
            subject: "Verify account",
            html: `Click <a href="${url}">HERE</a> to confirm your email.`,
        });

        return res.status(201).send({
            message: `Sent a verification email to ${email}`,
        });

        // const user = await userService.createUser(req.body);
        // res.json({ data: user, status: "success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Authentication failed because no user" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Authentication failed because wrong password",
            });
        }

        if (!user.activated) {
            return res.status(403).send({
                message: "Verify your account.",
            });
        }

        const token = await user.generateVerificationToken();

        const loggedInUser = {
            loggedIn: true,
        };

        const updatedUser = await userService.updateUser(
            user._id,
            loggedInUser
        );

        return res.json({
            id: updatedUser._id,
            username: updatedUser.username,
            message: "Authentication successful",
            loggedIn: updatedUser.loggedIn,
            token,
        });
    } catch (err) {
        console.error(err);
    }
};

exports.verifyUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(422).send({
            message: "Missing token",
        });
    }

    let payload = null;

    try {
        payload = await jwt.verify(id, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(500).send(err);
    }

    try {
        const user = await userService.getUserById(payload.userId);
        if (!user) {
            return res.status(404).send({
                message: "User does not exist.",
            });
        }
        user.activated = true;

        console.log(user);

        await userService.updateUser(payload.userId, user);

        return res.status(200).json({
            message: "Account verified",
        });
    } catch (err) {
        return res.status(500).send(err);
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

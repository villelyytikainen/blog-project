const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
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
    activated: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.generateVerificationToken = function () {
    const user = this;

    const verificationToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return verificationToken;
};

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = mongoose.model("User", userSchema);

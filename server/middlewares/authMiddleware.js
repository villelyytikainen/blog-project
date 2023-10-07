const jwt = require("jsonwebtoken");
const userService = require("../services/UserService");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401);
    }

    try {
        const data = jwt.verify(authHeader, process.env.JWT_SECRET);
        const user = await userService.getUserById(data.userId);

        if (!user) {
            return res.sendStatus(401);
        }

        next();
    } catch (err) {
        console.error(err);
        return res.sendStatus(401);
    }
};

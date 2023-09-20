const jwt = require('jsonwebtoken')
const userService = require('./UserService')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization)

    if(!authHeader){
        return res.sendStatus(401)
    }

    const data = jwt.verify(authHeader, process.env.JWT_SECRET)

    const user = userService.getUserById(data.userId)

    if(!user){
        return res.sendStatus(401)
    }

    console.log('this is the data',data)

    next();
}
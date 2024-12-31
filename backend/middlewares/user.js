const { getUser } = require("../services/auth")
const User = require("../models/user")

function handleGetEmail(req, res) {
    const token = req.cookies?.token
    const decode = getUser(token)

    res.send(decode.email)
}

const userId = async (req, res, next) => {
    const token = req.cookies?.token
    const decode = getUser(token)
    const email = decode.email
    
    const user = await User.findOne({ email })
    
    if(!token) return res.send({message: "user not found"})
    
    req.user = user

    return next()
}

module.exports = {
    handleGetEmail,
    userId
}
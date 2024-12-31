const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config({
    path: "./.env"
})

const secret = process.env.JWT_SECRET_KEY

function setUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        password: user.password
    }

    const token = jwt.sign(payload, secret)
    return token
}

function getUser(token) {
    if(!token) return null

    try {
        const user = jwt.verify(token, secret)
        return user
    } catch (error) {
        console.log("Error", error)
        return null        
    }
}

module.exports = {
    setUser,
    getUser
}
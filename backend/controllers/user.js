const User = require("../models/user")
const { setUser } = require("../services/auth")

async function handleUserSignup(req, res) {
    const { fullName, email, password } = req.body

    try {
        await User.create({
            fullName,
            email,
            password
        })

    } catch (error) {
        return res.json({ message: "User already exists! Try logging In." })
    }

    return res.status(201).send({ message: "User created Successfully"})
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body

    const user = await User.findOne({email, password})

    if(!user) return res.status(401).send({message: "Invalid Credentials. User not found"})

    const token = setUser(user)
    res.cookie("token", token)
    return res.status(200).send({ message: "Login Successful!" })
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
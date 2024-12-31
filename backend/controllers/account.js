const { Account, handleAccountNumberCreation } = require("../models/account")
const { getUser } = require("../services/auth")

async function createAccount(req, res) {
    try {
        const { owner, aadharNumber, address, city, state, zip, email } = req.body
        const account = await Account.findOne({ aadharNumber })
        if(!account) {
            const accNum = handleAccountNumberCreation()
            await Account.create({
                accountNumber: accNum,
                email,
                owner,
                aadharNumber,
                address,
                city,
                state,
                zip,
                pin: null,
                createdBy: req.user._id
            }) 

            return res.status(201).json({ message: "Account created Successfully"})
        }
            return res.status(202).json({ message: "Account with this Aadhar Number already exists!" });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({ message: "Email is already associated with another account!" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
}

function checkForAccount(req, res) {
    const { aadharNumber } = req.body

    const account = Account.findOne({ aadharNumber })

    if(!account) return 
    
    return res.send("Account already exists!")
}

async function verifyAccount(req, res) {
    const { accountNumber, aadharNumber } = req.body
    
    const account = Account.findOne({ accountNumber, aadharNumber })

    if(!account) return res.send({message: "You don't have an account!"})

    return res.send("Done")
}

async function handleGetAccount(req, res) {
    const token = req.cookies?.token
    const decode = getUser(token)
    const email = decode.email

    const acc = await Account.findOne({ email })

    return res.send(acc)
}

async function handlePinGeneration(req, res) {
    try {
        const { pin, accountNumber } = req.body
        
        const accountPin = await Account.findOneAndUpdate(
            { accountNumber },
            { $set: { pin } },
            { new: true }
        );

        if (!accountPin) {
            return res.status(404).json({ message: "Account not found!" });
        }
        res.status(201).json({ message: "Pin saved successfully!" })

    } catch (error) {
        console.log("eoo", error)
        res.status(500).json({ message: "Server side error!" } )
    }
}

module.exports = {
    createAccount,
    verifyAccount,
    handleGetAccount,
    checkForAccount,
    handlePinGeneration
}
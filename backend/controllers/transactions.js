const { v4:uuidv4 } = require("uuid")
const { Account } = require("../models/account")
const { getUser } = require("../services/auth")

function getTime() {
    const date = new Date()
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const time = `${days[date.getDay()]} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return time
}

async function handleTransaction(req, res) {
    try {
        const { accountNumber, amount, pin, transactionType, comment } = req.body

        const account = await Account.findOne({ accountNumber })
        
        if(!account) return res.status(404).json({ message: "Account doesn't exists!" })

        if(amount <= 0) return res.json({ message: "Amount cannot be less than or equal to 0" })
        if(transactionType == "WITHDRAW") {
            if(account.totalBalance < amount) {
                return res.json({ message: `The amount is exceeding your current balance which is: ${account.totalBalance}` })
            }
        }

        if(account.pin !== Number(pin)) return res.json({ message: "Incorrect Pin!" })

        if(transactionType === "DEPOSIT") {
            account.totalBalance += Number(amount)
        }
        if(transactionType === "WITHDRAW") {
            account.totalBalance -= Number(amount)
        }

        await Account.findOneAndUpdate({
            accountNumber},
            {$push: {
                transactionHistory: {
                    transactionID: uuidv4(),
                    time: getTime(),
                    amount,
                    transactionType,
                    currentBalance: account.totalBalance,
                    comment
                }
            },
            $set: {totalBalance: account.totalBalance}
        })
        return res.status(201).json({ message: "Amount Deposited Succesfully!" })

    } catch (error) {
        console.log("jfkhdksdj", error)
        return res.json({ message: error })
    }   
}

async function getTransactionHistory(req, res) {
    const token = req.cookies?.token
    const decode = getUser(token)
    const email = decode.email

    const account = await Account.findOne({ email })
    if (!account) return res.status(250).json({ message: "Account doesn't exists!" })
    
    return res.send(account)
}

async function handleMoneyTransfer(req, res) {
    try {
        const token = req.cookies?.token
        const decode = getUser(token)
        const email = decode.email

        const { accountNumber, amount, pin, comment } = req.body

        const sender = await Account.findOne({ email })

        if(!sender) return res.json({ messgae: "User doesn't exist" })
        if(amount <= 0) return res.json({ message: "Amount cannot be less than or equal to 0" })
        if(sender.totalBalance < amount) return res.json({ message: `The amount exceeds your current balance which is: ${sender.totalBalance}` })
        if(sender.pin != pin) return res.json({ message: "Incorrect pin!" })
        if(sender.accountNumber == Number(accountNumber)) return res.json({ message: "It looks like you are transfering money to your own account!" })

        const receiver = await Account.findOne({ accountNumber })

        if(!receiver) return res.json({ message: "The receiver's account doesn't exist!" })

        receiver.totalBalance += Number(amount)
        sender.totalBalance -= Number(amount)

        const id = uuidv4()

        await receiver.updateOne( {
            $push: {
                transactionHistory: {
                    transactionID: id,
                    time: getTime(),
                    amount,
                    transactionType: "RECEIVED",
                    currentBalance: receiver.totalBalance,
                    comment,
                    "transactionBetween": {
                        name: sender.owner,
                        account: sender.accountNumber
                    }
                }
            },
            $set: { totalBalance: receiver.totalBalance }
        } )
        await sender.updateOne( {
            $push: {
                transactionHistory: {
                    transactionID: id,
                    time: getTime(),
                    amount,
                    transactionType: "SENT",
                    currentBalance: sender.totalBalance,
                    comment,
                    "transactionBetween": {
                        name: receiver.owner,
                        account: receiver.accountNumber
                    }
                }
            },
            $set: { totalBalance: sender.totalBalance }
        } )

        return res.status(201).json({ message: "Transfer successfull", sender: sender.accountNumber, receiver: receiver.accountNumber })
        
    } catch (error) {
        return res.status(404).json({ message: `backend mai ${error}` })
    }
}

module.exports = {
    handleTransaction,
    getTransactionHistory,
    handleMoneyTransfer
}
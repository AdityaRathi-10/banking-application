const { Schema, model } = require("mongoose")

const accountSchema = new Schema({
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    pin: {
        type: Number,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    totalBalance: {
        type: Number,
        required: true,
        default: 0
    },
    transactionHistory: [
        {
            transactionID: {
                type: String,
                required: true,
            },
            time: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            currentBalance: {
                type: Number,
                required: true,
            },
            transactionType: {
                type: String,
                enum: ["WITHDRAW", "DEPOSIT", "SENT", "RECEIVED"],
                required: true
            },
            comment: {
                type: String
            },
            transactionBetween: [
                {
                    name: {
                        type: String,
                        default: null
                    },
                    account: {
                        type: String,
                        default: null
                    }
                }
            ]
        }
    ]
    
}, { timestamps: true })

const Account = model("account", accountSchema)

function handleAccountNumberCreation() {
    let str = "0123456789"
    let accNum = "";

    for(let i = 0; i < 12; i++) {
        let ran = Math.floor(Math.random() * (str.length))
        accNum += str[ran]
    }

    return accNum
}

module.exports = {
    Account,
    handleAccountNumberCreation
}
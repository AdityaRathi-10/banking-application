const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    // role: {
    //     type: String,
    //     required: true,
    //     enum: ["NORMAL", "MANAGER"],
    //     default: "NORMAL" 
    // }
}, { timestamps: true })

const User = model('user', userSchema)

module.exports = User
const express = require("express")
const { handleUserSignup, handleUserLogin } = require("../controllers/user")
const { handleGetEmail } = require("../middlewares/user")
const { handleGetAccount } = require("../controllers/account")

const router = express.Router()

router.post("/signup", handleUserSignup)
router.post("/login", handleUserLogin)

router.get("/get-email", handleGetEmail)
router.get("/get-account", handleGetAccount)

module.exports = router
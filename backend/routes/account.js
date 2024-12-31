const express = require("express")
const { createAccount, handlePinGeneration } = require("../controllers/account")
const { handleTransaction, getTransactionHistory, handleMoneyTransfer } = require("../controllers/transactions")

const router = express.Router()

router.post("/create", createAccount)
router.post("/create/setpin", handlePinGeneration)
router.post("/deposit", handleTransaction)
router.post("/withdraw", handleTransaction)
router.post("/transfer", handleMoneyTransfer)

router.get("/history", getTransactionHistory)

module.exports = router
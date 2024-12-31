const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")

const { connectDB } = require("./connection")

const staticRouter = require("./routes/staticRouter")
const accountRouter = require("./routes/account")
const { userId } = require("./middlewares/user")

const app = express()
const PORT = process.env.PORT || 8000

dotenv.config({
    path: "./.env"
})

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

connectDB(`${process.env.MONGODB_URI}/bank`)
.then(() => console.log("Successfully connected DB"))
.catch((error) => console.log("Error", error))

app.use("/user", staticRouter)
app.use("/account", userId, accountRouter)

app.get("/", (req, res) => {
    res.end("hello")
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
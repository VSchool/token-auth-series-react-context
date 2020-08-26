const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
const PORT = process.env.PORT || 5000

app.use(morgan("dev"))
app.use(express.json())

//connect to db
mongoose.connect(
    "mongodb://localhost:27017/todo-auth-example",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
        if (err) throw err
        console.log("Connected to the database")
    }
)
app.use(
    "/api",
    expressJwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
)
app.use("/auth", require("./routes/auth"))
app.use("/api/todo", require("./routes/todo"))

app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === "UnauthorizedError") {
        // express-jwt gives the 401 status to the err object for us
        res.status(err.status)
    }
    return res.send({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
})

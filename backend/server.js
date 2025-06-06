const express = require("express")
require("dotenv").config()
const cors = require("cors")
const path = require("path")
const connectBD = require("./config/db")

const app = express()

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "PUT", "UPDATE", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(express.json())

const PORT = process.env.PORT

connectBD()

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

const express = require("express")
require("dotenv").config()
const cors = require("cors")
const path = require("path")
const connectBD = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const incomeRoutes = require("./routes/incomeRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

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

const PORT = process.env.PORT || 5000

connectBD()

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

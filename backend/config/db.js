const mongoose = require("mongoose")

const connectBD = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {})
    console.log("MongoDB connected")
  } catch (error) {
    console.log("Error connecting to MongoDB", error)
  }
}

module.exports = connectBD

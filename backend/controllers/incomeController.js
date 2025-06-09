const User = require("../models/User")
const xlsx = require("xlsx")
const Income = require("../models/Income")

// Add income
exports.addIncome = async (req, res) => {
  const userId = req.user.id

  try {
    const { icon, source, amount, date } = req.body

    // Validation: check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required!" })
    }

    const newIcome = new Income({
      //   userId,
      icon,
      source,
      amount,
      date: new Date(date),
    })

    await newIcome.save()
    res.status(200).json(newIcome)
  } catch (err) {
    console.error("Error adding income:", err)
    res.status(500).json({ message: "Server error" })
  }
}

// Get all income
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id

  try {
    const income = await Income.find({ userId }).sort({ date: -1 })
    res.json(income)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// Delete income
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Income deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// Download income excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id

  try {
    const income = await Income.find({ userId }).sort({ date: -1 })

    // Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }))

    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb, ws, "Income")
    xlsx.writeFile(wb, "income_details.xlsx")
    res.download("income_details.xlsx")
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

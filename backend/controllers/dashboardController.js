const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { isValidObjectId, Types } = require("mongoose")
const Expense = require("../models/Expense")
const Income = require("../models/Income")

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id
    const userObjectId = new Types.ObjectId(String(userId))

    // Fetch total income & expenses
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    console.log("totalIncome: ", {
      totalIncome,
      userId: isValidObjectId(userId),
    })

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    console.log("totalExpense: ", {
      totalExpense,
      userId: isValidObjectId(userId),
    })

    // Get all income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 })

    // Get total income for the last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )

    // Get all expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 })

    // Get total expenses for the last 60 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )

    // Fetch last 5 transactions (income + expenses)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({
          ...transaction.toObject(),
          type: "Income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({
          ...transaction.toObject(),
          type: "Expense",
        })
      ),
    ].sort((a, b) => b.date - a.date) // Sort latest first

    // Final response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    })
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message })
  }
}

import React, { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { prepareExpenseLineChartData } from "../../utils/helper"
import CustomLineChart from "../charts/CustomLineChart"

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions)

    setChartData(result)

    return () => {}
  }, [transactions])

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">ExpenseOverview</h5>
          <p className="text-gray-400 text-xs mt-0.5 font-medium uppercase">
            Track your spending trends overtime and gain insights
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          Add Expense <LuPlus className="text-lg" />
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  )
}

export default ExpenseOverview

import React, { useState, useEffect } from "react"
import DashboardLayout from "../../components/layout/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from "react-router-dom"
import axiosinstance from "../../utils/axiosinstance"
import { API_PATHS } from "../../utils/apiPaths"
import InfoCard from "../../components/cards/InfoCard"
import { IoMdCard } from "react-icons/io"
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"
import { addThousandsSeparator } from "../../utils/helper"
import RecentTransactions from "../../components/dashboard/RecentTransactions"
import FinancialOverview from "../../components/dashboard/FinancialOverview"
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions"
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses"
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart"
import RecentIncome from "../../components/dashboard/RecentIncome"

const Home = () => {
  useUserAuth()

  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosinstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="my-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Balance */}
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-violet-500"
          />

          {/* Total Income */}
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          {/* Total Expenses */}

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        {/* Recent transaction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinancialOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home

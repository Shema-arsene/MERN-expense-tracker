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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total balance */}
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-violet-500"
          />

          {/* a */}
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          {/* b */}

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home

import React, { Children, useEffect, useState } from "react"
import DashboardLayout from "../../components/layout/DashboardLayout"
import IncomeOverview from "../../components/income/IncomeOverview"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../hooks/useUserAuth"
import { API_PATHS } from "../../utils/apiPaths"
import axiosinstance from "../../utils/axiosinstance"
import Modal from "../../components/Modal"
import AddIncomeForm from "../../components/income/AddIncomeForm"

const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // Get all income details
  // useUserAuth()
  // const navigate = useNavigate()

  const fetchIncomeDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosinstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    // Validation check
  }

  // Delete income
  const deleteIncome = async (id) => {}

  // Handle download income details
  const handleDownloadIncomeDetails = async (id) => {}

  useEffect(() => {
    fetchIncomeDetails()

    return () => {}
  }, [])
  //

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          {/* <div className="">Add Income Form</div> */}
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income

import React, { Children, useEffect, useState } from "react"
import DashboardLayout from "../../components/layout/DashboardLayout"
import IncomeOverview from "../../components/income/IncomeOverview"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../hooks/useUserAuth"
import { API_PATHS } from "../../utils/apiPaths"
import axiosinstance from "../../utils/axiosinstance"
import Modal from "../../components/Modal"
import AddIncomeForm from "../../components/income/AddIncomeForm"
import toast from "react-hot-toast"
import IncomeList from "../../components/income/IncomeList"
import DeleteAlert from "../../components/DeleteAlert"

const Income = () => {
  useUserAuth()

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // Get all income details

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
    if (!source.trim()) {
      toast.error("Source is required!")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0!")
      return
    }
    if (!date.trim()) {
      toast.error("Date is required!")
      return
    }

    try {
      await axiosinstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })

      toast.success("Income added successfully")
      setOpenAddIncomeModal(false)
      fetchIncomeDetails()
    } catch (error) {
      console.error(
        "Error adding income: ",
        error.response?.data?.message || error.message
      )
    }
  }

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosinstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Income details deleted successfully")
      fetchIncomeDetails()
    } catch (error) {
      console.error(
        "Error deleting income: ",
        error.response?.data?.message || error.message
      )
    }
  }

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

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={() => handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          {/* <div className="">Add Income Form</div> */}
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income datail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income

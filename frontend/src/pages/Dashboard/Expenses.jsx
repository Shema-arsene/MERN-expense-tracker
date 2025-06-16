import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layout/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { API_PATHS } from "../../utils/apiPaths"
import toast from "react-hot-toast"
import axiosinstance from "../../utils/axiosinstance"
import ExpenseOverview from "../../components/expense/ExpenseOverview"
import Modal from "../../components/Modal"
import AddExpenseForm from "../../components/expense/AddExpenseForm"
import ExpenseList from "../../components/expense/ExpenseList"
import DeleteAlert from "../../components/DeleteAlert"

const Expenses = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  // Get all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosinstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      )

      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense

    // Validation check
    if (!category.trim()) {
      toast.error("Category is required!")
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
      await axiosinstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      })

      toast.success("Expense added successfully")
      setOpenAddExpenseModal(false)
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        "Error adding expense: ",
        error.response?.data?.message || error.message
      )
    }
  }

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosinstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense details deleted successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        "Error deleting expense: ",
        error.response?.data?.message || error.message
      )
    }
  }

  // Handle download expense details
  const handleDownloadExpenseDetails = async (id) => {}

  useEffect(() => {
    fetchExpenseDetails()

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Expenses">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              })
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense datail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expenses

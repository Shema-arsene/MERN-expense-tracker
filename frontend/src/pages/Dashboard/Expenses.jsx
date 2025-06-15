import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layout/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { API_PATHS } from "../../utils/apiPaths"
import toast from "react-hot-toast"
import axiosinstance from "../../utils/axiosinstance"
import ExpenseOverview from "../../components/expense/ExpenseOverview"
import Modal from "../../components/Modal"
import AddExpenseForm from "../../components/expense/AddExpenseForm"

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
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expenses

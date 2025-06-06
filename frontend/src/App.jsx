import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

// Auth
import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"

// Dashboard
import Home from "./pages/Dashboard/Home.jsx"
import Income from "./pages/Dashboard/Income.jsx"
import Expenses from "./pages/Dashboard/Expenses.jsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/Signup" exact element={<Signup />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expenses" exact element={<Expenses />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

const Root = () => {
  // Check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token")

  // Redirect to dashboard if suthenticated, otherwise login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}

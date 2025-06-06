import React, { useState } from "react"
import AuthLayout from "../../components/layout/AuthLayout"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/layout/inputs/Input"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/layout/inputs/ProfilePhotoSelector"

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(null)

  // Handle Signup form submit

  const handleSignup = (e) => {
    e.preventDefault()

    let profileImageURL = ""

    if (!fullName) {
      setError("Please enter your full name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (!password) {
      setError("Please enter a password.")
      return
    }

    setError("")

    // Signup API Call
  }

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col  justify-center">
        <h3 className="text-xl font-semibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="example@email.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium underline text-purple-500 hover:text-violet-500"
            >
              login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup

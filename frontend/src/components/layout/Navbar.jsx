import React, { useState } from "react"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from "./SideMenu"

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <nav
      className="flex gap-5 bg-white border border-b border-gray-300/50 backdrop-blur-[2px] py-4 px-7
                sticky top-0 z-30"
    >
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu)
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="cursor-pointer text-3xl hover:bg-red-100 rounded-full p-1" />
        ) : (
          <HiOutlineMenu className="cursor-pointer text-3xl hover:bg-green-100 rounded-full p-1" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">Expense tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  )
}

export default Navbar

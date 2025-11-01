import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {

  // this is used to get location of the current path
  const location= useLocation()

  // this is used to control the mobile menu
  const [open , setOpen] = useState(false)

  // to navigate programmatically
  const navigate = useNavigate()


 


  return (
    <div className={` 
          flex items-center justify-between px-6 py-4 sm:px-16 lg:px-24 xl:px-32 
          text-gray-600  transition-all duration-300 ${location.pathname === '/' && 'bg-light'}`}>


      {/* Logo */}
        <Link to="/">
          <img 
          className="h-8 w-auto" src={assets.logo} alt="Logo" />
        </Link>

      {/* menu links or Navigation  bar*/}
      <div className={`transform transition-transform duration-300 z-50
            max-sm:fixed max-sm:top-16 max-sm:h-screen max-sm:w-full max-sm:border-t max-sm:p-4
            right-0 border-borderColor flex flex-col sm:flex-row
            items-start sm:items-center gap-4 sm:gap-8
            bg-gray-100 ${
              open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
            } ${location.pathname === '/' ? 'bg-light' : 'bg-white'}`}>
        {menuLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              {link.name}
            </Link>
          ))}

        {/* {search box} */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor rounded-full px-3 max-w-56">
          <input
              type="text"
              className="p-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              placeholder="Search products..."
            />
          < img src={assets.search_icon} alt="search" />
        </div> 

        {/* Dashboard & login*/}
        <div className="flex max-sm:flex-col gap-6 items-start sm:items-center">
          <button
              onClick={() => (navigate("/owner"))}
              className="cursor-pointer"
            >Dashboard
              {/* {isOwner ? "Dashboard" : "List cars"} */}
            </button>

            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-black transition-all
               text-white rounded-lg"
            >Login
              {/* {user ? "Logout" : "Login"} */}
            </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
        <button
          className="sm:hidden cursor-pointer"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
    
    </div>
  )
}

export default Navbar

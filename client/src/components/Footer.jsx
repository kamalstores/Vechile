import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (

    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">


      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">

        <div>

          <Link to="/">
         <img className="h-8 md:h-9" src={assets.logo} alt="Logo" />
          </Link>
        
          <p className="max-w-80 mt-3">
            Experience premium car rental with a diverse fleet of luxury and
            everyday vehicles tailored for all your driving needs.
          </p>


          <div className="flex items-center gap-3 mt-6">
            <a href="#">
              {" "}
              <img src={assets.facebook_logo} className="h-5 w-5" alt="" />
            </a>
            <a href="#">
              {" "}
              <img src={assets.instagram_logo} className="h-5 w-5" alt="" />
            </a>
            <a href="#">
              {" "}
              <img src={assets.twitter_logo} className="h-5 w-5" alt="" />
            </a>
            <a href="#">
              {" "}
              <img src={assets.gmail_logo} className="h-5 w-5" alt="" />
            </a>
          </div>
        </div>


        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Quick Links
          </h2>

          <ul className="mt-3 flex flex-col gap-1.5">

            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Your Cars</a>
            </li>
            <li>
              <a href="#">List Your Car</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>

          </ul>
        </div>



        <div>
          <p className="text-base font-medium text-gray-800 uppercase">
            Resources
          </p>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Insurance</a>
            </li>
          </ul>
        </div>



        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Contact
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>1234 Luxury Drive</li>
            <li>New York NY 10001</li>
            <li>+1 234 567 890</li>
            <li>info@drivenow.com</li>
          </ul>
        </div>
      </div>



      {/* <hr className="border-y-gray-700 mt-8 " /> */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p className="text-center text-sm text-gray-500 mt-1">
          © {new Date().getFullYear()} All rights reserved || This site
          developed by{" "}
          <a
            href="https://www.linkedin.com/in/shanedrasingh05"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Shanedra Singh
          </a>
        </p>

      

        <ul className="flex items-center text-sm text-gray-600">
          {["Privacy", "Terms", "Cookies"].map((label, index, arr) => (
            <li key={label} className="flex items-center">
              <a href="#" className="hover:underline">
                {label}
              </a>
              {index < arr.length - 1 && (
                <span className="px-1 text-gray-500">|</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Footer

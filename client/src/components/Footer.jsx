import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
  return (

    <motion.div initial={{ opacity: 0, y:30 }} whileInView={{ opacity: 1, y:0 }} transition={{ duration: 0.6}} className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">


      <motion.div initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3}} className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">

        <div>

          <Link to="/">
         <motion.img initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="h-8 md:h-9" src={assets.logo} alt="Logo" />
          </Link>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay:0.3 }} className="max-w-80 mt-3">
            Experience premium car rental with a diverse fleet of luxury and
            everyday vehicles tailored for all your driving needs.
          </motion.p>


          <motion.div initial={{ opacity: 0}} whileInView={{ opacity: 1}} transition={{ duration: 0.5, delay: 0.5 }} className="flex items-center gap-3 mt-6">
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
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y:20}} whileInView={{ opacity: 1, y:1}} transition={{ duration: 0.6, delay: 0.4 }} className='flex flex-wrap justify-between w-1/2 gap-8'>
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
        </motion.div>

    </motion.div>



      {/* <hr className="border-y-gray-700 mt-8 " /> */}
      <motion.div initial={{ opacity: 0, y:10 }} whileInView={{ opacity: 1, y:0 }} transition={{duration:0.6, delay:0.6}} className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
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
      </motion.div>
    </motion.div>
  )
}

export default Footer

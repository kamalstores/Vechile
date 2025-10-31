import React, { useState } from 'react'
import Title from '../components/Title'
import {assets, dummyCarData} from '../assets/assets'
import CarCard from '../components/CarCard'

const Cars = () => {

  const [input, setInput] = useState("")

  return (
    <div>
      
    {/* div for display title and search bar  */}
    <div className="flex flex-col items-center py-20 bg-light max-md:px-4">

      <Title title="Available Cars" subTitle="Browse through our extensive collection of cars and find the perfect ride for your next adventure" />

      {/* search bar  */}
      <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">

        {/* search icon  */}

        <img
            src={assets.search_icon}
            alt="Search"
            className="w-4.5 h-4.5 mr-2"
          />

        {/* input field for search car  */}
        <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />

          {/* Filter Icon */}
          <img
            src={assets.filter_icon}
            alt="Filter"
            className="w-4.5 h-4.5 ml-2"
          />

      </div>

    </div>


     {/* div for display all cars and number of cars  */}

     <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">


      {/* number of cars available  */}
      <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {dummyCarData.length} Cars
        </p>

      {/* div for display all cars  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  mt-4 lg:px-20 wax-w-7xl mx-auto">
          {dummyCarData.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div> 

     </div>

    </div>
  )
}
 
export default Cars

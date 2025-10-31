import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {assets,  dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'


const CarDetails = () => {

  // to get car id we use params 
  const {id} = useParams()
  const navigate = useNavigate()

  // state variable to store car details
  const [car, setCar] = useState(null)

  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // try {
    //   const { data } = await axios.post("/api/bookings/create", {
    //     car: id,
    //     pickupDate,
    //     returnDate,
    //   });

    //   if (data.success) {
    //     toast.success(data.message);
    //     navigate("/my-bookings");
    //   } else {
    //     toast.error(data.message);
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  }

  useEffect(() => {
    setCar(dummyCarData.find((car) => car._id === id));
  }, [dummyCarData, id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">

      {/* back button */}
      <button
        className="flex items-center gap-2 text-gray-500 mb-6 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      {/* car details section and booking form*/}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* left: car image & details */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />


          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} . {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />

            {/* Specifications Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

              {/* dummy data for specifications */}
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                {
                  icon: assets.fuel_icon,
                  text: car.fuel_type,
                },
                {
                  icon: assets.car_icon,
                  text: car.transmission,
                },
                {
                  icon: assets.location_icon,
                  text: car.location,
                },
                
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center text-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                    {text}
                </div>
              ))}
            </div>



            {/* Description Section */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600">
                {car.description}
              </p>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {[
                  "360° Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                  "Sunroof",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img
                      src={assets.check_icon}
                      alt="check" 
                      className="h-4 mr-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking form */}
        <form onSubmit={handleSubmit}
        className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 bg-white text-gray-600">

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900">
              {currency}
              {car.pricePerDay}
            </p>
            <span className="text-sm text-gray-400 font-medium">per day</span>
          </div>

           {/* horizontal line */}
          <hr className="border-gray-200" />

          {/* Pickup Date */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor="pickup-date"
              className="block text-sm font-medium mb-1"
            >
              Pickup Date
            </label>
            <input
              // value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="border border-borderColor px-3 py-2 rounded-lg"
            />
          </div>


          {/* Return Date */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor="return-date"
              className="block text-sm font-medium mb-1"
            >
              Return Date
            </label>
            <input
              // value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              required
              className="border border-borderColor px-3 py-2 rounded-lg"
            />
          </div>



          {/* Book Button */}
          <button

            className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
          >
            Book Now
          </button>



          {/* Note */}
          <p className="text-center text-xs text-gray-400">
            No credit card required to reserve
          </p>
        </form>

      
      </div>
    </div>
  ) : <Loader />
}

export default CarDetails

import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const ManageBookings = () => {

    const [bookings, setBookings] = useState([])

    const fetchMyBookings = async () => {
        setBookings(dummyMyBookingsData)
    }

    useEffect(() => {
        fetchMyBookings()
    }, [])

    const currency =  import.meta.env.VITE_CURRENCY

  return (
     <div className="px-4 pt-10 md:px-10 w-full">
      
        <Title
            title="Manage Bookings"
            subTitle="View all your bookings, update their details, or cancel them."
            align="left"
        />

        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">

            {/* table  */}
            <table className="w-full border-collapse text-left text-sm text-gray-600">

            {/* heading of table  */}
            <thead className="text-gray-500">
                <tr>
                    <th className="p-3 font-medium">Car</th>
                    <th className="p-3 font-medium max-md:hidden">Date Range</th>
                    <th className="p-3 font-medium">Total</th>
                    <th className="p-3 font-medium max-md:hidden">Payment</th>
                    <th className="p-3 font-medium">Actions</th>
                </tr>
            </thead>


            {/* body of table */}
            <tbody>
                {bookings.map((booking, index) => (
                    <tr key={index} className="border-t border-borderColor text-gray-500">
                        <td className="p-3 flex items-center gap-3">
                            <img
                                src={booking.car.image}
                                alt=""
                                className="h-12 w-12 aspect-square rounded-md object-cover"
                            />

                            <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
                        </td>

                        <td className="p-3 max-md:hidden">
                            {booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}

                        </td>

                        <td className='p-3'> 
                            {currency} {booking.price}
                        </td>

                        <td className="p-3 max-md:hidden">
                            <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>offline</span>
                        </td>

                        <td className="p-3">
                            {booking.status === 'pending' ? (
                                <select value={booking.status} className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" >
                                    <option value="pending">Pending</option>
                                    <option value="canceled">Cancel</option>
                                    <option value="confirmed">Confirm</option>
                                </select>
                            ): (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                                    {booking.status}
                                </span>

                            )}
                        </td>


                    </tr>
                ))}
            </tbody>
            </table>
      </div>

    </div>
  )
}

export default ManageBookings

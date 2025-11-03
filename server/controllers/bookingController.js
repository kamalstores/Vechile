import { Booking } from "../models/Booking.js";
import { Car } from "../models/Car.js";

// function to check availability of car for given dates
export const checkAvailability = async (carId, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car: carId,
        pickupDate : {$lte : returnDate},
        returnDate : {$gte : pickupDate}
    })
    return bookings.length === 0
}

// API to Check car availability for given dates and location
export const checkAvailabilityofCar = async (req, res) => {
    try {
        const {location, pickupDate, returnDate} = req.body;

        // fetch all available cars for given location
        const cars = await Car.find({location, isAvailable : true});

        // filter cars based on availability for given dates using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)

            return {...car._doc, isAvailable: isAvailable}

        })

        // filter only available cars
        let availableCars = await Promise.all(availableCarsPromises)

        // final filter to get only available cars
        availableCars = availableCars.filter(car => car.isAvailable === true)

        // send response
        res.status(200).json({
            success : true,
            availableCars
        })


    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}

// API to book a car
export const createBooking = async (req, res) => {
    try {
        
        const {_id} = req.user

        const {car, pickupDate, returnDate} = req.body

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)

        // if car is not available
        if(!isAvailable){
            return res.json({
                success : false,
                message: "Car is not available for the selected dates"
            })
        }

        // if car is available then create booking
        const carData = await Car.findById(car)

        // calculate amount based on pickup and return date
        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)

        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = noOfDays * carData.pricePerDay

        // create booking
        await Booking.create({
            car,
            user : _id,
            owner : carData.owner,
            pickupDate,
            returnDate,
            price
        })

        // send response
        res.status(200).json({
            success : true,
            message: "Booking created successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}

// API to list user bookings
export const getUserBookings = async (req, res) => {
    try {

        const {_id} = req.user

        //find bookings of user
        const bookings = (await Booking.find({user : _id}).populate("car")).sort({createdAt : -1})
        
        // send response
        res.status(200).json({
            success : true,
            bookings
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}

// API to list owner bookings
export const getOwnerBookings = async (req, res) => {
    try {

        // check if user is owner
        if(req.user.role !== 'owner'){
            return res.status(403).json({
                success : false,
                message: "Access denied, owners only"
            })
        }

        const bookings = await Booking.find({owner : req.user._id}).populate("car user").select("-user.password").sort({createdAt : -1})

        // send response
        res.status(200).json({
            success : true,
            bookings
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}

// API to update booking status (only for owner)
export const changeBookingStatus = async (req, res) => {
    try {

        const {_id} = req.user

        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        // check if booking owner is same as user
        if(booking.owner.toString() !== _id.toString()){
            return res.status(403).json({
                success : false,
                message: "Access denied, not your booking"
            })
        }

        // update booking status
        booking.status = status
        await booking.save()

        // send response
        res.status(200).json({
            success : true,
            message: "Booking status updated successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}
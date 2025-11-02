import imageKit from "../configs/imageKit.js";
import {User} from "../models/User.js";
import fs from "fs";
import { Car } from "../models/Car.js";
import { Booking } from "../models/Booking.js";
import path from "path";

// API to change user role to owner
export const changeRoleToOwner = async (req, res) => {
    try {
        
        // get user from req
        const {_id} = req.user;

        // update user role to owner
        await User.findByIdAndUpdate(_id, {
            role : 'owner'
        })

        // send response
        res.status(200).json({
            success : true,
            message: "User role updated to owner, Now you can list your cars"
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}

// API to list car / add new car by owner
export const addCar = async (req, res) => {
    try {
        
        // get user from req
        const {_id} = req.user;

        // get car data from req body
        let car = JSON.parse(req.body.carData);

        // get image
        const imageFile = req.files

        // read image file buffer
        const fileBuffer = fs.readFileSync(imageFile.path);

        // upload image to imagekit and convert to base64 format
        const response = await imageKit.upload({
            file: fileBuffer, //required
            fileName: imageFile.originalname, //required
            folder : '/cars'
        })

        // optimize through imageUrl transformation
        var optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { width : '1280' },    // width resizing
                { quality : 'auto' },   // auto compression
                { format : 'webp' }   //  onvert to modern format

            ]
        })

        // store optimized image url in variable
        const image = optimizedImageUrl;

        // create new car in database
        await Car.create({
            ...car,
            image,
            owner : _id
        })

        // send response
        res.status(200).json({
            success : true,
            message: "Car added successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}

// API to get all cars listed by owner
export const getOwnerCars = async (req, res) => {

    try {
        
        // get user id
        const {_id} = req.user

        // find car of user
        const cars = await Car.find({owner: _id})

        // send response
        res.status(200).json({
            success : true,
            cars
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success : false,
            message : error.message
        })
    }

}

// API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
    try {
        // get user id
        const {_id} = req.user

        // get car id
        const {carId} = req.body

        // find car of user
        const car = await Car.findById(carId)

        // check if car owner is same as user
        if(car.owner.toString() !== _id.toString()){
            return res.status(401).json({
                success : false,
                message : "You are not authorized to perform this action"
            })
        }

        // toggle car availability
        car.isAvailable = !car.isAvailable

        // save car
        await car.save()

        // send response
        res.status(200).json({
            success : true,
            message : "Car availability updated successfully"
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success : false,
            message : error.message
        })
    }
}

// API to delete a car
export const deleteCar = async (req, res) => {
    try {
        // get user id
        const {_id} = req.user

        // get car id
        const {carId} = req.body

        // find car of user
        const car = await Car.findById(carId)

        // check if car owner is same as user
        if(car.owner.toString() !== _id.toString()){
            return res.status(401).json({
                success : false,
                message : "You are not authorized to perform this action"
            })
        }

        // remove owner from car
        car.owner = null

        // mark car as unavailable
        car.isAvailable = false

        // save car
        await car.save()

        // send response
        res.status(200).json({
            success : true,
            message : "Car removed successfully"
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success : false,
            message : error.message
        })
    }
}

// API to get Dashboard data for owner
export const getDashboardData = async (req, res) => {
    try {
        // get user id and role
        const {_id, role} = req.user

        // check if role is owner
        if(role !== 'owner'){
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this data"
            })
        }

        // if role is owner then get total cars listed by owner
        const cars = await Car.find({owner: _id})

        const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt : -1})

        const pendingBooking = await Booking.find({owner: _id, status : 'pending'})
        const completedBooking = await Booking.find({owner: _id, status : 'confirmed'})
        const cancelledBooking = await Booking.find({owner: _id, status : 'cancelled'})

        // calculate monthly earnings
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars : cars.length,
            totalBookings : bookings.length,
            pendingBookings : pendingBooking.length,
            completedBookings : completedBooking.length,
            cancelledBookings : cancelledBooking.length,
            recentBookings : bookings.slice(0,3),
            monthlyRevenue
        }

        // send response
        res.status(200).json({
            success : true,
            dashboardData
        })


        

    } catch (error) {
        console.log(error.message)
        res.json({
            success : false,
            message : error.message
        })
    }
}

// API to update user image
export const updateUserImage = async (req, res) => {

    try {
        
        // get user id
        const {_id} = req.user;

        // get image
        const imageFile = req.file;

        // read image file buffer
        const fileBuffer = fs.readFileSync(imageFile.path);

        // upload image to imagekit and convert to base64 format
        const response = await imageKit.upload({
            file: fileBuffer, //required
            fileName: imageFile.originalname, //required
            folder : '/users'
        })

        // optimize through imageUrl transformation
        var optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { width : '480' },    // width resizing
                { quality : 'auto' },   // auto compression
                { format : 'webp' }   //  onvert to modern format

            ]
        })

        // store optimized image url in variable
        const image = optimizedImageUrl;
        
        // update user image in database
        await User.findByIdAndUpdate(_id, {
            image
        })

        // send response
        res.status(200).json({
            success : true,
            message: "User image updated successfully",
            image
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success : false,
            message : error.message
        })
    }
}
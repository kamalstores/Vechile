import path, { format } from "path";
import imageKit from "../configs/imageKit.js";
import {User} from "../models/User.js";
import fs from "fs";
import { Car } from "../models/Car.js";

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
import {User} from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// this function generate token
const generateToken = (userId) => {

    // payload that contains user id used to generate token
    const payload = userId
    return jwt.sign(payload, process.env.JWT_SECRET)

}



// this function will handle user registration when register route is hit
export const registerUser = async (req, res) => {

    try {

        // Destructure the request body
        const {name, email, password} = req.body;

        // Check if all fields are filled
        if(!name || !email || !password || password.length < 8){
            return res.json({
                success : false,
                message: "Fill all fields"
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.json({
                success : false,
                message: "User already exists"
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const user = await User.create({
            name,
            email,
            password : hashedPassword
        })

        // generate token for the user
        const token = generateToken(user._id.toString())

        // send response
        res.status(201).json({
            success : true,
            token
        })


    } catch (error) {
        console.error(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }

}

// Login User
export const loginUser = async (req, res) => {
    try {
        
        // Destructure the request body
        const {email, password} = req.body;

        // find user 
        const user = await User.findOne({email})

        // if user not found
        if(!user){
            return res.json({
                success : false,
                message: "User not found"
            })
        }

        // if user found then compare password
        const isMatch = await bcrypt.compare(password, user.password)

        // if password does not match
        if(!isMatch){
            return res.json({
                success : false,
                message: "Invalid credentials"
            })
        }

        // if password matches then generate token
        const token = generateToken(user._id.toString())

        // send response
        res.status(200).json({
            success : true,
            token
        })
        
    } catch (error) {
        console.error(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}

// function to get user details using jwt token
export const getUserData = async (req, res) => {
    try {
        
        // get user id from request object 
        const {user} = req;

        // send user data as response through middleware
        res.status(200).json({
            success : true,
            user
        })

    } catch (error) {
        console.error(error.message);
        res.json({
            success : false,
            message: error.message
        })
    }
}
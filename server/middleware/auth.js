import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// function to protect routes
export const protect = async (req, res, next) => {

    // get token from headers
    const token = req.headers.authorization;

    // if token not found
    if(!token){
        return res.status(401).json({
            success : false,
            message: "Not authorized, token missing"
        })
    }

    // if token found then verify it
    try {
        
        // decode token
        const userId = jwt.decode(token, process.env.JWT_SECRET);

        // check if user id is not available
        if(!userId){
            return res.status(401).json({
                success : false,
                message: "Not authorized, token invalid"
            })
        }

        // find user from the database by user id and remove password field
        req.user = await User.findById(userId).select("-password");

        // proceed to next middleware
        next();

    } catch (error) {
        return res.status(401).json({
            success : false,
            message: "Not authorized, token invalid"
        })
    }
}


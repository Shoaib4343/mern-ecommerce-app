import userModel from "../models/auth.model.js";
import { comparePassword, hashedPassword } from "../utils/auth.utils.js";
import jwt from 'jsonwebtoken'


export const registerUserController = async(req, res) => {
   try {
    const {name, email, password, address, phone} = req.body;
    // // Validation
    // if(!name || !email || !password || !address || !phone){
    //     return res.status(400).json({message:"All fields are required"});
    // }

    // Check if user already exists
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(200).json({
            success: false,
            message: "User already registered. Please login."
        })
    }

    // Create new user
    const hashedPass = await hashedPassword(password);
    const newUser = new userModel({name, email, password:hashedPass, address, phone,role:0});
    await newUser.save();
    
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        newUser,
    });
   } catch (error) {
    console.log('Error while creating user.', error.message);
    res.status(500).json({
        success: false,
        message: "Error in Registering user",
        error: error.message
    })
   }
}


export const loginUserController = async(req, res) => {
    try {
        const {email, password} = req.body;

        // // Validation
        // if(!email || !password){
        //     return res.status(400).json({message:"Email and Password are required"});
        // }

        // find user thorugh email 
        const user = await userModel.findOne({email});

        // if user not found
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        // password check
        const verifyPassword = await comparePassword(password, user.password);
        if(!verifyPassword){
             return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            })
        };
        
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        )

        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })

    } catch (error) {
        console.log('Error in Loging user.')
        res.status(500).json({
            success: false,
            message: "Error in Login user",
            error: error.message
        })
    }
}
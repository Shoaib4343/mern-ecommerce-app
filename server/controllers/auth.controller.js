import userModel from "../models/auth.model.js";
import { comparePassword, hashedPassword } from "../utils/auth.utils.js";
import jwt from "jsonwebtoken";

// Register Controller
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, address, phone, answer } = req.body;
    // // Validation
    // if(!name || !email || !password || !address || !phone){
    //     return res.status(400).json({message:"All fields are required"});
    // }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Create new user
    const hashedPass = await hashedPassword(password);
    const hashedAnswer = await hashedPassword(answer);
    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
      address,
      phone,
      answer: hashedAnswer,
      role: 0,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log("Error while creating user.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in Registering user",
      error: error.message,
    });
  }
};

// Login Controller
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // // Validation
    // if(!email || !password){
    //     return res.status(400).json({message:"Email and Password are required"});
    // }

    // find user thorugh email
    const user = await userModel.findOne({ email });

    // if user not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // password check
    const verifyPassword = await comparePassword(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

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
    });
  } catch (error) {
    console.log("Error in Loging user.");
    res.status(500).json({
      success: false,
      message: "Error in Login user",
      error: error.message,
    });
  }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Find user by email and answer to security question
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    // compare the provided answer with the stored hashed answer
    const isAnswerCorrect = await comparePassword(answer, user.answer);
    if (!isAnswerCorrect) {
      return res.status(400).json({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    // Hash the new password
    const hashedNewPassword = await hashedPassword(newPassword);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log("Error in forgot password.", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong in forgot password",
      error: error.message,
    });
  }
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        maxlength: 128,
    },
    address: {
        type: String,
        default: "",
        trim: true,
        maxlength: 256,
    },
    phone: {
        type: String,
        default: "",
        trim: true,
        maxlength: 15,
    },
    role: {
        type: Number,
        default: 0, // 0 - user, 1 - admin
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);

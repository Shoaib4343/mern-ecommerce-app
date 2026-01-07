import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    slug:{
        type: String,
        lowercase: true,
        required: true,
        unique: true
    }
},{timestamps:true});


export default mongoose.model("Category",categorySchema)
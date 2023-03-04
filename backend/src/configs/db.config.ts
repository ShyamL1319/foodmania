import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const URI = process.env.MONGODB_URI||"";
export const dbConnect = () => { 
    mongoose.set('strictQuery', true)
    mongoose.connect(URI).then(
        () => { console.log("connected successfully") },
        (error) => console.log(error)
    );
}
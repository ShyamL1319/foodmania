import mongoose from "mongoose";
const URI = "mongodb+srv://foodmania:foodmania@foodmania.ieiomix.mongodb.net/?retryWrites=true&w=majority";
export const dbConnect = () => { 
    mongoose.set('strictQuery', true)
    mongoose.connect(URI).then(
        () => { console.log("connected successfully") },
        (error) => console.log(error)
    );
}
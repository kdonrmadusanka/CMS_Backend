import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected.");
    } catch(error) {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
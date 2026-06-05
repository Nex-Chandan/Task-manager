import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectDb=async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongodb connected succesfully`)

    }
    catch(err){
    console.log(`some error occured during mongodb connection`,err)
    }
}

export default connectDb;

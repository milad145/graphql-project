import mongoose from "mongoose";

import {initiateExpress} from "./libs/init.js";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://0.0.0.0:27017/graphql");

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        initiateExpress()
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

(() => connectDB())()

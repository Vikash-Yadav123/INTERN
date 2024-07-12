import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';

const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL10);
        console.log(`DATABASE CONNECT ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(` DATABASE CONNECTION ERROR ${error}`.bgRed.white);
    }
}
export default ConnectDb;
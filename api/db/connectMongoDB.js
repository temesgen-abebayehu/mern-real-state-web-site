import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connnected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error when connect mongoDB:", error.message);
        process.exit(1);
    }
};

export default connectMongoDB;
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {dbName: "NoteApp"});
    console.log("Database is connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

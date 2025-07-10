import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("error while connecting db :", error);
    console.log("Error while connecting database...");
  }
};
export default db;

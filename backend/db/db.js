import mongoose from 'mongoose';
import dotenv from 'dotenv';
console.log('inside sign up');
dotenv.config();
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log('error while connecting db :', error.message);
    console.log('Error while connecting database...');
    process.exit(1);
  }
};
export default db;

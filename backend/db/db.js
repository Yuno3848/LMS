import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    ('error while connecting db :', error);
    ('Error while connecting database...');
  }
};
export default db;

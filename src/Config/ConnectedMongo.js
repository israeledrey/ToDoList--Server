import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const uri = process.env.MONGODB_URI || '';

export const connectToMongo = async () => {
    if (mongoose.connection.readyState === 0) {  
        try {
            console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);
          await mongoose.connect(uri);
        } catch (error) {
          console.error('MongoDB connection error:', error);
          throw error;
        }
    }
}

export const close = async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  };
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/study-planner';

    try {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected successfully');
      return;
    } catch (error) {
      console.warn('Local MongoDB not available. Starting in-memory MongoDB for development...');
      memoryServer = await MongoMemoryServer.create();
      const memoryUri = memoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log('MongoDB connected via in-memory server');
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;

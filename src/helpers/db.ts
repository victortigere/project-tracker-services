import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/project-planner');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectDB;
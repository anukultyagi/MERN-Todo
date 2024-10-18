import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/todo-app');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

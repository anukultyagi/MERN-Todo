import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { PORT } from './config/config.js';
import TodoRoute from './routes/TodosRoute.js';

const app = express();

const startServer = async () => {
    // Connect to MongoDB
    await connectDB();

    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }));

    app.use(express.json()); // Parse JSON data in requests

    // Routes
    app.use('/', TodoRoute);

    // Server listening
    app.listen(PORT, () => {
        console.log(`App is listening on http://localhost:${PORT}`);
    });
};

// Start the server
startServer();

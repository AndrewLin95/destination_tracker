import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

// MongoConnection
const mongoDBUriKey = process.env.MONGO_ATLAS_URI || "";
mongoose.connect(mongoDBUriKey);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once("open", () => console.log("Connected to DB!"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Paths
import authRoutes from './src/routes/authRoutes';

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
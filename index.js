
import express from "express";
import {config} from 'dotenv'
import { initApp } from "./src/initiate-app.js";
import cors from "cors"; 

const app = express();

const allowedOrigins = ['http://127.0.0.1:5502', 'http://localhost:3000','https://rta.ag','traffic.rta.ag'];

// Use cors middleware with allowed origins
app.use(cors({
    origin: function (origin, callback) {
        // Check if the origin is allowed or is undefined (for requests not using CORS)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

config();
initApp(app,express)


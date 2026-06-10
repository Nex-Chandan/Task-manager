import express from "express";
import dotenv from "dotenv";

import connectDb  from "./config/db.js";
import router from "./routes/AuthRoutes.js"
import router1 from "./routes/Taskroutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js";
import AppError from "./utills/AppError.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// database
connectDb();

// routes
app.use("/api/auth", router);
app.use("/api/task",router1);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server started at ${port}`);
});
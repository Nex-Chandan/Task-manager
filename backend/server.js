import express from "express";
import dotenv from "dotenv";

import connectDb  from "./config/db.js";
import router from "./routes/AuthRoutes.js"
import router1 from "./routes/Taskroutes.js"

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


app.listen(port, () => {
    console.log(`server started at ${port}`);
});
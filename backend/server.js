import express from "express";
import dotenv from "dotenv";

import connectDb  from "./config/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// database
connectDb();

app.get("/", (req, res) => {
    res.send("server running");
});

app.listen(port, () => {
    console.log(`server started at ${port}`);
});
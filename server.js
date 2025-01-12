import "dotenv/config.js"
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import mainRouter from "./routes/mainRouter.js";

const PORT = process.env.PORT | 8080;
const URI = process.env.MONGODB_URI;


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/", mainRouter);

app.listen(PORT, async () => {
    console.log("Server is running at port: ", PORT);
    const connectDB = await mongoose.connect(URI);
    console.log("Database connected..")
});

// app.get("/", (req, res) => {
//     res.send("Hello, I'm root");
// })
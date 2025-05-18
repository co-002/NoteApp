import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.js";
import noteRouter from "./routes/note.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

// Databse connection
connectDB();

// Middlewares
dotenv.config();
app.use(cors({
  origin: "https://noteapp-w3u7.onrender.com",
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type"]
}))
app.use(express.json());
app.use(cookieParser());

// User router
app.use("/api/user", userRouter);
//Note router
app.use("/api/note", noteRouter);

app.listen(port, () => {
  console.log("Server is running");
});

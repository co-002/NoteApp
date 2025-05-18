import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.js";
import noteRouter from "./routes/note.js";
import cookieParser from "cookie-parser";
import cors from "cors"


//     https://chatgpt.com/c/68282e1b-9654-8002-9154-2b75830369a7
const app = express();
const port = process.env.PORT || 3000;

// Databse connection
connectDB();

// Middlewares
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173",
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

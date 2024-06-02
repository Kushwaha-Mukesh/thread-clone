import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // to parse form data in the req.body
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to backend of thread app!");
});

app.use("/api/v1/user", userRoutes);

export default app;

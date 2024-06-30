import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();

app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // to parse form data in the req.body
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to backend of thread app!");
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

export default app;

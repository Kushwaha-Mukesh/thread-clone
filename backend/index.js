import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected!"))
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
    process.exit(1);
  });

app.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);

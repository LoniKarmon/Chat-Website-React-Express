import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch (err) {
  console.log(err.message);
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default db;

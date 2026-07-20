// db.js
import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017/srm_bd");
console.log("MongoDB connected");

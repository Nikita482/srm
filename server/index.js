// index.js
import express from "express";
import cors from "cors";
import "./config/db.js";
import "./scripts/createUser.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Сервер запущен!");
});

app.listen(3000, () => {
  console.log("Server started on 3000");
});

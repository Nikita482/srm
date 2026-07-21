// index.js
import express from "express";
import cors from "cors";
import "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cooffeeRoutes from "./routes/coffee.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/coffee", cooffeeRoutes);

app.get("/", (req, res) => {
  res.send("Сервер запущен!");
});

app.listen(3000, () => {
  console.log("Server started on 3000");
});

// routes/user.routes.js
import express from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";

const router = express.Router();

// test
router.get("/", getUsers);
router.post("/", createUser);

// prod

export default router;

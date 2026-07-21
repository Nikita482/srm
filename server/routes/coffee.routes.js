// routes/coffee.routes.js
import express from "express";
import { createMonths } from "../controllers/coffee.controller.js";

const router = express.Router();

router.post("/", createMonths);

export default router;

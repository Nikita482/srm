// routes/coffee.routes.js
import express from "express";
import { createMonths, getMonths } from "../controllers/coffee.controller.js";

const router = express.Router();

router.post("/", createMonths);
router.get("/", getMonths);

export default router;

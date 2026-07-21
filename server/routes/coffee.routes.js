// routes/coffee.routes.js
import express from "express";
import {
  createMonths,
  getMonths,
  addRow,
} from "../controllers/coffee.controller.js";

const router = express.Router();

router.post("/", createMonths);
router.get("/", getMonths);
router.post("/:id/row", addRow);

export default router;

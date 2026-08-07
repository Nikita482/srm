// routes/coffee.routes.js
import express from "express";
import {
  createMonths,
  getMonths,
  addRow,
  updateRow,
  deleteRow,
} from "../controllers/coffee.controller.js";

const router = express.Router();

router.post("/", createMonths);
router.get("/", getMonths);
router.post("/:id/row", addRow);
router.patch("/:monthId/row/:rowId", updateRow);
router.delete("/:monthId/row/:rowId", deleteRow);

export default router;

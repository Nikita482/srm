// controllers/coffee.controller.js
import Coffee from "../models/Coffee.js";

// POST создать месяц
export const createMonths = async (req, res) => {
  try {
    const month = await Coffee.create(req.body);
    console.log(month);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

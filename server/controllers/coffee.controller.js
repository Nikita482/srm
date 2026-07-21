// controllers/coffee.controller.js
import Coffee from "../models/Coffee.js";

// POST создать месяц
export const createMonths = async (req, res) => {
  try {
    res.status(201).json(await Coffee.create(req.body));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET отправить месяца
export const getMonths = async (req, res) => {
  try {
    res.json(await Coffee.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

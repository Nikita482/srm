// controllers/coffee.controller.js
import Coffee from "../models/Coffee.js";

// GET отправить месяца
export const getMonths = async (req, res) => {
  try {
    res.json(await Coffee.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST создать месяц
export const createMonths = async (req, res) => {
  try {
    res.status(201).json(await Coffee.create(req.body));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST добавить недели в месяц
export const addRow = async (req, res) => {
  try {
    const month = await Coffee.findById(req.params.id);
    month.data.push(req.body);
    await month.save();
    res.json(month);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

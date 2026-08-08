// controllers/coffee.controller.js
import Coffee from "../models/Coffee.js";

// get отправить месяца
export const getMonths = async (req, res) => {
  try {
    res.json(await Coffee.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post создать месяц
export const createMonths = async (req, res) => {
  try {
    res.status(201).json(await Coffee.create(req.body));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post добавить недели в месяц
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

// patch обновляю неделю месяца
export const updateRow = async (req, res) => {
  const { monthId, rowId } = req.params;
  const editingRow = req.body;

  try {
    const month = await Coffee.findOneAndUpdate(
      {
        _id: monthId,
        "data._id": rowId,
      },
      {
        $set: {
          "data.$": editingRow,
        },
      },
      { returnDocument: "after" },
    );

    if (!month) {
      return res.status(404).json({ message: "Месяц или строка не найдены" });
    }

    res.json(month);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete удаляю неделю
export const deleteRow = async (req, res) => {
  try {
    const { monthId, rowId } = req.params;

    const updatedMonth = await Coffee.findByIdAndUpdate(
      monthId,
      {
        $pull: {
          data: { _id: rowId },
        },
      },
      { returnDocument: "after" },
    );

    if (!updatedMonth)
      return res.status(404).json({ message: "Месяц не найден" });

    res.json(updatedMonth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete удаляю месяц
export const deleteMonth = async (req, res) => {
  try {
    const { monthId } = req.params;
    await Coffee.findByIdAndDelete(monthId);
    res.status(200).json({ message: "Месяц удалён" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import { useState } from "react";
import type { CoffeeRow } from "../types/coffee";
import dayjs from "dayjs";

export const useCoffeeForm = () => {
  const [newRow, setNewRow] = useState<CoffeeRow>({
    date: [],
    salary: 0,
    expenses: 0,
    cashCollection: 0,
    paid: 0,
    comment: "",
    accrued: 0,
    remaining: 0,
  });
  const [monthName, setMonthName] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [editingRow, setEditingRow] = useState<CoffeeRow | null>(null);

  // очистить дни
  const clearDates = () => {
    setNewRow((prev) => ({
      ...prev,
      date: [],
    }));
  };

  // дообовляю дни в неделю
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;

    const day = String(date.date());

    setNewRow((prev) => {
      const newDays = prev.date.includes(day) ? prev.date : [...prev.date, day];

      return {
        ...prev,
        salary: newDays.length * 3000,
        date: newDays,
      };
    });

    setSelectedDate(null);
  };

  // крестик у тегов
  const removeDate = (day: string) => {
    setNewRow((prev) => {
      const newDays = prev.date.filter((item) => item !== day);

      return {
        ...prev,
        salary: newDays.length * 3000,
        date: newDays,
      };
    });
  };

  // удаляю дни из недели
  const removeEditDate = (day: string) => {
    setEditingRow((prev) => {
      if (!prev) return prev;

      const newDays = prev.date.filter((item) => item !== day);

      return {
        ...prev,
        date: newDays,
        salary: newDays.length * 3000,
      };
    });
  };

  // добавление дней в неделю
  const addEditDate = () => {};

  return {
    newRow,
    monthName,
    selectedDate,
    editingRow,
    clearDates,
    handleDateChange,
    removeDate,
    setMonthName,
    removeEditDate,
    setEditingRow,
    addEditDate,
  };
};

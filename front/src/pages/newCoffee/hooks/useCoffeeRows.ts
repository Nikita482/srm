import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";
import { useAddRowMutation, useUpdateRowMutation } from "../api/coffeeApi";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import type { CoffeeRow } from "../types/coffee";

export const useCoffeeRows = () => {
  const [addRowRequest] = useAddRowMutation();
  const selectedMonthId = useSelector(
    (state: RootState) => state.coffee.selectedMonthId,
  );
  const [newRow, setNewRow] = useState({
    date: [],
    salary: 0,
    expenses: 0,
    cashCollection: 0,
    paid: 0,
    comment: "",
    accrued: 0,
    remaining: 0,
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [editingRow, setEditingRow] = useState<CoffeeRow | null>(null);
  const [updateRowRequest] = useUpdateRowMutation();

  // добавление новой строки в месяц
  const addRow = () => {
    addRowRequest({ selectedMonthId, newRow });
    setNewRow((prev) => ({ ...prev, date: [] }));
  };

  // добавление дней в неделю
  const handleDateChange = (day: Dayjs | null) => {
    if (!day) return;

    const selectedDay = String(day.date());

    setNewRow((prev) => ({
      ...prev,
      date: prev.date.includes(selectedDay)
        ? prev.date
        : [...prev.date, selectedDay],
    }));

    setSelectedDate(null);
  };

  // крестик у тегов при выборе дней недели
  const removeDate = (day: string) => {
    setNewRow((prev) => ({
      ...prev,
      date: prev.date.filter((dayRow) => dayRow !== day),
    }));
  };

  // удаляю дни из тестовой недели
  const removeEditDate = (day: string) => {
    setEditingRow((prev) => {
      if (!prev) return prev;

      const newDays = prev.date.filter((item) => item !== day);

      return { ...prev, date: newDays };
    });
  };

  // добовляю дни в тестовую неделю
  const addEditDate = (day: number) => {
    setEditingRow((prev) => {
      if (!prev) return prev;

      const newDay = String(day);

      return {
        ...prev,
        date: prev.date.includes(newDay) ? prev.date : [...prev.date, newDay],
      };
    });
  };

  // обновляю всю неделю
  const saveEditingRow = async (rowId: string) => {
    console.log(rowId);
    await updateRowRequest({ selectedMonthId, rowId, editingRow });
  };

  console.log(editingRow);

  return {
    addRow,
    newRow,
    handleDateChange,
    removeDate,
    selectedDate,
    setNewRow,
    editingRow,
    setEditingRow,
    removeEditDate,
    saveEditingRow,
    addEditDate,
  };
};

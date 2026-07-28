import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";
import { useAddRowMutation, useUpdateRowMutation } from "../api/coffeeApi";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import type { CoffeeRow } from "../types/coffee";
import { getOperationConfig } from "../utils/date";
import { initialRow } from "../constants/initialRow";

export const useCoffeeRows = () => {
  const [addRowRequest] = useAddRowMutation();
  const selectedMonthId = useSelector(
    (state: RootState) => state.coffee.selectedMonthId,
  );
  const [newRow, setNewRow] = useState(initialRow);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [editingRow, setEditingRow] = useState<CoffeeRow | null>(null);
  const [updateRowRequest] = useUpdateRowMutation();
  const [operationDraft, setOperationDraft] = useState({
    type: "",
    amount: "",
    text: "",
    date: null as Dayjs | null,
  });

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

  // создание коментария
  const createComment = () => {
    if (!operationDraft.type) return null;

    return {
      operation: operationDraft.type,
      amount: Number(operationDraft.amount),
      text: operationDraft.text,
      date: operationDraft.date?.format("D MMMM"),
    };
  };

  // отвечает за изменение суммы в строке (paid, expenses, cashCollection)
  const updateOperationField = () => {
    const { field, multiplier } = getOperationConfig(operationDraft.type);
    if (!field) return {};

    return {
      [field]:
        (editingRow?.[field] ?? 0) + Number(operationDraft.amount) * multiplier,
    };
  };

  // собрает полностью обновлённую строку для замены editingRow на эту строку
  const buildUpdatedRow = () => {
    const comment = createComment();

    return {
      ...editingRow,
      ...updateOperationField(),
      comment: [
        ...(editingRow?.comment ?? []),
        ...(operationDraft.type ? [comment] : []),
      ],
    };
  };

  // очистить форму коментария после сохранения
  const resetOperationDraft = () => {
    setOperationDraft({
      type: "",
      amount: "",
      text: "",
      date: null,
    });
  };

  // обновляю всю неделю
  const saveEditingRow = async (rowId: string) => {
    if (operationDraft.type && !operationDraft.amount) return;

    const updatedRow = buildUpdatedRow();

    setEditingRow(updatedRow);

    await updateRowRequest({
      selectedMonthId,
      rowId,
      editingRow: updatedRow,
    });

    resetOperationDraft();
  };

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
    addEditDate,
    setOperationDraft,
    operationDraft,
    saveEditingRow,
  };
};

import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";
import {
  useAddRowMutation,
  useGetMonthsQuery,
  useUpdateRowMutation,
  useDeleteRowMutation,
} from "../api/coffeeApi";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import type { CoffeeRow } from "../types/coffee";
import { initialRow } from "../constants/initialRow";

export const useCoffeeRows = () => {
  const [addRowRequest] = useAddRowMutation();
  const { data: months } = useGetMonthsQuery();
  const [updateRowRequest] = useUpdateRowMutation();
  const [deleteRowRequest] = useDeleteRowMutation();
  const selectedMonthId = useSelector(
    (state: RootState) => state.coffee.selectedMonthId,
  );
  const [newRow, setNewRow] = useState(initialRow);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [editingRow, setEditingRow] = useState<CoffeeRow | null>(null);
  const [operationDraft, setOperationDraft] = useState({
    type: "",
    amount: 0,
    text: "",
    date: null as string | null,
  });
  const [hasChanges, setHasChanges] = useState(false);

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
    setEditingRow((prev) => ({
      ...prev,
      date: prev.date.includes(String(day))
        ? prev.date
        : [...prev.date, String(day)],
    }));
  };

  // создание коментария
  const createComment = () => {
    if (!operationDraft.type) return null;

    return {
      _id: crypto.randomUUID(),
      operation: operationDraft.type,
      amount: Number(operationDraft.amount),
      text: operationDraft.text,
      date: operationDraft.date,
    };
  };

  // удаление коментария
  const removeComment = (commentId) => {
    setEditingRow((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        comment: prev.comment.filter((com) => com._id !== commentId),
      };
    });
    setHasChanges(true);
  };

  // собрает всю обновлённую неделю
  const buildUpdatedRow = () => {
    const comment = createComment();

    return {
      ...editingRow,
      comment: [...editingRow.comment, ...(comment ? [comment] : [])],
    };
  };

  // обновляю всю неделю
  const saveEditingRow = async (rowId: string) => {
    const updatedRow = buildUpdatedRow();

    setEditingRow(updatedRow);

    await updateRowRequest({
      selectedMonthId,
      rowId,
      editingRow: updatedRow,
    });

    setOperationDraft({
      type: "",
      amount: 0,
      text: "",
      date: null,
    });
    setHasChanges(false);
  };

  // поиск недель для удаления
  const getWeeksForDelete = months?.find(
    (week) => week?._id === selectedMonthId,
  );

  const deleteRow = async (rowId: string) => {
    await deleteRowRequest({ selectedMonthId, rowId });
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
    saveEditingRow,
    operationDraft,
    setOperationDraft,
    removeComment,
    hasChanges,
    getWeeksForDelete,
    deleteRow,
  };
};

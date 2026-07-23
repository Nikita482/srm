// useCoffeeRows

import { apiAddRow, apiSaveEditingRow } from "../../api/coffee";
import type { CoffeeRow } from "../../types/coffee";

export const useCoffeeRows = () => {
  const addRow = async (selectedMonth: string, newRow: CoffeeRow) => {
    const data = await apiAddRow(selectedMonth, newRow);
    return data;
  };

  const saveEditingRow = async (
    selectedMonth: string,
    rowId: string,
    editingRow: CoffeeRow,
  ) => {
    const data = await apiSaveEditingRow(selectedMonth, rowId, editingRow);

    return data;
  };

  return { addRow, saveEditingRow };
};

import { InputNumber } from "antd";
import type { CoffeeRow } from "../../types/coffee";

const EditableNumber = ({
  record,
  field,
  editingRow,
  setEditingRow,
  saveEditingRow,
}: {
  record: CoffeeRow;
  field: keyof CoffeeRow;
  editingRow: CoffeeRow | null;
  setEditingRow: React.Dispatch<React.SetStateAction<CoffeeRow | null>>;
  saveEditingRow: (id: string) => void;
}) => {
  return (
    <InputNumber
      size="small"
      variant="borderless"
      width={60}
      value={
        editingRow?._id === record._id
          ? Number(editingRow[field])
          : Number(record[field])
      }
      formatter={(value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
      }
      onFocus={() => {
        if (editingRow?._id !== record._id) {
          setEditingRow(record);
        }
      }}
      onChange={(v) => {
        setEditingRow((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [field]: v ?? 0,
          };
        });
      }}
      onBlur={() => {
        if (editingRow?._id === record._id) {
          saveEditingRow(record._id);
        }
      }}
      onPressEnter={() => {
        if (editingRow?._id === record._id) {
          saveEditingRow(record._id);
        }
      }}
    />
  );
};

export default EditableNumber;

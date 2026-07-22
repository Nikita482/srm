import type { ColumnsType } from "antd/es/table";
import type { CoffeeRow } from "../types/coffee";

export const columns: ColumnsType<CoffeeRow> = [
  {
    title: "Число",
    dataIndex: "date",
    render: (dates: string[]) => dates.join(", "),
  },
  { title: "Зп", dataIndex: "salary" },
  { title: "Траты", dataIndex: "expenses" },
  { title: "Инкас", dataIndex: "cashCollection" },
  { title: "Заплатили", dataIndex: "paid" },
  { title: "Комент", dataIndex: "comment" },
  { title: "Начислено", dataIndex: "accrued" },
  { title: "Осталось", dataIndex: "remaining" },
];

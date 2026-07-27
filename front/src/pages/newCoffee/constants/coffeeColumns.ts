export const columns = [
  {
    title: "Число",
    dataIndex: "date",
    render: (dates: string[]) => dates.join(", "),
  },
  {
    title: "Зп",
    dataIndex: "salary",
    render: (_, record) => record.date.length * 3000,
  },
  {
    title: "Траты",
    dataIndex: "expenses",
  },

  { title: "Инкас", dataIndex: "cashCollection" },
  { title: "Заплатили", dataIndex: "paid" },
  { title: "Комент", dataIndex: "comment" },
  {
    title: "Начислено",
    dataIndex: "accrued",
  },
  { title: "Осталось", dataIndex: "remaining" },
];

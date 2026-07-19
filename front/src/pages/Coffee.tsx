import { Select, Table } from "antd";
import { useState } from "react";

const CoffeePage = () => {
  // Число → date
  // Зп → salary
  // Траты → expenses
  // Инкассация → collection
  // Заплатили → paid
  // Комент → comment
  // Начислено → accrued
  // Осталось → remaining

  const [months, setMonths] = useState([
    {
      id: 1,
      month: "Июль 2026",
      data: [
        {
          key: 1,
          date: "6, 7",
          salary: 5000,
          expenses: 0,
          collection: 800,
          paid: 2200,
          comment: "",
          accrued: 3000,
          remaining: 2000,
        },
        {
          key: 2,
          date: "15",
          salary: 2500,
          expenses: 150,
          collection: 0,
          paid: 0,
          comment: "",
          accrued: 0,
          remaining: 5000,
        },
        {
          key: 3,
          date: "22, 23",
          salary: 2500,
          expenses: 0,
          collection: 0,
          paid: 0,
          comment: "",
          accrued: 0,
          remaining: 5000,
        },
        {
          key: 4,
          date: "27, 28, 29, 30",
          salary: 10000,
          expenses: 0,
          collection: 0,
          paid: 0,
          comment: "",
          accrued: 0,
          remaining: 5000,
        },
      ],
    },
    {
      id: 2,
      month: "Июнь 2026",
      data: [
        {
          key: 1,
          date: "5",
          salary: 2500,
          expenses: 0,
          collection: 0,
          paid: 0,
          comment: "",
          accrued: 0,
          remaining: 2500,
        },
        {
          key: 2,
          date: "9, 11",
          salary: 5000,
          expenses: 150,
          collection: 3000,
          paid: 0,
          comment: "ччч",
          accrued: 2000,
          remaining: 3000,
        },
        {
          key: 3,
          date: "16, 17, 20",
          salary: 7500,
          expenses: 0,
          collection: 2000,
          paid: 1000,
          comment: "",
          accrued: 3000,
          remaining: 4500,
        },
        {
          key: 4,
          date: "25, 26, 27",
          salary: 7500,
          expenses: 0,
          collection: 0,
          paid: 5000,
          comment: "",
          accrued: 5000,
          remaining: 2500,
        },
      ],
    },
  ]);
  const columns = [
    { title: "Число", dataIndex: "date" },
    { title: "Зп", dataIndex: "salary" },
    { title: "Траты", dataIndex: "expenses" },
    { title: "Инкас", dataIndex: "collection" },
    { title: "Заплатили", dataIndex: "comment" },
    { title: "Комент", dataIndex: "paid" },
    { title: "Начислено", dataIndex: "accrued" },
    { title: "Осталось", dataIndex: "remaining" },
  ];

  // создание месяца
  const createMonth = () => {
    const newMonth = {
      id: Date.now(),
      month: new Date()
        .toLocaleString("ru-RU", { month: "long", year: "numeric" })
        .replace(" г.", ""),
      data: [],
    };
    setMonths((prev) => [...prev, newMonth]);
  };

  // выбор месяца
  const monthOptions = months.map((months) => ({
    value: months.id,
    label: months.month,
  }));

  return (
    <>
      <h1>CoffeePage - кофейня</h1>
      <button onClick={() => createMonth()}>new month</button>
      <Select
        style={{ width: 150 }}
        defaultValue="месяц"
        options={monthOptions}
      />
      <Table columns={columns} dataSource={months[0].data} />
    </>
  );
};

export default CoffeePage;

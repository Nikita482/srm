import { DatePicker, Select, Table, Tag } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

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
    // {
    //   id: 1,
    //   month: "Июль 2026",
    //   data: [
    //     {
    //       key: 1,
    //       date: "6, 7",
    //       salary: 5000,
    //       expenses: 0,
    //       collection: 800,
    //       paid: 2200,
    //       comment: "",
    //       accrued: 3000,
    //       remaining: 2000,
    //     },
    //     {
    //       key: 2,
    //       date: "15",
    //       salary: 2500,
    //       expenses: 150,
    //       collection: 0,
    //       paid: 0,
    //       comment: "",
    //       accrued: 0,
    //       remaining: 5000,
    //     },
    //     {
    //       key: 3,
    //       date: "22, 23",
    //       salary: 2500,
    //       expenses: 0,
    //       collection: 0,
    //       paid: 0,
    //       comment: "",
    //       accrued: 0,
    //       remaining: 5000,
    //     },
    //     {
    //       key: 4,
    //       date: "27, 28, 29, 30",
    //       salary: 10000,
    //       expenses: 0,
    //       collection: 0,
    //       paid: 0,
    //       comment: "",
    //       accrued: 0,
    //       remaining: 5000,
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   month: "Июнь 2026",
    //   data: [
    //     {
    //       key: 1,
    //       date: "5",
    //       salary: 2500,
    //       expenses: 0,
    //       collection: 0,
    //       paid: 0,
    //       comment: "",
    //       accrued: 0,
    //       remaining: 2500,
    //     },
    //     {
    //       key: 2,
    //       date: "9, 11",
    //       salary: 5000,
    //       expenses: 150,
    //       collection: 3000,
    //       paid: 0,
    //       comment: "ччч",
    //       accrued: 2000,
    //       remaining: 3000,
    //     },
    //     {
    //       key: 3,
    //       date: "16, 17, 20",
    //       salary: 7500,
    //       expenses: 0,
    //       collection: 2000,
    //       paid: 1000,
    //       comment: "",
    //       accrued: 3000,
    //       remaining: 4500,
    //     },
    //     {
    //       key: 4,
    //       date: "25, 26, 27",
    //       salary: 7500,
    //       expenses: 0,
    //       collection: 0,
    //       paid: 5000,
    //       comment: "",
    //       accrued: 5000,
    //       remaining: 2500,
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   month: "Август 2026",
    //   data: [
    //     {
    //       key: 1,
    //       date: "5",
    //       salary: 2500,
    //       expenses: 0,
    //       collection: 0,
    //       paid: 0,
    //       comment: "",
    //       accrued: 0,
    //       remaining: 2500,
    //     },
    //     {
    //       key: 2,
    //       date: "9, 11",
    //       salary: 5000,
    //       expenses: 150,
    //       collection: 3000,
    //       paid: 0,
    //       comment: "ччч",
    //       accrued: 2000,
    //       remaining: 3000,
    //     },
    //     {
    //       key: 3,
    //       date: "16, 17, 20",
    //       salary: 7500,
    //       expenses: 0,
    //       collection: 2000,
    //       paid: 1000,
    //       comment: "",
    //       accrued: 3000,
    //       remaining: 4500,
    //     },
    //     {
    //       key: 4,
    //       date: "25, 26, 27",
    //       salary: 7500,
    //       expenses: 0,
    //       collection: 0,
    //       paid: 5000,
    //       comment: "",
    //       accrued: 5000,
    //       remaining: 2500,
    //     },
    //   ],
    // },
  ]);
  const columns = [
    { title: "Число", dataIndex: "date" },
    { title: "Зп", dataIndex: "salary" },
    { title: "Траты", dataIndex: "expenses" },
    { title: "Инкас", dataIndex: "collection" },
    { title: "Заплатили", dataIndex: "paid" },
    { title: "Комент", dataIndex: "comment" },
    { title: "Начислено", dataIndex: "accrued" },
    { title: "Осталось", dataIndex: "remaining" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(
    months[months.length - 1]?.id,
  );
  const [monthName, setMonthName] = useState("");
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // создание месяца
  const createMonth = () => {
    const newMonth = {
      id: Date.now(),
      month: monthName,
      data: [],
    };
    setMonths((prev) => [...prev, newMonth]);
    setSelectedMonth(newMonth.id);
    setMonthName("");
  };

  // все месяца в селекте
  const monthOptions = months.map((months) => ({
    value: months.id,
    label: months.month,
  }));

  // поиск нужного месяца по id
  const currentMonth = months.find((month) => month.id === selectedMonth);

  // добовление новой строки
  const addRow = (days: string[]) => {
    const newRow = {
      key: Date.now(),
      date: days.join(", "),
      salary: days.length * 3000,
      expenses: 0,
      collection: 0,
      paid: 0,
      comment: "",
      accrued: 0,
      remaining: 0,
    };

    setMonths((prev) =>
      prev.map((month) =>
        month.id === selectedMonth
          ? {
              ...month,
              data: [...month.data, newRow],
            }
          : month,
      ),
    );

    setDays([]);
  };

  // выбор дней недели для строки
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;

    setDays((prev) => [...prev, String(date.date())]);
    setSelectedDate(null);
  };

  return (
    <>
      <h1>CoffeePage - кофейня</h1>
      <input
        type="text"
        placeholder="имя месяца:"
        value={monthName}
        onChange={(e) => setMonthName(e.target.value)}
      />
      <button disabled={!monthName.trim()} onClick={() => createMonth()}>
        Добавить месяц
      </button>

      <br />

      <DatePicker
        value={selectedDate}
        format="D"
        onChange={handleDateChange}
        size="middle"
        allowClear={false}
      />
      <button
        onClick={() => addRow(days)}
        disabled={months.length === 0 || days.length === 0}
      >
        Добавить Неделю
      </button>

      {days.map((day) => (
        <Tag
          key={day}
          closable
          onClose={() => setDays((prev) => prev.filter((item) => item !== day))}
        >
          {day}
        </Tag>
      ))}
      {/* {days.map((day) => (
        <Tag
          key={day}
          closable
          onClose={() => {
            setDays((prev) => prev.filter((item) => item !== day));
          }}
        >
          {day}
        </Tag>
      ))} */}

      <br />

      <Select
        style={{ width: 150 }}
        value={selectedMonth}
        options={monthOptions}
        onChange={(value) => setSelectedMonth(Number(value))}
      />
      <Table columns={columns} dataSource={currentMonth?.data} />

      <div style={{ height: "1000px" }}></div>
    </>
  );
};

export default CoffeePage;

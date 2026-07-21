import { DatePicker, Select, Table, Tag } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

const CoffeePage = () => {
  const [months, setMonths] = useState([]);
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
  const createMonth = async () => {
    // test
    const newMonthFront = {
      id: Date.now(),
      month: monthName,
      data: [],
    };

    const newMonth = {
      month: monthName,
      data: [],
    };

    await axios.post("http://localhost:3000/coffee", newMonth);

    setMonths((prev) => [...prev, newMonth]); // ?
    setSelectedMonth(newMonthFront.id); // ?
    setMonthName(""); // ?
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

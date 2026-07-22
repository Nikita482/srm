import { DatePicker, Select, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { apiGetMonths, apiCreateMonth, apiAddRow } from "../api/coffee";
import type { Month, CoffeeRow } from "../types/coffee";
import { columns } from "../constants/coffeeColumns";

const CoffeePage = () => {
  const [months, setMonths] = useState<Month[]>([]);
  const [monthName, setMonthName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [newRow, setNewRow] = useState<CoffeeRow>({
    date: [],
    salary: 0,
    expenses: 0,
    cashCollection: 0,
    paid: 0,
    comment: "",
    accrued: 0,
    remaining: 0,
  });

  // получение всех месяцев
  useEffect(() => {
    const getMonths = async () => {
      const data = await apiGetMonths();
      const reversedMonths = [...data].reverse();
      setMonths(reversedMonths);

      // выбрать последний месяц для селекта
      if (reversedMonths.length === 0) return;
      setSelectedMonth(reversedMonths[0]._id);
    };

    getMonths();
  }, []);

  // создание месяца
  const createMonth = async () => {
    const newMonth = {
      month: monthName,
      data: [],
    };

    const data = await apiCreateMonth(newMonth);

    setMonths((prev) => [data, ...prev]);
    setSelectedMonth(data._id);
    setMonthName("");

    // сбрасываю выбранные дни при создании месяца
    setNewRow((prev) => ({
      ...prev,
      date: [],
    }));
  };

  // создание недели
  const addRow = async () => {
    if (!selectedMonth) return;

    const data = await apiAddRow(selectedMonth, newRow);

    // обновляем месяц в months
    setMonths((prev) =>
      prev.map((month) => (month._id === selectedMonth ? data : month)),
    );

    // сбросить выброные дни недели
    setNewRow((prev) => ({
      ...prev,
      date: [],
    }));
  };

  // опции для селекта
  const monthOptions = months.map((month) => ({
    value: month._id,
    label: month.month,
  }));

  // ищу выбраный месяц
  const currentMonth = months.find((month) => month._id === selectedMonth);

  // дообовляю дни в неделю
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;

    const day = String(date.date());

    setNewRow((prev) => {
      const newDays = prev.date.includes(day) ? prev.date : [...prev.date, day];

      return {
        ...prev,
        salary: newDays.length * 3000,
        date: newDays,
      };
    });

    setSelectedDate(null);
  };

  // крестик у тегов
  const removeDate = (day: string) => {
    setNewRow((prev) => {
      const newDays = prev.date.filter((item) => item !== day);

      return {
        ...prev,
        salary: newDays.length * 3000,
        date: newDays,
      };
    });
  };

  // console.log(newRow.date);

  // подумать че делать с фиксированой зп вдруг потом зп будет не фиксирования
  // придумать как вписывать траты инкас закинули коменты
  // придумать че делать с пагинацией или вообще убрать ее

  // че надо вынести:
  // 2. columns
  // 3. Типы
  // 4. Функции handleDateChange и removeDate

  return (
    <>
      <h1>CoffeePage - кофейня</h1>
      <input
        type="text"
        placeholder="имя месяца:"
        value={monthName}
        onChange={(e) => setMonthName(e.target.value)}
      />
      <button onClick={() => createMonth()} disabled={!monthName.trim()}>
        Добавить месяц
      </button>

      <br />

      <DatePicker
        format="D"
        size="middle"
        allowClear={false}
        value={selectedDate}
        onChange={handleDateChange}
      />
      <button
        onClick={() => addRow()}
        disabled={newRow.date.length === 0 || months.length === 0}
      >
        Добавить Неделю
      </button>

      {newRow.date.map((day) => (
        <Tag key={day} closable onClose={() => removeDate(day)}>
          {day}
        </Tag>
      ))}

      <br />

      <Select
        style={{ width: 150 }}
        value={selectedMonth}
        options={monthOptions}
        onChange={(value) => {
          setSelectedMonth(value);
          setNewRow((prev) => ({
            ...prev,
            date: [],
          }));
        }}
      />
      <Table columns={columns} dataSource={currentMonth?.data} rowKey="_id" />

      <div style={{ height: "1000px" }}></div>
    </>
  );
};

export default CoffeePage;

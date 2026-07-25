import { DatePicker, Select, Tag } from "antd";
import { useCoffeeMonth } from "../hooks/useCreateMonth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMonthId } from "../../../app/store/slices/coffeeSlice";

const CoffeeControls = () => {
  const { createMonth, monthOptions, selectedMonthId } = useCoffeeMonth();
  const [monthName, setMonthName] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <h1>CoffeePage - кофейня</h1>

      <input
        type="text"
        placeholder="Имя месяца:"
        value={monthName}
        onChange={(e) => setMonthName(e.target.value)}
      />
      <button
        onClick={() => {
          createMonth(monthName);
          setMonthName("");
        }}
      >
        Добавить месяц
      </button>

      <br />

      <DatePicker format="D" size="middle" />
      <button>Добавить Неделю</button>
      <Tag closable>xxx</Tag>

      <br />

      <Select
        style={{ width: 150 }}
        value={selectedMonthId}
        options={monthOptions}
        onChange={(monthId) => dispatch(setSelectedMonthId(monthId))}
      />
    </>
  );
};

export default CoffeeControls;

{
  /* <div>
        <h1>CoffeePage - кофейня</h1>
        <input
          type="text"
          placeholder="имя месяца:"
          value={monthName}
          onChange={(e) => setMonthName(e.target.value)}
        />
        <button onClick={() => onCreateMonth()} disabled={!monthName.trim()}>
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
          onClick={() => onAddRow()}
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
            clearDates();
            setExpandedRowKeys([]);
          }}
        />
      </div> */
}

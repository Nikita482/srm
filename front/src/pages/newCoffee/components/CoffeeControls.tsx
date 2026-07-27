import { DatePicker, Select, Tag } from "antd";
import { useCoffeeMonth } from "../hooks/useCoffeeMonths";
import { useCoffeeRows } from "../hooks/useCoffeeRows";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMonthId } from "../../../app/store/slices/coffeeSlice";

const CoffeeControls = () => {
  const { createMonth, monthOptions, selectedMonthId } = useCoffeeMonth();
  const {
    addRow,
    newRow,
    handleDateChange,
    removeDate,
    selectedDate,
    setNewRow,
  } = useCoffeeRows();
  const [monthName, setMonthName] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <h1>CoffeePage - кофейня</h1>

      <div>
        <input
          type="text"
          placeholder="Имя месяца:"
          value={monthName}
          onChange={(e) => setMonthName(e.target.value)}
        />
        <button
          onClick={async () => {
            await createMonth(monthName);
            setMonthName("");
            setNewRow((prev) => ({ ...prev, date: [] }));
          }}
          disabled={!monthName.trim()}
        >
          Добавить месяц
        </button>
      </div>

      <br />

      <div>
        <DatePicker
          format="D"
          size="middle"
          value={selectedDate}
          allowClear={false}
          onChange={handleDateChange}
        />
        <button onClick={() => addRow()} disabled={newRow.date.length === 0}>
          Добавить Неделю
        </button>

        {newRow.date.map((day) => (
          <Tag key={day} closable onClose={() => removeDate(day)}>
            {day}
          </Tag>
        ))}
      </div>

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

import { Button, Card, DatePicker, Select, Space, Table, Tag } from "antd";
import { useCoffeeMonths } from "./hooks/useCoffeeMonths";
import { useCoffeeRows } from "./hooks/useCoffeeRows";
import { useCoffeeForm } from "./hooks/useCoffeeForm";
import { useState } from "react";
import { columns } from "./constants/coffeeColumns";

const CoffeePage = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const {
    months,
    selectedMonth,
    currentMonth,
    monthOptions,
    setSelectedMonth,
    createMonth,
    updateMonth,
  } = useCoffeeMonths();

  const { addRow, saveEditingRow } = useCoffeeRows();

  const {
    newRow,
    monthName,
    selectedDate,
    editingRow,
    selectedEditDate,
    clearDates,
    handleDateChange,
    removeDate,
    setMonthName,
    removeEditDate,
    setEditingRow,
    addEditDate,
    setSelectedEditDate,
  } = useCoffeeForm();

  // создание месяца
  const onCreateMonth = async () => {
    await createMonth(monthName);

    setMonthName("");

    clearDates();
  };

  // создание недели
  const onAddRow = async () => {
    if (!selectedMonth) return;

    const data = await addRow(selectedMonth, newRow);

    updateMonth(data);

    clearDates(); // сбросить выброные дни недели
  };

  // отправляю обнавленную строку на бэк
  const onSaveEditingRow = async (rowId: string) => {
    if (!selectedMonth || !editingRow) return;

    const data = await saveEditingRow(selectedMonth, rowId, editingRow);

    updateMonth(data);
  };

  // console.log(editingRow);
  return (
    <>
      <div>
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
      </div>

      <Table
        columns={columns}
        dataSource={currentMonth?.data}
        rowKey="_id"
        expandable={{
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys([record._id]);
              setEditingRow(record);
            } else {
              setExpandedRowKeys([]);
            }
          },
          expandedRowRender: (record) => (
            <Card>
              <Space>
                <p>Дни:</p>
                {editingRow?.date.map((day) => (
                  <Tag key={day} closable onClose={() => removeEditDate(day)}>
                    {day}
                  </Tag>
                ))}
                <DatePicker
                  placeholder="+ день"
                  format="D"
                  allowClear={false}
                  value={selectedEditDate}
                  onChange={(date) => {
                    if (!date) return;

                    addEditDate(String(date.date()));
                    setSelectedEditDate(null);
                  }}
                />

                <Button onClick={() => onSaveEditingRow(record._id)}>
                  Сохранить
                </Button>
              </Space>
            </Card>
          ),
        }}
      />

      <div style={{ height: "1000px" }}></div>
    </>
  );
};

export default CoffeePage;

// подумать че делать с фиксированой зп вдруг потом зп будет не фиксирования
// придумать как вписывать траты инкас закинули коменты
// придумать че делать с пагинацией или вообще убрать ее
// когда я закончу и выложу куда то проект смогу ли я скинуть ссылку на проект что бы кто то тоже имел доступ к таблицам? если да то как это исправить? авторизация?

import {
  Button,
  DatePicker,
  Flex,
  Input,
  Popconfirm,
  Popover,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { useCoffeeMonth } from "../hooks/useCoffeeMonths";
import { useCoffeeRows } from "../hooks/useCoffeeRows";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMonthId } from "../../../app/store/slices/coffeeSlice";
import { DeleteOutlined } from "@ant-design/icons";

const CoffeeControls = () => {
  const { createMonth, monthOptions, selectedMonthId } = useCoffeeMonth();
  const {
    addRow,
    newRow,
    handleDateChange,
    removeDate,
    selectedDate,
    setNewRow,
    getWeeksForDelete,
    deleteRow,
  } = useCoffeeRows();
  const [monthName, setMonthName] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <Select
        style={{ width: 150 }}
        size="small"
        value={selectedMonthId}
        options={monthOptions}
        onChange={(monthId) => dispatch(setSelectedMonthId(monthId))}
      />

      <Popover
        trigger="click"
        content={
          <Flex vertical align="flex-start" gap={10}>
            <Typography.Text strong>Добавить неделю</Typography.Text>
            <Flex justify="space-between" style={{ width: "100%" }} gap={10}>
              <DatePicker
                style={{ flex: 1 }}
                format="D"
                size="small"
                placeholder="+ день"
                value={selectedDate}
                allowClear={false}
                onChange={handleDateChange}
              />

              <Button
                onClick={() => addRow()}
                disabled={newRow.date.length === 0}
                size="small"
              >
                Сохранить
              </Button>
            </Flex>
            <Space>
              {newRow.date.map((day) => (
                <Tag key={day} closable onClose={() => removeDate(day)}>
                  {day}
                </Tag>
              ))}
            </Space>

            <Typography.Text strong>Управление неделями</Typography.Text>
            {getWeeksForDelete?.data.map((week) => (
              <Flex
                key={week._id}
                align="center"
                justify="space-between"
                style={{ width: "100%" }}
              >
                <Typography.Text>
                  📅 Неделя: {week.date.join(", ")}
                </Typography.Text>

                <Popconfirm
                  title="Удалить неделю?"
                  okText="Удалить"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => deleteRow(week._id)}
                >
                  <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
              </Flex>
            ))}
          </Flex>
        }
      >
        <Button size="small">Недели</Button>
      </Popover>

      <Popover
        trigger="click"
        content={
          <Flex vertical gap={10}>
            <Typography.Text strong>Добавить месяц</Typography.Text>

            <Flex justify="space-between" style={{ width: "100%" }} gap={10}>
              <Input
                size="small"
                placeholder="Имя месяца:"
                value={monthName}
                onChange={(e) => setMonthName(e.target.value)}
              />

              <Button
                onClick={async () => {
                  await createMonth(monthName);
                  setMonthName("");
                  setNewRow((prev) => ({ ...prev, date: [] }));
                }}
                disabled={!monthName.trim()}
                size="small"
                type="primary"
              >
                Сохранить
              </Button>
            </Flex>

            <Typography.Text strong>Управление месяцами</Typography.Text>
          </Flex>
        }
      >
        <Button size="small">месяца</Button>
      </Popover>
    </>
  );
};

export default CoffeeControls;

import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Input,
  Popconfirm,
  Popover,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import styles from "./coffeeControls.module.css";
import { useCoffeeMonth } from "../../hooks/useCoffeeMonths";
import { useCoffeeRows } from "../../hooks/useCoffeeRows";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMonthId } from "../../../../app/store/slices/coffeeSlice";
import {
  DeleteOutlined,
  CalendarOutlined,
  CalendarFilled,
  BarChartOutlined,
} from "@ant-design/icons";

const CoffeeControls = () => {
  const {
    createMonth,
    monthOptions,
    selectedMonthId,
    setMonthSearch,
    monthSearch,
    filteredMonths,
    deleteMonth,
  } = useCoffeeMonth();

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

  const dispatch = useDispatch();

  const [monthName, setMonthName] = useState("");

  return (
    <Flex align="center" gap={8} wrap className={styles.coffee__controls}>
      <Typography.Text strong className={styles.coffee__name}>
        Месяц:
      </Typography.Text>

      <Select
        className={styles.coffee__select}
        size="small"
        value={selectedMonthId}
        options={monthOptions}
        onChange={(monthId) => dispatch(setSelectedMonthId(monthId))}
        showSearch={{
          filterOption: (input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase()),
        }}
      />

      <Flex gap={8} className={styles.coffee__actions}>
        {/* недели */}
        <Popover
          trigger="click"
          styles={{ root: { position: "fixed" } }}
          content={
            <Flex vertical align="flex-start" gap={5}>
              <Typography.Text strong>Добавить неделю</Typography.Text>

              <Flex justify="space-between" style={{ width: "100%" }} gap={10}>
                <DatePicker
                  style={{ flex: 1 }}
                  format="D"
                  size="small"
                  placeholder="+ день"
                  placement="bottomLeft"
                  value={selectedDate}
                  allowClear={false}
                  onChange={handleDateChange}
                  disabled={newRow?.date.length >= 7}
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

              <Typography.Text strong>Удалить неделю</Typography.Text>

              <Flex
                vertical
                style={{
                  // maxHeight: 175,
                  // overflowY: "auto",
                  width: "100%",
                }}
                gap={5}
              >
                {getWeeksForDelete?.data.map((week, index) => (
                  <Flex key={week._id} vertical>
                    {index > 0 && <Divider style={{ margin: "5px 0" }} />}

                    <Flex align="center" justify="space-between">
                      <Typography.Text>
                        <CalendarOutlined /> Неделя: {week.date.join(", ")}
                      </Typography.Text>

                      <Popconfirm
                        title={`Удалить неделю ${week.date.join(", ")}?`}
                        okText="Удалить"
                        description="Неделя будет удалена безвозвратно!"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => deleteRow(week._id)}
                      >
                        <Button danger size="small" icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          }
        >
          <Button icon={<CalendarOutlined />} size="small" />
        </Popover>

        {/* месяцы */}
        <Popover
          trigger="click"
          styles={{ root: { position: "fixed" } }}
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

              <Typography.Text strong>Удалить месяц</Typography.Text>

              <Input
                size="small"
                placeholder="Поиск месяца:"
                allowClear
                value={monthSearch}
                onChange={(e) => setMonthSearch(e.target.value)}
              />

              <Flex
                vertical
                style={{
                  maxHeight: 175,
                  overflowY: "auto",
                }}
                gap={5}
              >
                {filteredMonths?.map((month, index) => (
                  <Flex key={month._id} vertical>
                    {index > 0 && <Divider style={{ margin: "5px 0" }} />}

                    <Flex
                      align="center"
                      justify="space-between"
                      style={{ width: "100%" }}
                    >
                      <Typography.Text>
                        <CalendarOutlined /> месяц: {month.month}
                      </Typography.Text>

                      <Popconfirm
                        getPopupContainer={(trigger) => trigger.parentElement!}
                        title={`Удалить месяц «${month.month}»?`}
                        description="Mесяц будет удален безвозвратно!"
                        okText="Удалить"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => deleteMonth(month._id)}
                      >
                        <Button danger size="small" icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          }
        >
          <Button icon={<CalendarFilled />} size="small" />
        </Popover>

        {/* итоги */}
        <Popover
          trigger="click"
          styles={{ root: { position: "fixed" } }}
          content={"zz"}
        >
          <Button icon={<BarChartOutlined />} size="small" />
        </Popover>
      </Flex>
    </Flex>
  );
};

export default CoffeeControls;

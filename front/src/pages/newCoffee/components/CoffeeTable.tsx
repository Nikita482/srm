import { useState } from "react";
import { columns } from "../constants/coffeeColumns";
import { useCoffeeMonth } from "../hooks/useCoffeeMonths";
import {
  Button,
  Card,
  DatePicker,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { useCoffeeRows } from "../hooks/useCoffeeRows";
import { operationOptions } from "../constants/operationOptions";

const CoffeeTable = () => {
  const { months, currentMonth } = useCoffeeMonth();
  const {
    editingRow,
    setEditingRow,
    removeEditDate,
    saveEditingRow,
    addEditDate,
    setOperationDraft,
    operationDraft,
  } = useCoffeeRows();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  if (!months) return <Spin />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={[...(currentMonth?.data ?? [])]}
        rowKey="_id"
        expandable={{
          expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys([record._id]);
              setEditingRow(record);
              setOperationDraft({
                type: "",
                amount: "",
                text: "",
                date: null,
              });
            } else {
              setExpandedRowKeys([]);
            }
          },
          expandedRowRender: (record) => {
            return (
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
                    onChange={(day) => addEditDate(day.date())}
                  />
                  <p>Операция:</p>
                  {/* добавить вариант "ничего ни редактировать" и вариант "коменты" */}
                  <Select
                    style={{ width: "150px" }}
                    value={operationDraft.type}
                    options={operationOptions}
                    onChange={(operation) =>
                      setOperationDraft((prev) => ({
                        ...prev,
                        type: operation,
                      }))
                    }
                  />
                  <input
                    type="number"
                    placeholder="Сумма:"
                    disabled={!operationDraft.type}
                    value={operationDraft.amount}
                    onChange={(e) =>
                      setOperationDraft((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />

                  <input
                    type="string"
                    placeholder="Комент:"
                    disabled={!operationDraft.type}
                    value={operationDraft.text}
                    onChange={(e) =>
                      setOperationDraft((prev) => ({
                        ...prev,
                        text: e.target.value,
                      }))
                    }
                  />

                  <DatePicker
                    placeholder="Дата операции:"
                    format="D MMMM"
                    disabled={!operationDraft.type}
                    allowClear={false}
                    value={operationDraft.date}
                    onChange={(day) =>
                      setOperationDraft((prev) => ({
                        ...prev,
                        date: day,
                      }))
                    }
                  />
                  <Button
                    onClick={() => saveEditingRow(record._id)}
                    disabled={
                      operationDraft.type !== "comment" &&
                      operationDraft.type &&
                      (!operationDraft.amount || !operationDraft.date)
                    }
                  >
                    Сохранить
                  </Button>
                </Space>
              </Card>
            );
          },
        }}
      />
    </>
  );
};

export default CoffeeTable;

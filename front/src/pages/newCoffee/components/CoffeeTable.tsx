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
        dataSource={[...(currentMonth?.data ?? [])].reverse()}
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
                    value={operationDraft.amount}
                    onChange={(e) =>
                      setOperationDraft((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />

                  <Button
                    onClick={() => saveEditingRow(record._id)}
                    disabled={!!operationDraft.type && !operationDraft.amount}
                  >
                    Сохранить
                  </Button>
                  {/* 
                  тип: инкас, траты, зп и коменты и колонку "коменты" переделать в колонку "опперации" 
                  и на против каждой поставить кнопу для удаления операции 
                  или
                  сделать коменты автоматичекими и добавить возможность оставить свой комент
                  */}
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

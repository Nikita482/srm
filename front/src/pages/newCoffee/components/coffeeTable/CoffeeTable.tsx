import { useState } from "react";
import { columns } from "../../constants/coffeeColumns";
import { useCoffeeMonth } from "../../hooks/useCoffeeMonths";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Flex,
  Popover,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { useCoffeeRows } from "../../hooks/useCoffeeRows";
import { operationOptions } from "../../constants/operationOptions";
import OperationFields from "./OperationFields";

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
    commentOptions,
    resetOperationDraft,
    setSelectedCommentId,
    selectedCommentId,
  } = useCoffeeRows();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  console.log(commentOptions);

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
              resetOperationDraft();
            } else {
              setExpandedRowKeys([]);
            }
          },
          expandedRowRender: (record) => {
            return (
              <Flex align="center" justify="space-between">
                <Card>
                  <Space>
                    <Typography.Text strong>Дни работы:</Typography.Text>
                    {editingRow?.date.map((day) => (
                      <Tag
                        key={day}
                        closable
                        onClose={() => removeEditDate(day)}
                      >
                        {day}
                      </Tag>
                    ))}

                    <DatePicker
                      size="small"
                      placeholder="+ день"
                      format="D"
                      allowClear={false}
                      onChange={(day) => addEditDate(day.date())}
                    />
                  </Space>
                </Card>

                <Divider
                  vertical
                  style={{
                    height: "auto",
                  }}
                />

                <Card style={{ flex: 1 }}>
                  <Space>
                    <Typography.Text strong>Операция:</Typography.Text>

                    <Select
                      style={{ width: "150px" }}
                      size="small"
                      value={operationDraft.type}
                      options={operationOptions}
                      onChange={(operation) =>
                        setOperationDraft((prev) => ({
                          ...prev,
                          type: operation,
                        }))
                      }
                    />

                    <OperationFields
                      operationDraft={operationDraft}
                      setOperationDraft={setOperationDraft}
                    />

                    <Select
                      size="small"
                      placeholder="Выбрать комент:"
                      style={{ width: 300 }}
                      value={selectedCommentId}
                      options={commentOptions}
                      onChange={(comId) => {
                        setSelectedCommentId(comId);
                      }}
                    />
                  </Space>
                </Card>

                <Divider
                  vertical
                  style={{
                    height: "auto",
                  }}
                />

                <Card>
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
                </Card>
              </Flex>
            );
          },
        }}
      />

      <Popover trigger="click" content={<DatePicker format="D" />}>
        <Button size="small">+</Button>
      </Popover>
    </>
  );
};

export default CoffeeTable;

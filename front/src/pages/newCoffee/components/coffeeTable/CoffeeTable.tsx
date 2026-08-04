import { useCoffeeMonth } from "../../hooks/useCoffeeMonths";
import {
  Button,
  Card,
  DatePicker,
  Flex,
  Input,
  InputNumber,
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
import { formatComment } from "../../utils/formatComment";
import EditableNumber from "./EditableNumber";
import EditableDates from "./EditableDates";
import { useState } from "react";

const CoffeeTable = () => {
  const { months, currentMonth } = useCoffeeMonth();
  const {
    editingRow,
    setEditingRow,
    removeEditDate,
    saveEditingRow,
    addEditDate,
    commentOptions,
    setSelectedCommentId,
    selectedCommentId,
    operationDraft,
    setOperationDraft,
  } = useCoffeeRows();

  // поработать над визуалом ибо колонки сейчас плавуют и не одинаковые (уменьшить размер полей)
  // добавботать коменты
  // доработать итоги (Начислено и Осталось)
  // убрать из ui лишний визуал и логику
  // убрать из кастомных хуков все лишнюю логику

  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const columns = [
    {
      title: "Число",
      dataIndex: "date",
      render: (dates, record) => (
        <EditableDates
          dates={dates}
          record={record}
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          addEditDate={addEditDate}
          removeEditDate={removeEditDate}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Зп",
      dataIndex: "salary",
      render: (_, record) => (
        <Typography.Text>{record.date.length * 3000} ₽</Typography.Text>
      ),
    },
    {
      title: "Траты",
      dataIndex: "expenses",
      render: (_, record) => (
        <EditableNumber
          record={record}
          field="expenses"
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Инкас",
      dataIndex: "cashCollection",
      render: (_, record) => (
        <EditableNumber
          record={record}
          field="cashCollection"
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Заплатили",
      dataIndex: "paid",
      render: (_, record) => (
        <EditableNumber
          record={record}
          field="paid"
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Комент",
      dataIndex: "comment",
      render: (comments, record) => {
        return (
          <Flex vertical gap={4} align="flex-start">
            {comments.map((comment) => (
              <Tag key={comment._id}>{formatComment(comment)}</Tag>
            ))}

            <Popover
              trigger="click"
              open={openRowId === record._id}
              onOpenChange={(open) => {
                if (open) {
                  setOpenRowId(record._id);
                  setEditingRow(record);
                } else {
                  setEditingRow(null);
                  setOpenRowId(null);
                }
              }}
              content={
                <Flex vertical gap={4}>
                  <Flex gap={4}>
                    <Select
                      style={{ width: "130px" }}
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

                    <DatePicker
                      size="small"
                      placeholder="День:"
                      format="D MMMM"
                      onChange={(day) =>
                        setOperationDraft((prev) => ({
                          ...prev,
                          date: day ? day.format("D MMMM") : null,
                        }))
                      }
                    />
                  </Flex>

                  <Flex gap={4}>
                    <Input
                      placeholder="Комент:"
                      size="small"
                      value={operationDraft.text}
                      onChange={(e) =>
                        setOperationDraft((prev) => ({
                          ...prev,
                          text: e.target.value,
                        }))
                      }
                    />

                    <InputNumber
                      placeholder="Сумма:"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
                      }
                      value={operationDraft.amount}
                      onChange={(num) =>
                        setOperationDraft((prev) => ({
                          ...prev,
                          amount: num ?? 0,
                        }))
                      }
                      size="small"
                      style={{ width: "80px", flexShrink: 0 }}
                    />
                  </Flex>
                  <Button
                    disabled={
                      !operationDraft.type ||
                      !operationDraft.date ||
                      !operationDraft.text ||
                      !operationDraft.amount
                    }
                    onClick={() => {
                      saveEditingRow(record._id);
                    }}
                  >
                    Сохранить
                  </Button>
                </Flex>
              }
            >
              <Button size="small">✏️</Button>
            </Popover>
          </Flex>
        );
      },
    },
    {
      title: "Начислено",
      dataIndex: "accrued",
    },
    { title: "Осталось", dataIndex: "remaining" },
  ];

  if (!months) return <Spin />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={[...(currentMonth?.data ?? [])]}
        rowKey="_id"
        expandable={{
          onExpand: () => {},
          expandedRowRender: () => {
            return (
              <Flex align="center" justify="space-between">
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

                    {/* <OperationFields
                      operationDraft={operationDraft}
                      setOperationDraft={setOperationDraft}
                    /> */}

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
              </Flex>
            );
          },
        }}
      />

      <div style={{ height: "1000px" }}></div>
    </>
  );
};

export default CoffeeTable;

import { useCoffeeMonth } from "../../hooks/useCoffeeMonths";
import {
  Button,
  Card,
  DatePicker,
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
import { formatComment } from "../../utils/formatComment";
import { useState } from "react";

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

  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const columns = [
    {
      title: "Число",
      dataIndex: "date",
      render: (dates: string[], record) => {
        return (
          <Space>
            {dates.map((day) => (
              <Tag key={day}>{day}</Tag>
            ))}

            <Popover
              trigger="click"
              open={openRowId === record._id}
              onOpenChange={(open) => {
                if (open) {
                  setOpenRowId(record._id);
                  setEditingRow(record);
                } else {
                  setOpenRowId(null);
                  setEditingRow(null);
                }
              }}
              content={
                <Flex gap={10} vertical>
                  <Flex gap={10} justify="space-between">
                    <DatePicker
                      size="small"
                      placeholder="+ день"
                      format="D"
                      onChange={(day) => addEditDate(day.date())}
                    />

                    <Button
                      onClick={() => {
                        saveEditingRow(record._id);
                        setOpenRowId(null);
                      }}
                    >
                      Сохранить
                    </Button>
                  </Flex>

                  <Space>
                    {editingRow?.date.map((day) => (
                      <Tag
                        key={day}
                        closable
                        onClose={() => removeEditDate(day)}
                      >
                        {day}
                      </Tag>
                    ))}
                  </Space>
                </Flex>
              }
            >
              <Button size="small">✏️</Button>
            </Popover>
          </Space>
        );
      },
    },
    {
      title: "Зп",
      dataIndex: "salary",
      render: (_, record) => record.date.length * 3000,
    },
    {
      title: "Траты",
      dataIndex: "expenses",
    },

    { title: "Инкас", dataIndex: "cashCollection" },
    { title: "Заплатили", dataIndex: "paid" },
    {
      title: "Комент",
      dataIndex: "comment",
      render: (comments) =>
        comments.map((comment) => (
          <div key={comment._id} style={{ display: "flex" }}>
            <p>{formatComment(comment)}</p>
          </div>
        )),
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
          onExpand: (expanded) => {
            if (expanded) {
              resetOperationDraft();
            }
          },
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

import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Input,
  InputNumber,
  Popconfirm,
  Popover,
  Select,
  Space,
  Typography,
} from "antd";
import {
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { formatComment } from "../../utils/formatComment";
import { operationOptions } from "../../constants/operationOptions";
import dayjs from "dayjs";
import { useState } from "react";

const EditableComment = ({
  comments,
  record,
  setEditingRow,
  operationDraft,
  setOperationDraft,
  hasChanges,
  saveEditingRow,
  editingRow,
  removeComment,
}) => {
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  return (
    <Flex vertical gap={4} align="flex-start">
      <Flex gap={10}>
        <Typography.Text>
          <MessageOutlined /> {comments.length}
        </Typography.Text>

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
            <Flex vertical gap={5}>
              <Typography.Text strong>Добавить комент</Typography.Text>
              <Flex gap={5}>
                <Select
                  style={{ flex: 1 }}
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
                  style={{ flex: 1 }}
                  format="D MMMM"
                  value={
                    operationDraft.date
                      ? dayjs(operationDraft.date, "D MMMM")
                      : null
                  }
                  onChange={(day) =>
                    setOperationDraft((prev) => ({
                      ...prev,
                      date: day ? day.format("D MMMM") : null,
                    }))
                  }
                />
              </Flex>

              <Flex gap={5}>
                <Input
                  placeholder="Комент:"
                  size="small"
                  maxLength={80}
                  showCount
                  // style={{ minWidth: 0, flex: 1 }}
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
                  !hasChanges &&
                  (!operationDraft.type ||
                    !operationDraft.date ||
                    !operationDraft.text ||
                    !operationDraft.amount)
                }
                onClick={() => {
                  saveEditingRow(record._id);
                }}
              >
                Сохранить
              </Button>

              <Typography.Text strong>Удалить комент</Typography.Text>

              <Flex
                vertical
                gap={5}
                style={{
                  maxHeight: 175,
                  overflowY: "auto",
                }}
              >
                {editingRow?.comment.map((comment, index) => {
                  const formatted = formatComment(comment);

                  return (
                    <Flex key={comment?._id} vertical>
                      {index > 0 && <Divider style={{ margin: "5px 0" }} />}

                      <Flex align="center" justify="space-between">
                        <Typography.Text>
                          {formatted.amount} {formatted.operation}{" "}
                          {formatted.date}
                        </Typography.Text>

                        <Space>
                          <Popover content={formatted.text} trigger="click">
                            <Button
                              type="text"
                              size="small"
                              icon={<MessageOutlined />}
                            />
                          </Popover>

                          <Popconfirm
                            title="Удалить комент?"
                            okText="Удалить"
                            okButtonProps={{ danger: true }}
                            onConfirm={() => {
                              removeComment(comment._id);
                            }}
                          >
                            <Button
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              style={{ minWidth: 24 }}
                            />
                          </Popconfirm>
                        </Space>
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          }
        >
          <Button size="small">
            <EditOutlined />
          </Button>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default EditableComment;

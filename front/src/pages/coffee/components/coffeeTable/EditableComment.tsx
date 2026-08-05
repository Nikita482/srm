import {
  Button,
  DatePicker,
  Flex,
  Input,
  InputNumber,
  Popover,
  Select,
  Tag,
  Typography,
} from "antd";
import { MessageOutlined, EditOutlined } from "@ant-design/icons";
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

              <Flex gap={4}>
                <Input
                  placeholder="Комент:"
                  size="small"
                  maxLength={80}
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
                  style={{ width: "70px", flexShrink: 0 }}
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

              <Flex vertical gap={4} align="flex-start">
                {editingRow?.comment.map((comment) => (
                  <Tag
                    key={comment?._id}
                    style={{
                      maxWidth: "250px",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                    closable
                    onClose={(e) => {
                      e.preventDefault();
                      removeComment(comment._id);
                    }}
                  >
                    {formatComment(comment)}
                  </Tag>
                ))}
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

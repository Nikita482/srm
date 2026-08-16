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

const EditableComment = ({
  comments,
  record,
  setEditingRow,
  operationDraft,
  setOperationDraft,
  saveComment,
  editingRow,
  removeComment,
}) => {
  return (
    <Flex vertical gap={4} align="flex-start">
      <Flex gap={10}>
        <Typography.Text>
          <MessageOutlined /> {comments.length}
        </Typography.Text>

        <Popover
          trigger="click"
          styles={{ root: { position: "fixed" } }}
          onOpenChange={(open) => {
            if (open) {
              setEditingRow(record);
            } else {
              setEditingRow(null);
            }
          }}
          content={
            <Flex vertical gap={5} style={{ width: 280 }}>
              <Typography.Text strong>Добавить комент</Typography.Text>

              {/* Select + DatePicker */}
              <Flex gap={5}>
                <Select
                  getPopupContainer={(trigger) => trigger.parentElement!}
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
                  getPopupContainer={(trigger) => trigger.parentElement!}
                  size="small"
                  placeholder="День:"
                  style={{ flex: 1 }}
                  placement="bottomLeft"
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

              {/* Input + InputNumber */}
              <Flex gap={5}>
                <Input
                  placeholder="Комент:"
                  size="small"
                  maxLength={80}
                  showCount
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

              {/* Сохранить */}
              <Button
                disabled={
                  !operationDraft.type ||
                  !operationDraft.date ||
                  // !operationDraft.text ||
                  !operationDraft.amount
                }
                onClick={saveComment}
              >
                Сохранить
              </Button>

              <Typography.Text strong>Удалить комент</Typography.Text>

              {/* коменты для удаления */}
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
                  const info = `${formatted.amount} ${formatted.operation} ${formatted.date}`;

                  return (
                    <Flex key={comment?._id} vertical>
                      {index > 0 && <Divider style={{ margin: "5px 0" }} />}

                      <Flex align="center" justify="space-between">
                        <Typography.Text>{info}</Typography.Text>

                        <Space>
                          {!formatted.text ? null : (
                            <Popover
                              content={
                                <div style={{ maxWidth: 250 }}>
                                  {formatted.text}
                                </div>
                              }
                              trigger="click"
                              getPopupContainer={(trigger) =>
                                trigger.parentElement!
                              }
                            >
                              <Button
                                type="text"
                                size="small"
                                icon={<MessageOutlined />}
                              />
                            </Popover>
                          )}

                          <Popconfirm
                            getPopupContainer={(trigger) =>
                              trigger.parentElement!
                            }
                            title="Удалить комент?"
                            okText="Удалить"
                            description={
                              <div style={{ maxWidth: 250 }}>
                                <Divider style={{ margin: "5px 0" }} />
                                <p>{`Комент: ${info}`}</p>
                                <p>{`Текст: ${formatted.text}`}</p>
                                <Divider style={{ margin: "5px 0" }} />
                                <p>Комент будет удален безвозвратно!</p>
                              </div>
                            }
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

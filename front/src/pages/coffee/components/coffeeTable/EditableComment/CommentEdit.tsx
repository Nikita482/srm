import {
  Button,
  DatePicker,
  Flex,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { operationOptions } from "../../../constants/operationOptions";
import { useState } from "react";
import dayjs from "dayjs";

const EditComment = ({ onList, comment, onSave }) => {
  const [commentDraft, setCommentDraft] = useState({
    _id: comment._id,
    amount: comment.amount,
    date: comment.date,
    operation: comment.operation,
    text: comment.text,
  });

  const [pickerValue, setPickerValue] = useState(
    dayjs(comment.date, "D MMMM", "ru"),
  );

  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography.Text strong>Редактировать комментарий</Typography.Text>

        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={onList}
        />
      </Flex>

      {/* Select + DatePicker */}
      <Flex gap={5}>
        <Select
          getPopupContainer={(trigger) => trigger.parentElement!}
          style={{ flex: 1 }}
          size="small"
          value={commentDraft.operation}
          options={operationOptions}
          onChange={(operation) =>
            setCommentDraft((prev) => ({ ...prev, operation }))
          }
        />

        <DatePicker
          getPopupContainer={(trigger) => trigger.parentElement!}
          size="small"
          placeholder="День:"
          style={{ flex: 1 }}
          placement="bottomLeft"
          format="D MMMM"
          defaultPickerValue={pickerValue}
          onPanelChange={(value) => setPickerValue(value)}
          value={commentDraft.date ? dayjs(commentDraft.date, "D MMMM") : null}
          onChange={(day) =>
            setCommentDraft((prev) => ({
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
          value={commentDraft.text}
          onChange={(e) =>
            setCommentDraft((prev) => ({
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
          value={commentDraft.amount}
          onChange={(num) =>
            setCommentDraft((prev) => ({
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
        type="primary"
        block
        // disabled={
        //   !operationDraft.type || !operationDraft.date || !operationDraft.amount
        // }
        onClick={() => {
          onSave(commentDraft);
          onList();
        }}
      >
        Сохранить
      </Button>
    </>
  );
};

export default EditComment;

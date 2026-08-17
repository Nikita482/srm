import { Button, DatePicker, Flex, Input, InputNumber, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { operationOptions } from "../../../constants/operationOptions";
import dayjs from "dayjs";
import { useState } from "react";

const AddComment = ({
  onList,
  operationDraft,
  setOperationDraft,
  saveComment,
}) => {
  const [pickerValue, setPickerValue] = useState(dayjs());

  return (
    <>
      <h1>AddComment</h1>

      <Button
        type="text"
        size="small"
        icon={<ArrowLeftOutlined />}
        onClick={onList}
      />

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
          defaultPickerValue={pickerValue}
          onPanelChange={(value) => setPickerValue(value)}
          value={
            operationDraft.date ? dayjs(operationDraft.date, "D MMMM") : null
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
          !operationDraft.type || !operationDraft.date || !operationDraft.amount
        }
        onClick={() => {
          saveComment();
          onList();
        }}
      >
        Сохранить
      </Button>
    </>
  );
};

export default AddComment;

import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

type OperationDraft = {
  type: string;
  amount: string;
  text: string;
  date: Dayjs | null;
};

type Props = {
  operationDraft: OperationDraft;
  setOperationDraft: React.Dispatch<React.SetStateAction<OperationDraft>>;
};

const OperationFields = ({ operationDraft, setOperationDraft }: Props) => {
  // возвращает поле суммы
  const renderAmountInput = () => (
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
  );

  // возвращает поле коментов
  const renderCommentInput = () => (
    <input
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
  );

  // возвращает календарь для коментов
  const renderDatePicker = () => (
    <DatePicker
      placeholder="Дата операции:"
      size="small"
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
  );

  // отображает поля
  switch (operationDraft.type) {
    case "":
      return null;

    case "comment":
      return (
        <>
          {renderCommentInput()}
          {renderDatePicker()}
        </>
      );

    default:
      return (
        <>
          {renderAmountInput()}
          {renderCommentInput()}
          {renderDatePicker()}
        </>
      );
  }
};

export default OperationFields;

import { getOperationText } from "../utils/textComent";

export const columns = [
  {
    title: "Число",
    dataIndex: "date",
    render: (dates: string[]) => dates.join(", "),
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
      comments.map((comment) => {
        const amount = comment.amount.toLocaleString("ru-RU");
        const operation = getOperationText(comment.operation);
        const text = comment.text;
        const date = comment.date;

        return (
          <p key={comment._id}>
            {`${amount} ₽ - ${operation}${text ? ` ${text},` : ","} ${date}`}
          </p>
        );
      }),
  },

  {
    title: "Начислено",
    dataIndex: "accrued",
  },
  { title: "Осталось", dataIndex: "remaining" },
];

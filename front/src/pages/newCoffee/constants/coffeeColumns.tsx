import { getOperationText } from "../utils/textComent";

export const columns = ({ removeComment }) => [
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
        const amount = comment.amount;
        const operation = getOperationText(comment.operation);
        const text = comment.text;
        const date = comment.date || "";

        const operationText = operation === "comment" ? "комент -" : operation;
        const amountText =
          amount === 0 ? "" : `${amount.toLocaleString("ru-RU")} ₽ -`;
        return (
          <div key={comment._id}>
            <p>{`${amountText} ${operationText} ${text} ${date}`}</p>
            <button onClick={() => removeComment(comment._id)}>x</button>
          </div>
        );
      }),
  },
  {
    title: "Начислено",
    dataIndex: "accrued",
  },
  { title: "Осталось", dataIndex: "remaining" },
];

// export const columns = [
//   {
//     title: "Число",
//     dataIndex: "date",
//     render: (dates: string[]) => dates.join(", "),
//   },
//   {
//     title: "Зп",
//     dataIndex: "salary",
//     render: (_, record) => record.date.length * 3000,
//   },
//   {
//     title: "Траты",
//     dataIndex: "expenses",
//   },

//   { title: "Инкас", dataIndex: "cashCollection" },
//   { title: "Заплатили", dataIndex: "paid" },
//   {
//     title: "Комент",
//     dataIndex: "comment",
//     render: (comments) =>
//       comments.map((comment) => {
//         const amount = comment.amount;
//         const operation = getOperationText(comment.operation);
//         const text = comment.text;
//         const date = comment.date || "";

//         const operationText = operation === "comment" ? "комент -" : operation;
//         const amountText =
//           amount === 0 ? "" : `${amount.toLocaleString("ru-RU")} ₽ -`;
//         return (
//           // <p key={comment._id}>
//           //   {`${amountText} ${operationText} ${text} ${date}`}
//           // </p>
//           <div key={comment._id}>
//             <p>{`${amountText} ${operationText} ${text} ${date}`}</p>
//             <button onClick={() => console.log(comment._id)}>x</button>
//           </div>
//         );
//       }),
//   },
//   {
//     title: "Начислено",
//     dataIndex: "accrued",
//   },
//   { title: "Осталось", dataIndex: "remaining" },
// ];

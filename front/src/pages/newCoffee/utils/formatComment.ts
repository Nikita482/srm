export const formatComment = (comment) => {
  const amount = comment.amount;
  const operation = comment.operation;
  const text = comment.text;
  const date = comment.date || "";

  const amountText =
    amount === 0 ? "" : `${amount.toLocaleString("ru-RU")} ₽ -`;

  return `${amountText} ${operation} ${date} ${text}`;
};

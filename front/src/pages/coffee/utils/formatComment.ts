export const formatComment = (comment) => {
  const operationNames = {
    expenses: "Траты",
    paid: "Закинули",
    cashCollection: "Инкас",
  };

  return {
    amount:
      comment.amount === 0
        ? ""
        : `${comment.amount.toLocaleString("ru-RU")} ₽ -`,
    operation: operationNames[comment.operation] ?? comment.operation,
    date: comment.date ?? "",
    text: comment.text,
  };
};

export const getOperationText = (operation: string) => {
  switch (operation) {
    case "paid":
      return "Закинули";
    case "cashCollection":
      return "Инкас";
    case "expenses":
      return "Траты";
    case "removePaid":
      return "Отмена закинули";
    case "removeCashCollection":
      return "Отмена инкасса";
    case "removeExpenses":
      return "Отмена трат";
    default:
      return operation;
  }
};

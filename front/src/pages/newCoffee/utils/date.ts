// переводит выбранный тип операции из Select в реальные настройки для изменения строки
export const getOperationConfig = (type: string) => {
  switch (type) {
    case "paid":
      return { field: "paid", multiplier: 1 };

    case "cashCollection":
      return { field: "cashCollection", multiplier: 1 };

    case "expenses":
      return { field: "expenses", multiplier: 1 };

    case "removePaid":
      return { field: "paid", multiplier: -1 };

    case "removeCashCollection":
      return { field: "cashCollection", multiplier: -1 };

    case "removeExpenses":
      return { field: "expenses", multiplier: -1 };

    default:
      return { field: "", multiplier: 1 };
  }
};

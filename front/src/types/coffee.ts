export type CoffeeRow = {
  date: string[];
  salary: number;
  expenses: number;
  cashCollection: number;
  paid: number;
  comment: string;
  accrued: number;
  remaining: number;
};

export type Month = {
  _id?: string;
  month: string;
  data: CoffeeRow[];
};

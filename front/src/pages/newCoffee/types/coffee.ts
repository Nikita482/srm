export type Comment = {
  type: string;
  amount: number;
  text: string;
};

export type CoffeeRow = {
  _id?: string;
  date: string[];
  salary: number;
  expenses: number;
  cashCollection: number;
  paid: number;
  comment: Comment[];
  accrued: number;
  remaining: number;
};

export type Month = {
  _id?: string;
  month: string;
  data: CoffeeRow[];
};

export type EditingRow = {
  date: string[];
  salary: number;
  expenses: number;
  cashCollection: number;
  paid: number;
  comment: Comment[];
};

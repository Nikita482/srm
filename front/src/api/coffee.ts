import axios from "axios";

const API_URL = "http://localhost:3000/coffee";

type CoffeeRow = {
  date: string[];
  salary: number;
  expenses: number;
  cashCollection: number;
  paid: number;
  comment: string;
  accrued: number;
  remaining: number;
};

type Month = {
  month: string;
  data: CoffeeRow[];
};

export const apiGetMonths = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const apiCreateMonth = async (month: Month) => {
  // {month: '5', data: Array(0)}
  const { data } = await axios.post(API_URL, month);
  return data;
};

export const apiAddRow = async (monthId: string, row: CoffeeRow) => {
  const { data } = await axios.post(`${API_URL}/${monthId}/row`, row);
  return data;
};

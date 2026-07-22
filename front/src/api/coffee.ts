import axios from "axios";
import type { CoffeeRow, Month } from "../types/coffee";

const API_URL = "http://localhost:3000/coffee";

export const apiGetMonths = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const apiCreateMonth = async (month: Month) => {
  const { data } = await axios.post(API_URL, month);
  return data;
};

export const apiAddRow = async (monthId: string, row: CoffeeRow) => {
  const { data } = await axios.post(`${API_URL}/${monthId}/row`, row);
  return data;
};

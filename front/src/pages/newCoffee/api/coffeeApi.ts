import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Month } from "../types/coffee";

export const coffeeApi = createApi({
  reducerPath: "coffeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Months"],
  endpoints: (builder) => ({
    createMonth: builder.mutation({
      query: (month) => ({
        url: "/coffee",
        method: "POST",
        body: month,
      }),
      invalidatesTags: ["Months"],
    }),
    getMonths: builder.query<Month[], void>({
      query: () => ({
        url: "/coffee",
        method: "GET",
      }),
      providesTags: ["Months"],
    }),
  }),
});

export const { useCreateMonthMutation, useGetMonthsQuery } = coffeeApi;

// import axios from "axios";
// import type { CoffeeRow, Month, EditingRow } from "../types/coffee";

// const API_URL = "http://localhost:3000/coffee";

// export const apiGetMonths = async () => {
//   const { data } = await axios.get(API_URL);
//   return data;
// };

// export const apiCreateMonth = async (month: Month) => {
//   const { data } = await axios.post(API_URL, month);
//   return data;
// };

// export const apiAddRow = async (monthId: string, row: CoffeeRow) => {
//   const { data } = await axios.post(`${API_URL}/${monthId}/row`, row);
//   return data;
// };

// export const apiSaveEditingRow = async (
//   monthId: string,
//   rowId: string,
//   editingRow: EditingRow,
// ) => {
//   const { data } = await axios.patch(
//     `${API_URL}/${monthId}/row/${rowId}`,
//     editingRow,
//   );
//   return data;
// };

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
    addRow: builder.mutation({
      query: ({ selectedMonthId, newRow }) => ({
        url: `/coffee/${selectedMonthId}/row`,
        method: "POST",
        body: newRow,
      }),
      invalidatesTags: ["Months"],
    }),
    updateRow: builder.mutation({
      query: ({ selectedMonthId, rowId, editingRow }) => ({
        url: `/coffee/${selectedMonthId}/row/${rowId}`,
        method: "PATCH",
        body: editingRow,
      }),
      invalidatesTags: ["Months"],
    }),
  }),
});

export const {
  useCreateMonthMutation,
  useGetMonthsQuery,
  useAddRowMutation,
  useUpdateRowMutation,
} = coffeeApi;

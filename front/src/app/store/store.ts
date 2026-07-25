import { configureStore } from "@reduxjs/toolkit";
import coffeeReducer from "./slices/coffeeSlice";
import { coffeeApi } from "../../pages/newCoffee/api/coffeeApi";

export const store = configureStore({
  reducer: {
    coffee: coffeeReducer,

    [coffeeApi.reducerPath]: coffeeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coffeeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; // тип всего state
export type AppDispatch = typeof store.dispatch; // тип dispatch

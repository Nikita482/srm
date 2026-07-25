import { createSlice } from "@reduxjs/toolkit";

type CoffeeState = {
  selectedMonthId: string | null;
};

const initialState: CoffeeState = {
  selectedMonthId: null,
};

const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    setSelectedMonthId(state, actions) {
      state.selectedMonthId = actions.payload;
    },
  },
});

export const { setSelectedMonthId } = coffeeSlice.actions;
export default coffeeSlice.reducer;

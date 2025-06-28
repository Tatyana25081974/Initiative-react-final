import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    category: "",
    ingredient: "",
  },
  reducers: {
    changeCategoryFilter: (state, action) => {
      state.category = action.payload;

      // return { ...state, name: action.payload };
    },
    changeIngredientFilter: (state, action) => {
      state.ingredient = action.payload;

      // return { ...state, name: action.payload };
    },
  },
});

export default slice.reducer;

export const { changeCategoryFilter, changeIngredientFilter } = slice.actions;

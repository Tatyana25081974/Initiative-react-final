import { createSlice } from "@reduxjs/toolkit";
import { getIngredients, getCategory } from "./operation";

const handlePending = (state) => {
  state.loading = true;
  state.error = false;
};
const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    // searchQuery: "", // пошуковий запит
    // searchedCategory: "", // обрана категорія
    // searchedIngredient: "", // обраний інгредієнт
    ingredients: [],
    category: [],

    loading: false,
    error: false,
  },
  // reducers: {
  //   // changeCategoryFilter(state, action) {
  //   //   state.searchedCategory = action.payload;
  //   // },
  //   // changeIngredientFilter(state, action) {
  //   //   state.searchedIngredient = action.payload;
  //   // },
  //   // changeSearchQuery(state, action) {
  //   //   state.searchQuery = action.payload;
  //   // },
  //   // resetFilters(state) {
  //   //   state.searchedCategory = "";
  //   //   state.searchedIngredient = "";
  //   //   state.searchQuery = "";
  //   //   // type не скидаємо — він залежить від сторінки (own, favorite, all)
  //   // },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, handlePending)
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loadingIngredientsAndCategories = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, handleRejected)

      .addCase(getCategory.pending, handlePending)
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loadingIngredientsAndCategories = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, handleRejected);
  },
});
export const {
  changeCategoryFilter,
  changeIngredientFilter,
  changeSearchQuery,
  changeType,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;

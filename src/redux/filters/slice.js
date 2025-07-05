import { createSlice } from "@reduxjs/toolkit";
import { getIngredients, getCategory } from "./operation";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    // searchQuery: "", // пошуковий запит
    // searchedCategory: "", // обрана категорія
    // searchedIngredient: "", // обраний інгредієнт
    ingredients: [], // всі інгредієнти з бекенду
    category: [], // всі категорії з бекенду
    loading: false, // статус завантаження
    error: null, // помилка
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
      //  Отримання інгредієнтів
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //  Отримання категорій
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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

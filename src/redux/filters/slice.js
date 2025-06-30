import { createSlice } from "@reduxjs/toolkit";

import { getCategory, getIngredients } from "./operation";

const filtersSlice = createSlice({
  name: "filters",

  initialState: {
    searchedCategory: "", // обрана категорія
    searchedIngredient: "", // обраний інгредієнт
    ingredients: [], // всі інгредієнти з бекенду
    category: [], // всі категорії з бекенду
    searchQuery: "", // пошуковий запит
    type: "all", // тип рецептів: all | own | favorite
    loading: false, // статус завантаження
    error: null, // помилка
  },

  reducers: {
    changeCategoryFilter(state, action) {
      state.searchedCategory = action.payload;
    },

    changeIngredientFilter(state, action) {
      state.searchedIngredient = action.payload;
    },

    changeSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    changeType(state, action) {
      state.type = action.payload;
    },

    resetFilters(state) {
      state.searchedCategory = "";
      state.searchedIngredient = "";
      state.searchQuery = "";
      state.sortBy = "popular";
    },

    extraReducers: (builder) => {
      builder
        .addCase(getCategory.fulfilled, (state, action) => {
          state.category.push(action.payload);
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
          state.ingredients.push(action.payload);
        });
    },
  },

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

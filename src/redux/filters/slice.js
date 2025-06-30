import { createSlice } from "@reduxjs/toolkit";
import { getCategory, getIngredients } from "./operation";

const filtersSlice = createSlice({
  name: "filters",

  initialState: {
    searchedCategory: "", // Категорія
    searchedIngredient: "",
    ingredients: [], // Інгредієнт
    category: [],
    searchQuery: "", // Пошук
    // type: "all", // Тип рецептів: all | own | favorite
  },

  //  Редьюсери — функції для зміни стану
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

    // changeType: (state, action) => {
    //  Зміна типу рецептів
    //   state.type = action.payload;
    // },

    //  Скидання всіх фільтрів до початкового стану
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
});

export const {
  changeCategoryFilter,
  changeIngredientFilter,
  changeSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

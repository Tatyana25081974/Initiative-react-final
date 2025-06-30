import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",

  initialState: {
    searchedCategory: "", // Категорія
    searchedIngredient: "",
    ingredients: [], // Інгредієнт
    category: [],
    searchQuery: "", // Пошук
    type: "all", // Тип рецептів: all | own | favorite
  },

  //  Редьюсери — функції для зміни стану
  reducers: {
    changeCategoryFilter(state, action) {
      state.searchedCategory = action.payload;
    },

    changeIngredientFilter(state, action) {
      state.searchedIngredient = action.payload;
    },
    changeIngredients(state, action) {
      state.searchedIngredient.push(action.payload);
    },

    changeCategory(state, action) {
      state.searchedCategory.push(action.payload);
    },

    changeSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    changeType: (state, action) => {
      //  Зміна типу рецептів
      state.type = action.payload;
    },

    //  Скидання всіх фільтрів до початкового стану
    resetFilters(state) {
      state.category = "";
      state.ingredient = "";
      state.searchQuery = "";
      state.sortBy = "popular";
      state.page = 1;
      state.limit = 12;
    },
  },
});

export const {
  changeCategoryFilter,
  changeIngredientFilter,
  changeSearchQuery,
  changeSortBy,
  changePage,
  changeLimit,
  changeType,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

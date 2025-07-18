// export const selectSearchedCategory = (state) => state.filters.searchedCategory;

// export const selectSearchedIngredient = (state) =>
//   state.filters.searchedIngredient;

export const selectFilters = (state) => state.filters;

export const selectCategory = (state) => state.filters.category;

export const selectIngredients = (state) => state.filters.ingredients;

export const selectLoadingIngredientsAndCategories = (state) =>
  state.filters.loading;
export const selectErrorIngredientsAndCategories = (state) =>
  state.filters.error;

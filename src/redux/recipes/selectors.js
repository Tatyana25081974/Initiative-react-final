import { createSelector } from "@reduxjs/toolkit";

import {
  selectFilters,
  // selectSearchedCategory,
  // selectSearchedIngredient,
} from "../filters/selectors";

// export const selectRawRecipes = (state) => state.recipes.items;

// export const selectRecipes = createSelector([selectRawRecipes], (items) => {
//   if (!items || !items.data || !Array.isArray(items.data.data)) return [];
//   return items.data.data;
// });
export const selectRecipes = (state) => state.recipes.items;

export const selectOwnRecipes = (state) => state.recipes.ownItems;

export const selectRecipesLoading = (state) => state.recipes.loading;

export const selectRecipesError = (state) => state.recipes.error;

// export const selectFiltredRecipes = createSelector(
//   [selectRecipes, selectFilters],
//   (recipes, filters) => {
//     console.log(recipes);
//     console.log(filters);
//     const { searchQuery, searchedCategory, searchedIngredient } = filters;

//     return recipes.filter((recipe) => {
//       const matchesSearch = recipe.title
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       const matchesCategory = searchedCategory
//         ? recipe.category === searchedCategory
//         : true;
//       const matchesIngredient = searchedIngredient
//         ? recipe.ingredients.includes(searchedIngredient)
//         : true;

//       return matchesSearch && matchesCategory && matchesIngredient;
//     });
//   }
// );

export const selectFiltredOwnRecipes = createSelector(
  [selectOwnRecipes, selectFilters],
  (recipes, filters) => {
    console.log(recipes);
    console.log(filters);
    const { searchQuery, searchedCategory, searchedIngredient } = filters;

    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = searchedCategory
        ? recipe.category === searchedCategory
        : true;
      const matchesIngredient = searchedIngredient
        ? recipe.ingredients.includes(searchedIngredient)
        : true;

      return matchesSearch && matchesCategory && matchesIngredient;
    });
  }
);

// export const selectDeletingContactId = (state) =>
//   state.contacts.deletingContactId;

export const selectTotalRecipes = (state) => {
  return state.recipes.totalItems;
};

export const selectTotalPages = (state) => {
  return state.recipes.totalPages;
};

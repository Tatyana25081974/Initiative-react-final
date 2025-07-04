import { createSelector } from "@reduxjs/toolkit";

import {
  // selectCategoryFilter,
  // selectIngredientFilter,
  selectCategory,
  selectIngredients,
} from "../filters/selectors";

// export const selectRawRecipes = (state) => state.recipes.items;

// export const selectRecipes = createSelector([selectRawRecipes], (items) => {
//   if (!items || !items.data || !Array.isArray(items.data.data)) return [];
//   return items.data.data;
// });
export const selectRecipes = (state) => state.recipes.items;

export const selectRecipesLoading = (state) => state.recipes.loading;

export const selectRecipesError = (state) => state.recipes.error;

export const selectFilteredContacts = createSelector(
  [selectRecipes, selectCategory, selectIngredients],
  (recipes, categoryFilter, ingredientFilter) => {
    const filteredRecipesByCategory = recipes.filter((recipe) =>
      recipe.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );

    const filteredRecipesByCategoryAndIngredient =
      filteredRecipesByCategory.filter((recipe) =>
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(ingredientFilter.toLowerCase())
        )
      );
    return filteredRecipesByCategoryAndIngredient;
  }
);

// export const selectDeletingContactId = (state) =>
//   state.contacts.deletingContactId;

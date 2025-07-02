import { createSelector } from "@reduxjs/toolkit";

import {
  selectCategoryFilter,
  selectIngredientFilter,
} from "../filters/selectors";

export const selectRecipes = (state) => state.recipes.items;

export const selectRecipesLoading = (state) => state.recipes.loading;

export const selectRecipesError = (state) => state.recipes.error;

export const selectFilteredContacts = createSelector(
  [selectRecipes, selectCategoryFilter, selectIngredientFilter],
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

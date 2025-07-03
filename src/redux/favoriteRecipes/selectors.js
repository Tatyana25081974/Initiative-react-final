// selectors.js

// 1 Селектор: Отримати список улюблених рецептів
export const selectFavoriteRecipes = (state) => state.favoriteRecipes.items;
// Повертає масив усіх рецептів, які юзер додав у favorites

// 2 Селектор: Перевірити, чи рецепт є в улюблених (за _id)
export const isRecipeFavorite = (recipeId) => (state) =>
  state.favoriteRecipes.items.some((recipe) => recipe._id === recipeId);
// Повертає true/false: є такий рецепт у state чи ні

// 3 Селектор: Чи триває завантаження улюблених
export const selectFavoritesLoading = (state) => state.favoriteRecipes.loading;
// Повертає true/false: треба показувати <Loader /> при запиті

// 4 Селектор: Чи була помилка під час запиту
export const selectFavoritesError = (state) => state.favoriteRecipes.error;
//  Повертає повідомлення про помилку, якщо є

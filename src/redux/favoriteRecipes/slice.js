// Імпортуємо функцію для створення slice
import { createSlice } from "@reduxjs/toolkit";

// Імпортуємо асинхронні операції
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from "./operations";

// 1️ Початковий стан
const initialState = {
  items: [], // масив улюблених рецептів
  loading: false, // статус завантаження
  error: null, // повідомлення про помилку
};

// 2️ Створюємо slice
const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes", // ім’я slice
  initialState, // початковий стан
  reducers: {}, // поки не використовуємо звичайні редюсери

  // 3️ Обробка асинхронних операцій
  extraReducers: (builder) => {
    builder
      // --- fetchFavorites ---
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- addToFavorites ---
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // --- removeFromFavorites ---
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (recipe) => recipe._id !== action.payload
        );
      });
  },
});

// 4️ Експортуємо reducer для підключення в store
export default favoriteRecipesSlice.reducer;

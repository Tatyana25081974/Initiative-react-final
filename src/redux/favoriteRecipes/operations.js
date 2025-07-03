// operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1️ Отримати список улюблених рецептів користувача
export const fetchFavorites = createAsyncThunk(
  "favoriteRecipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/recipes/favorites");
      return res.data; //  повертає масив рецептів
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// 2️ Додати рецепт до улюблених
export const addToFavorites = createAsyncThunk(
  "favoriteRecipes/add",
  async (recipeId, thunkAPI) => {
    try {
      const res = await axios.post(`/api/recipes/favorite/${recipeId}`);
      return res.data; //  додається 1 об'єкт рецепта
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// 3️ Видалити рецепт з улюблених
export const removeFromFavorites = createAsyncThunk(
  "favoriteRecipes/remove",
  async (recipeId, thunkAPI) => {
    try {
      await axios.delete(`/api/recipes/favorite/${recipeId}`);
      return recipeId; // повертаємо _id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

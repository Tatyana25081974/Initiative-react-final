import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET @ /recipes
export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (params, thunkAPI) => {
    try {
      const { page, searchQuery, searchedIngredient, searchedCategory } =
        params;

      const queryParams = new URLSearchParams();
      queryParams.append("page", page);

      if (searchQuery) queryParams.append("search", searchQuery);
      if (searchedIngredient)
        queryParams.append("ingredient", searchedIngredient);
      if (searchedCategory) queryParams.append("category", searchedCategory);

      const urlForRecipes = `/api/recipes?${queryParams.toString()}`;

      const { data } = await axios.get(urlForRecipes);

      return {
        ...data.data, // data, totalItems, page, etc.
        append: page > 1, // додаємо флаг для редюсера
      };
    } catch {
      return thunkAPI.rejectWithValue("Pls try reloading the page.");
    }
  }
);

export const getOwnRecipes = createAsyncThunk(
  "recipes/getOwnRecipes",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/recipes/ownRecipes");
      return data.data;
    } catch {
      return thunkAPI.rejectWithValue("Pls try reloading the page.");
    }
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (newRecipe, thunkAPI) => {
    try {
      await axios.post("/api/recipes", newRecipe);
    } catch {
      return thunkAPI.rejectWithValue("Pls try reloading the page.");
    }
  }
);

// export const deleteRecipe = createAsyncThunk(
//   "recipes/deleteRecipes",
//   async (deleteRecipeId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/api/recipes/${deleteRecipeId}`);
//       return response.data;
//     } catch {
//       return thunkAPI.rejectWithValue("Pls try reloading the page.");
//     }
//   }
// );

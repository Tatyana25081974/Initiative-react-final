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

      const urlForRecipes = `/api/recipes/ownRecipes?${queryParams.toString()}`;

      // console.log("");
      // console.log("1", params, queryParams);
      const { data } = await axios.get(urlForRecipes);
      // console.log("2", data);

      return {
        ...data.data,
        append: page > 1,
      };
    } catch {
      return thunkAPI.rejectWithValue("Pls try reloading the page.");
    }
  }
);

export const getFavoriteRecipes = createAsyncThunk(
  "recipes/getFavoriteRecipes",
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

      const urlForRecipes = `/api/recipes/favoriteRecipes?${queryParams.toString()}`;

      const { data } = await axios.get(urlForRecipes);

      return {
        ...data.data,
        append: page > 1,
      };
      // const { data } = await axios.get("/api/recipes/favoriteRecipes");
      // return data.data;
    } catch {
      return thunkAPI.rejectWithValue("Pls try reloading the page.");
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "recipes/getRecipeById",
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/recipes/id/${recipeId}`);
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
      const response = await axios.post("/api/recipes", newRecipe);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.message);
      // return thunkAPI.rejectWithValue("Pls try reloading the page.");
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

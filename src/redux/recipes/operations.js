import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

// fetchContacts  get    /contacts
// addContact     post   /contacts
// deleteContact  delete /contacts/:id
// patchContact patch /contacts/:id // ? optional new thunk

// GET @ /recipes
export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get("/api/recipes", { params });
      console.log("response from backend:", response.data);
      return response.data;
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

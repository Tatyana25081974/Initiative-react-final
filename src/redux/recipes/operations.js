import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchContacts  get    /contacts
// addContact     post   /contacts
// deleteContact  delete /contacts/:id
// patchContact patch /contacts/:id // ? optional new thunk

export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/recipes");
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchContacts  get    /contacts
// addContact     post   /contacts
// deleteContact  delete /contacts/:id
// patchContact patch /contacts/:id // ? optional new thunk

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/ingredients");
      return data.data;
    } catch {
      return thunkAPI.rejectWithValue("Pls try reloading the page.");
    }
  }
);

export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/categories");
      return data.data;
    } catch {
      return thunkAPI.rejectWithValue("Pls try reloading the page.");
    }
  }
);

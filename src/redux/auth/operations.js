import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL =
  // import.meta.env.VITE_API_BASE_URL ||
  "https://initiative-nodejs-final.onrender.com/";
// "http://localhost:3000";

const setAuthHeader = (token) => {
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete axios.defaults.headers.common.Authorization;
};
const clearAuthHeader = () => setAuthHeader(null);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/auth/register", credentials, {
        withCredentials: true,
      });
      const user = { name: data.data.user.name, email: data.data.user.email };
      setAuthHeader(data.data.accessToken);
      return { user, accessToken: data.data.accessToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      setAuthHeader(data.data.accessToken);
      const { data: user } = await axios.get("/api/users");

      return { user: user.data, accessToken: data.data.accessToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/api/auth/logout", null, {
      withCredentials: true,
    });

    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/auth/refresh", null, {
        withCredentials: true,
      });

      const newToken = data.data.accessToken;
      setAuthHeader(newToken);

      const { data: user } = await axios.get("/api/users");
      return { user: user.data, accessToken: newToken };
    } catch {
      return thunkAPI.rejectWithValue("Token refresh failed");
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (recipeId, thunkAPI) => {
    try {
      await axios.post(`/api/recipes/addFavorite/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/delete",
  async (recipeId, thunkAPI) => {
    try {
      await axios.post(`/api/recipes/deleteFavorite/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

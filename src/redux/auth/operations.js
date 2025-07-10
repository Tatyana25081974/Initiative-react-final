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

export const register = createAsyncThunk("auth/register", async (cred, t) => {
  try {
    const { data } = await axios.post("/api/auth/register", cred, {
      withCredentials: true,
    });

    setAuthHeader(data.data.accessToken);

    return { user: data.data.user, accessToken: data.data.accessToken };
  } catch (e) {
    if (e.response?.status === 409)
      return t.rejectWithValue("This email is already registered");
    return t.rejectWithValue("Registration failed");
  }
});

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
    await axios.post("/api/auth/logout", null, {
      withCredentials: true,
    });
    clearAuthHeader();
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
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (recipeId, thunkAPI) => {
    try {
      await axios.post(`/api/recipes/addFavorite/${recipeId}`);
      return recipeId;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);

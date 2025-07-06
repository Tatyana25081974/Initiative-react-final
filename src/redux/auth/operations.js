import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  // "https://initiative-nodejs-final.onrender.com/";
  "http://localhost:3000";

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
    const user = { name: data.data.user.name, email: data.data.user.email };
    setAuthHeader(data.data.accessToken);
    return { user, accessToken: data.data.accessToken };
  } catch (e) {
    return t.rejectWithValue(
      e.response?.data?.message || "Registration failed"
    );
  }
});

export const login = createAsyncThunk("auth/login", async (cred, t) => {
  try {
    const { data } = await axios.post("/api/auth/login", cred, {
      withCredentials: true,
    });
    setAuthHeader(data.data.accessToken);
    const { data: user } = await axios.get("/api/users");

    return { user: user.data, accessToken: data.data.accessToken };
  } catch (e) {
    return t.rejectWithValue(
      e.response?.data?.message || "Invalid credentials"
    );
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, t) => {
  try {
    await axios.post("/api/auth/logout", null, {
      withCredentials: true,
    });

    clearAuthHeader();
  } catch (e) {
    return t.rejectWithValue(e.response?.data?.message || "Logout failed");
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, t) => {
    // const { accessToken } = t.getState().auth;
    // if (!accessToken) return t.rejectWithValue("No token");
    try {
      const { data } = await axios.post("/api/auth/refresh", null, {
        withCredentials: true,
      });

      if (data?.message === "Access token expired") {
        return "Access token expired";
      }

      const newToken = data.data.accessToken;
      setAuthHeader(newToken);

      const { data: user } = await axios.get("/api/users");
      return { user: user.data, accessToken: newToken };
    } catch {
      return t.rejectWithValue("Token refresh failed");
    }
  }
  // { condition: (_, { getState }) => !!getState().auth.accessToken }
);

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (recipeId, t) => {
    try {
      await axios.post(`/api/recipes/${recipeId}/favorite`);
      return recipeId;
    } catch (e) {
      return t.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/delete",
  async (recipeId, t) => {
    try {
      await axios.delete(`/api/recipes/${recipeId}/favorite`);
      return recipeId;
    } catch (e) {
      return t.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

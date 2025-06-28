import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// ? import { errorElimination } from "./slice";

axios.defaults.baseURL = "https://initiative-nodejs-final.onrender.com/";

// register - для реєстрації нового користувача. Базовий тип екшену "auth/register".
// Використовується у компоненті RegistrationForm на сторінці реєстрації.

// login - для логіну існуючого користувача. Базовий тип екшену "auth/login".
// Використовується у компоненті LoginForm на сторінці логіну.

// logout - для виходу з додатка. Базовий тип екшену "auth/logout".
// Використовується у компоненті UserMenu у шапці додатку.

// refreshUser - оновлення користувача за токеном. Базовий тип екшену "auth/refresh".
// Використовується у компоненті App під час його монтування.

const setAuthHeader = (accessToken) => {
  axios.defaults.headers.common.Authorization = accessToken;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    // console.log('auth/register', credentials);
    try {
      const response = await axios.post("/api/auth/register", credentials);
      setAuthHeader(`Bearer ${response.data.token}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    // console.log('auth/register', credentials);
    try {
      const response = await axios.post("/api/auth/login", credentials);
      setAuthHeader(`Bearer ${response.data.accessToken}`);
      const user = await axios.get("api/users");
      return {
        user: user.data,
        accessToken: response.data.accessToken,
      };
      // return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Your email or password is not correct.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  // console.log('auth/logout');
  await axios.post("/users/logout");
  setAuthHeader("");
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // console.log('auth/refreshUser');
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.accessToken}`);
      const user = await axios.get("api/users");
      return {
        user: user.data,
        accessToken: reduxState.auth.accessToken,
      };

      // return response.data.accessToken;
    } catch (error) {
      if (error.response.data.message === "Access token expired") {
        const response = await axios.post("/api/auth/refresh");

        const newAccessToken = response.data.accessToken;
        setAuthHeader(`Bearer ${newAccessToken}`);
        const user = await axios.get("api/users");
        return {
          user: user.data,
          accessToken: newAccessToken,
        };
      }
      console.log(error);
      return thunkAPI.rejectWithValue("auth/refresh/rejected");
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
  "favorites/addFavorites",
  async (recipeId, thunkAPI) => {
    try {
      await axios.post(`/addFavorite/${recipeId}`);
      return recipeId; // повертаємо те, що потім потрапить у `action.payload`
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async (recipeId, thunkAPI) => {
    try {
      await axios.post(`/deleteFavorite/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ? export const smartErrorElimination = () => (dispatch, getState) => {
// ?   const state = getState();
// ?   if (state.auth.authError !== null) {
// ?     dispatch(errorElimination());
// ?   }
// ? };

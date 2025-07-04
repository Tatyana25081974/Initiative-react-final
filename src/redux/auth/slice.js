import { createSlice } from "@reduxjs/toolkit";
import {
  addFavorite,
  deleteFavorite,
  login,
  logout,
  refreshUser,
  register,
} from "./operations";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    accessToken: null,
    favorites: [],

    isLoggedIn: false,
    isRefreshing: false,

    isAuthLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.isAuthLoading = false;
      })

      .addCase(login.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthLoading = false;

        const user = action.payload.user;
        state.user = { name: user.name, email: user.email };

        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isAuthLoading = false;
      })

      .addCase(logout.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthLoading = false;

        state.user = {
          name: null,
          email: null,
        };
        state.accessToken = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const user = action.payload.user;

        state.user = { name: user.name, email: user.email };
        state.accessToken = action.payload.accessToken;

        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const recipeId = action.payload;
        if (!state.favorites.includes(recipeId)) {
          state.favorites.push(recipeId);
        }
        state.isLoading = false;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const recipeId = action.payload;
        state.favorites = state.favorites.filter((id) => id !== recipeId);
      });
  },
});

export default slice.reducer;

// export const { errorElimination } = slice.actions;

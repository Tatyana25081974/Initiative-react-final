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
      favorites: [],
      createdAt: null,
    },
    accessToken: null,

    isLoggedIn: false,
    isRefreshing: false,

    isAuthLoading: false,

    isLoading: false,
    isLoadingButtonFavorite: false,
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
        state.user = {
          name: user.name,
          email: user.email,
          favorites: user.favorites,
          createdAt: user.createdAt,
        };

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
          favorites: [],
          createdAt: null,
        };
        state.accessToken = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;

        const user = action.payload.user;

        state.user = {
          name: user.name,
          email: user.email,
          favorites: user.favorites,
          createdAt: user.createdAt,
        };
        state.accessToken = action.payload.accessToken;

        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;

        state.isLoggedIn = false;

        state.user = {
          name: null,
          email: null,
          favorites: [],
          createdAt: null,
        };

        state.accessToken = null;
      })

      .addCase(addFavorite.pending, (state) => {
        state.isLoadingButtonFavorite = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const recipeId = action.payload;
        if (!state.user.favorites.includes(recipeId)) {
          state.user.favorites.push(recipeId);
        }
        state.isLoadingButtonFavorite = false;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoadingButtonFavorite = false;
        state.error = action.payload;
      })

      .addCase(deleteFavorite.pending, (state) => {
        state.isLoadingButtonFavorite = true;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isLoadingButtonFavorite = false;
        const recipeId = action.payload;
        state.user.favorites = state.user.favorites.filter(
          (id) => id !== recipeId
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isLoadingButtonFavorite = false;
        state.error = action.payload;
      });

    // .addCase(getFav)
  },
});

export default slice.reducer;

// export const { errorElimination } = slice.actions;

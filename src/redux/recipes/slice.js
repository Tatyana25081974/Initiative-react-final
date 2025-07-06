import { createSlice } from "@reduxjs/toolkit";

import {
  addRecipe,
  getOwnRecipes,
  getFavoriteRecipes,

  //  deleteRecipe,
  getRecipes,
} from "./operations";

const handlePending = (state) => {
  state.error = null;
  state.loading = true;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    ownItems: [],
    favoriteItems: [],
    page: 1,
    totalPages: 1,
    totalItems: 0,
    loading: false,
    error: null,

    // deletingRecipeId: null,
  },
  reducers: {
    // addFavoriteRecipeToState: ()=>{}
    deleteFavoriteRecipeFromState: (state, action) => {
      // const newFavoriteItems = state.favoriteItems.filter((favoriteRecipe) => {
      //   action.payload !== favoriteRecipe._id;
      // });

      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (favoriteRecipe) => action.payload !== favoriteRecipe._id
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, handlePending)
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;

        const { data, totalItems, totalPages, append } = action.payload;

        state.items = append ? [...state.items, ...data] : data;

        state.totalItems = totalItems;
        state.totalPages = totalPages;
      })
      .addCase(getRecipes.rejected, handleRejected)

      .addCase(getOwnRecipes.pending, handlePending)
      .addCase(getOwnRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.ownItems = action.payload;
      })
      .addCase(getOwnRecipes.rejected, handleRejected)

      .addCase(getFavoriteRecipes.pending, handlePending)
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteItems = action.payload;
      })
      .addCase(getFavoriteRecipes.rejected, handleRejected)

      .addCase(addRecipe.pending, (state) => {
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.error = action.payload;
      });

    // .addCase(deleteRecipe.pending, (state, action) => {
    //   state.error = null;

    //   state.deletingRecipeId = action.meta.arg;
    // })
    // .addCase(deleteRecipe.fulfilled, (state, action) => {
    //   state.items = state.items.filter(
    //     (recipe) => recipe.id !== action.payload.id
    //   );

    //   state.deletingRecipeId = null;
    // })
    // .addCase(deleteRecipe.rejected, (state, action) => {
    //   state.error = action.payload;

    //   state.deletingRecipeId = null;
    // })
  },
});

export default slice.reducer;

export const { deleteFavoriteRecipeFromState } = slice.actions;

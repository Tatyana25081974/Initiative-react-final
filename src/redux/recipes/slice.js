import { createSlice } from "@reduxjs/toolkit";

import {
  addRecipe,
  getOwnRecipes,
  getFavoriteRecipes,

  //  deleteRecipe,
  getRecipes,
  getRecipeById,
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

    currentRecipe: null,

    // deletingRecipeId: null,

    currentRecipeLoading: false,
  },
  reducers: {
    // addFavoriteRecipeToState: ()=>{}
    deleteFavoriteRecipeFromState: (state, action) => {
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (favoriteRecipe) => action.payload !== favoriteRecipe._id
        ),
      };
    },
    changeTotalItemsFavoritesDelete: (state) => {
      return {
        ...state,
        totalItems: state.totalItems - 1,
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

        const { data, totalItems, totalPages, append } = action.payload;

        // state.ownItems = append ? [...state.items, ...data] : data;
        state.ownItems = append ? [...state.ownItems, ...data] : data;

        state.totalItems = totalItems;
        state.totalPages = totalPages;

        // state.ownItems = action.payload;
      })
      .addCase(getOwnRecipes.rejected, handleRejected)

      .addCase(getFavoriteRecipes.pending, handlePending)
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.loading = false;

        const { data, totalItems, totalPages, append } = action.payload;

        // state.favoriteItems = append ? [...state.items, ...data] : data;
        state.favoriteItems = append ? [...state.favoriteItems, ...data] : data;

        state.totalItems = totalItems;
        state.totalPages = totalPages;

        // state.favoriteItems = action.payload;
      })
      .addCase(getFavoriteRecipes.rejected, handleRejected)

      .addCase(addRecipe.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
        state.loading = false;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(getRecipeById.pending, (state) => {
        state.currentRecipe = null;
        state.error = null;
        state.loading = true;
        state.currentRecipeLoading = true;
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.currentRecipe = action.payload;
        const isExists = state.items.some(
          (recipe) => recipe._id === action.payload._id
        );
        if (!isExists) {
          state.items.push(action.payload);
        }
        state.loading = false;
        state.currentRecipeLoading = false;
      })
      .addCase(getRecipeById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.currentRecipeLoading = false;
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

export const {
  deleteFavoriteRecipeFromState,
  changeTotalItemsFavoritesDelete,
} = slice.actions;

export const selectUser = (state) => state.auth.user;

export const selectFavorites = (state) => state.auth.user.favorites;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectIsAuthLoading = (state) => state.auth.isAuthLoading;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectisLoadingButtonFavorite = (state) =>
  state.auth.isLoadingButtonFavorite;

// export const selectAuthError = (state) => state.auth.authError;

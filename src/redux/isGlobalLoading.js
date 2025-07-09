export const selectIsGlobalLoading = (state) =>
  state.auth.isLoading || state.recipes.loading || state.auth.isAuthLoading;

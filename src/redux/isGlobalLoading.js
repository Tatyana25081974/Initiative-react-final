export const selectIsGlobalLoading = (state) =>
  state.auth.isLoading || state.recipes.loading;

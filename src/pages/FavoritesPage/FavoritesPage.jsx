import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "../../redux/auth/operations.js";
import { getFavoriteRecipes } from "../../redux/recipes/operations.js";
import { selectFavoriteRecipes } from "../../redux/recipes/selectors.js";
import { selectIsGlobalLoading } from "../../redux/isGlobalLoading.js";

import Filters from "../../components/Filters/Filters.jsx";
import RecipeList from "../../components/RecipeList/RecipeList.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

import css from "./FavoritesPage.module.css";

const FavoritesPage = ({
  page,
  setPage,
  searchedIngredient,
  setSearchedIngredient,
  searchedCategory,
  setSearchedCategory,
  onReset,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await dispatch(
          getFavoriteRecipes({
            page,
            searchedIngredient,
            searchedCategory,
          })
        ).unwrap();
      } catch {
        dispatch(refreshUser());
      }
    };
    handleRefresh();
  }, [dispatch, page, searchedIngredient, searchedCategory]);

  const recipes = useSelector(selectFavoriteRecipes);

  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  const emptyIngredientFilter = searchedIngredient === "";
  const emptyCategoryFilter = searchedCategory === "";
  return (
    <>
      <Filters
        setPage={setPage}
        searchedIngredient={searchedIngredient}
        setSearchedIngredient={setSearchedIngredient}
        searchedCategory={searchedCategory}
        setSearchedCategory={setSearchedCategory}
        onReset={onReset}
        disableToast={emptyIngredientFilter && emptyCategoryFilter}
      />
      {recipes.length === 0 &&
      emptyIngredientFilter &&
      emptyCategoryFilter &&
      !isGlobalLoading ? (
        <p className={css.noSavedRecipesText}>
          You don't have favorites recipes.
        </p>
      ) : recipes.length === 0 ? (
        <p className={css.noSavedRecipesText}>
          No recipes found by selected filters.
        </p>
      ) : (
        <>
          <RecipeList recipes={recipes} />

          <LoadMoreBtn page={page} setPage={setPage} />
        </>
      )}
    </>
  );
};

export default FavoritesPage;

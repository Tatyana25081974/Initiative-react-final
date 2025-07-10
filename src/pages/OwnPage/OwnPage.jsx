import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getOwnRecipes } from "../../redux/recipes/operations";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectOwnRecipes } from "../../redux/recipes/selectors";
import { selectIsGlobalLoading } from "../../redux/isGlobalLoading.js";

import Filters from "../../components/Filters/Filters.jsx";
import RecipeList from "../../components/RecipeList/RecipeList.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

import css from "./OwnPage.module.css";

const OwnPage = ({
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
          getOwnRecipes({
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

  const recipes = useSelector(selectOwnRecipes);

  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  const emptyIngredientFilter = searchedIngredient === "";
  const emptyCategoryFilter = searchedCategory === "";
  return (
    <>
      <Filters
        setPage={setPage}
        searchedIngredient={searchedIngredient}
        setSearchedIngredient={setSearchedIngredient}
        setSearchedCategory={setSearchedCategory}
        searchedCategory={searchedCategory}
        onReset={onReset}
      />
      {recipes.length === 0 &&
      emptyIngredientFilter &&
      emptyCategoryFilter &&
      !isGlobalLoading ? (
        <p className={css.noSavedRecipesText}>You don't have own recipes.</p>
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

export default OwnPage;

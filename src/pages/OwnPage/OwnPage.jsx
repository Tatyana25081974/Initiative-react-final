import css from "./OwnPage.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnRecipes } from "../../redux/recipes/operations";
import { selectOwnRecipes } from "../../redux/recipes/selectors";
// import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeList from "../../components/RecipeList/RecipeList.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import SyncLoader from "react-spinners/SyncLoader";
import { selectIsGlobalLoading } from "../../redux/isGlobalLoading.js";
import { useLocation } from "react-router-dom";
import { addRefreshPath } from "../../redux/auth/slice.js";

const OwnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const refreshPath = location.pathname;

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await dispatch(getOwnRecipes()).unwrap();
        dispatch(addRefreshPath(refreshPath));
      } catch {
        dispatch(refreshUser());
      }
    };
    handleRefresh();
  }, [dispatch, refreshPath]);

  const recipes = useSelector(selectOwnRecipes);

  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  return (
    <>
      {recipes.length === 0 && !isGlobalLoading ? (
        <p className={css.noSavedRecipesText}>You don't have own recipes.</p>
      ) : (
        <RecipeList recipes={recipes} />
        // <ul className={css.list}>
        //   {recipes.map((recipe) => (
        //     <li key={recipe._id}>
        //       <RecipeCard recipe={recipe} />
        //     </li>
        //   ))}
        // </ul>
      )}
    </>
  );
};

export default OwnPage;

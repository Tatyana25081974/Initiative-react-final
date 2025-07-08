import css from "./FavoritesPage.module.css";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getFavoriteRecipes } from "../../redux/recipes/operations.js";

import { selectFavoriteRecipes } from "../../redux/recipes/selectors.js";

// import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import RecipeList from "../../components/RecipeList/RecipeList.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import SyncLoader from "react-spinners/SyncLoader";
import { selectIsGlobalLoading } from "../../redux/isGlobalLoading.js";

const FavoritesPage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   try {
  //     dispatch(getFavoriteRecipes()).unwrap();
  //   } catch {
  //     dispatch(refreshUser());
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await dispatch(getFavoriteRecipes()).unwrap();
      } catch {
        dispatch(refreshUser());
      }
    };
    handleRefresh();
  }, [dispatch]);

  const recipes = useSelector(selectFavoriteRecipes);

  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  return (
    <>
      {
        recipes.length === 0 && !isGlobalLoading ? (
          <p className={css.noSavedRecipesText}>You don't have own recipes.</p>
        ) : (
          <RecipeList recipes={recipes} />
        )
        // <ul className={css.list}>
        //   {recipes.map((recipe) => (
        //     <li key={recipe._id}>
        //       <RecipeCard recipe={recipe} />
        //     </li>
        //   ))}
        // </ul>
      }
    </>
  );
};

export default FavoritesPage;

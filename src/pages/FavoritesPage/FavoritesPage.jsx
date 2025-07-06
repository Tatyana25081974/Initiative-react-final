import css from "./FavoritesPage.module.css";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getFavoriteRecipes } from "../../redux/recipes/operations.js";

import { selectFavoriteRecipes } from "../../redux/recipes/selectors.js";

// import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import RecipeList from "../../components/RecipeList/RecipeList.jsx";

const FavoritesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteRecipes());
  }, [dispatch]);

  const recipes = useSelector(selectFavoriteRecipes);

  return (
    <>
      {recipes.length === 0 ? (
        <p className={css.noSavedRecipesText}>You don't have saved recipes</p>
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

export default FavoritesPage;

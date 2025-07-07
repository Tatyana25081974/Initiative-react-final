import css from "./OwnPage.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnRecipes } from "../../redux/recipes/operations";
import { selectOwnRecipes } from "../../redux/recipes/selectors";
// import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeList from "../../components/RecipeList/RecipeList.jsx";
import { refreshUser } from "../../redux/auth/operations.js";

const OwnPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await dispatch(getOwnRecipes()).unwrap();
      } catch {
        dispatch(refreshUser());
      }
    };
    handleRefresh();
  }, [dispatch]);

  const recipes = useSelector(selectOwnRecipes);

  return (
    <>
      {recipes.length === 0 ? (
        <p className={css.noSavedRecipesText}>You don't have own recipes</p>
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

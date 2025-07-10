// import css from './RecipeViewPage.module.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "../../components/NotFound/NotFoundRecipe/NotFoundRecipe.jsx";
import {
  selectCurrentRecipe,
  selectIsCurrentRecipeLoading,
  selectRecipeById,
} from "../../redux/recipes/selectors.js";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails.jsx";
import { useEffect } from "react";
import { getRecipeById } from "../../redux/recipes/operations.js";

const RecipeViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipeFromItems = useSelector(selectRecipeById(id));
  const currentRecipe = useSelector(selectCurrentRecipe);
  const isCurrentRecipeLoading = useSelector(selectIsCurrentRecipeLoading);

  const recipe = recipeFromItems || currentRecipe;

  useEffect(() => {
    if (!recipe || recipe._id !== id) {
      dispatch(getRecipeById(id));
    }
  }, [dispatch, id, recipe]);

  if (isCurrentRecipeLoading && !recipe) {
    return null;
  }

  if (!isCurrentRecipeLoading && !recipe) {
    return <NotFound />;
  }

  return <RecipeDetails recipe={recipe} />;
};

export default RecipeViewPage;

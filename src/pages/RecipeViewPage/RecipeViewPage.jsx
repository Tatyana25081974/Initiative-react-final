// import css from './RecipeViewPage.module.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "../../components/NotFound/NotFoundRecipe/NotFoundRecipe.jsx";
import {
  selectCurrentRecipe,
  selectRecipeById,
} from "../../redux/recipes/selectors.js";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails.jsx";
import { useEffect } from "react";
import { getRecipeById } from "../../redux/recipes/operations.js";

const RecipeViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipeById(id));

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  const refreshRecipe = useSelector(selectCurrentRecipe);

  if (!recipe && !refreshRecipe) {
    return <NotFound />;
  }

  return <RecipeDetails recipe={recipe || refreshRecipe} />;
};

export default RecipeViewPage;

// import css from './RecipeViewPage.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFound from "../../components/NotFound/NotFoundRecipe/NotFoundRecipe.jsx";
import { selectRecipeById } from "../../redux/recipes/selectors.js";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails.jsx";

const RecipeViewPage = () => {
  const { id } = useParams();
  const recipe = useSelector(selectRecipeById(id));

  if (!recipe) {
    return <NotFound />;
  }

  return <RecipeDetails recipe={recipe} />;
};

export default RecipeViewPage;

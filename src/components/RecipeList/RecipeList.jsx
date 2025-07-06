import { useSelector } from "react-redux";
import { selectRecipes } from "../../redux/recipes/selectors";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipeList.module.css";

const PER_PAGE = 12;

const RecipeList = () => {
  const recipes = useSelector(selectRecipes);

  return (
    <>
      <ul className={css.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} recipeId={recipe._id} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipeList;

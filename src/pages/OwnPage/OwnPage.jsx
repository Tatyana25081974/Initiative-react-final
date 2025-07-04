import css from "./OwnPage.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnRecipes } from "../../redux/recipes/operations";
import { selectOwnRecipes } from "../../redux/recipes/selectors";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const OwnPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnRecipes());
  }, [dispatch]);

  const recipes = useSelector(selectOwnRecipes);
  console.log(recipes);

  return (
    <>
      <ul className={css.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default OwnPage;

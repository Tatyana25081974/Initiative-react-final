import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipeList.module.css";
import { selectFavorites } from "../../redux/auth/selectors.js";

const RecipeList = ({ recipes }) => {
  const favorites = useSelector(selectFavorites);

  // console.log(favorites);
  return (
    <>
      <ul className={css.list}>
        {recipes.map((recipe) => {
          const favorite = favorites.includes(recipe._id);

          return (
            <li key={recipe._id}>
              <RecipeCard favorite={favorite} recipe={recipe} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RecipeList;

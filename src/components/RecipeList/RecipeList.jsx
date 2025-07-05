import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import css from "./RecipeList.module.css";
import { getRecipes } from "../../redux/recipes/operations";
import {
  selectFiltredRecipes,
  selectRecipesLoading,
  selectRecipesError,
} from "../../redux/recipes/selectors";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import cookingAnimation from "../../assets/animations/cookingloads.json";

const PER_PAGE = 12;

const RecipeList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const recipes = useSelector(selectFiltredRecipes);
  const loading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);

  useEffect(() => {
    dispatch(getRecipes({ page: 1, perPage: PER_PAGE }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getRecipes({ page: nextPage, perPage: PER_PAGE }));
  };

  return (
    <>
      <div className="container">
        <ul className={css.list}>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>

        {!loading && <LoadMoreBtn onClick={handleLoadMore} />}

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Lottie
              animationData={cookingAnimation}
              loop
              style={{ width: 200 }}
            />
          </div>
        )}

        {error && <p className={css.error}>Помилка: {error}</p>}

        {!loading && recipes.length === 0 && <p>Рецепти не знайдено</p>}
      </div>
    </>
  );
};

export default RecipeList;

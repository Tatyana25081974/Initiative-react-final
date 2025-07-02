import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import css from "./RecipesList.module.css";
import { getAllRecipes } from "../../services/api";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import cookingAnimation from "../../assets/animations/cookingloads.json";

const PER_PAGE = 12;

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0); //Спочатку 0, щоб не показувало картки до завантаження
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); //Вмикаємо лоадер
      try {
        const data = await getAllRecipes(); // Повертає масив усіх рецептів
        setRecipes(data);
        setVisibleCount(PER_PAGE); // Показуємо 12 перших тільки після завантаження
      } catch (error) {
        console.error("Помилка при завантаженні рецептів:", error);
      } finally {
        setLoading(false); // Вимикаємо лоадер
      }
    };

    fetchRecipes();
  }, []);

  const handleLoadMore = () => {
    setLoading(true); // вмикаємо лоадер при кліку на Load More

    setTimeout(() => {
      setVisibleCount((prev) => prev + PER_PAGE);
      setLoading(false); // вимикаємо лоадер після завантаження
    });
  };

  const visibleRecipes = recipes.slice(0, visibleCount);

  return (
    <>
      <ul className={css.list}>
        {visibleRecipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>

      {!loading && recipes.length > visibleCount && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

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
            loop={true}
            style={{ width: 200 }}
          />
        </div>
      )}
    </>
  );
};

export default RecipesList;

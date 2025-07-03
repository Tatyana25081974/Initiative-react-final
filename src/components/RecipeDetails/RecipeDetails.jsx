import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { FaRegBookmark } from "react-icons/fa6";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoriteRecipes/operations";

// Селектори — витягуємо стан із Redux
import {
  isRecipeFavorite,
  selectFavoritesLoading,
} from "../../redux/favoriteRecipes/selectors";

import css from "./RecipeDetails.module.css";

export default function RecipeDetails() {
  const { recipeId } = useParams(); // отримуємо ID рецепта з URL: /recipes/:recipeId
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Чи авторизований користувач — беремо з Redux auth slice
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Чи цей рецепт є в улюблених (true/false)
  const isFavorite = useSelector(isRecipeFavorite(recipeId));

  // Чи зараз триває запит (loading = true)
  const loading = useSelector(selectFavoritesLoading);

  // Отримуємо сам рецепт із Redux за його ID
  const recipe = useSelector((state) =>
    state.recipes.items.find((r) => r._id === recipeId)
  );

  // Якщо рецепт не знайдено — показуємо повідомлення
  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  // Деструктуризуємо потрібні поля з рецепта
  const {
    title,
    thumb,
    ingredients,
    instructions,
    category,
    time,
    calories,
    description,
  } = recipe;

  // Обробник кліку по кнопці Save / Remove
  const handleToggleFavorite = async () => {
    // Якщо користувач НЕ авторизований — переадресовуємо на логін
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    try {
      // Якщо вже в улюблених — видаляємо
      if (isFavorite) {
        await dispatch(removeFromFavorites(recipeId)).unwrap();
        toast.success("Removed from favorites");
      } else {
        // Інакше — додаємо
        await dispatch(addToFavorites(recipeId)).unwrap();
        toast.success("Added to favorites");
      }
    } catch {
      toast.error("Something went wrong"); // помилка від бекенду або мережі
    }
  };

  // Рендер компоненту

  return (
    <div className={css.container}>
      <div className={css.headerSection}>
        <img className={css.image} src={thumb} alt={title} />
        <h2 className={css.title}>{title}</h2>
      </div>

      <div className={css.content}>
        <div className={css.generalInfoBlock}>
          <div className={`${css.block} ${css.highlightedBlock}`}>
            <h4>General information</h4>
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Cooking time:</strong> {time} minutes
            </p>
            <p>
              <strong>Caloric content:</strong>{" "}
              {calories ? `~${calories} kcal` : "—"}
            </p>
          </div>

          <button
            className={css.saveButton}
            onClick={handleToggleFavorite}
            disabled={loading}
          >
            {loading
              ? isFavorite
                ? "Removing..."
                : "Saving..."
              : isFavorite
              ? "Remove"
              : "Save"}{" "}
            <FaRegBookmark />
          </button>
        </div>

        <div className={css.otherInfoBlock}>
          <div className={css.block}>
            <h3>About recipe</h3>
            <p>{description}</p>
          </div>

          <div className={css.block}>
            <h3>Ingredients</h3>
            <ul className={css.ingredientsList}>
              {ingredients.map(({ id, name, measure }) => (
                <li key={id}>
                  {name || id} – {measure}
                </li>
              ))}
            </ul>
          </div>

          <div className={css.block}>
            <h3>Preparation Steps:</h3>
            <ul className={css.instructionsList}>
              {instructions
                .split("\n")
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <li key={index} className={css.instructionItem}>
                    {step}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

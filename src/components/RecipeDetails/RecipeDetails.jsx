import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa6";
import css from "./RecipeDetails.module.css";

import ingredientsData from "../../data/tmp-ingredients.json";
import { useState } from "react";
import axios from "axios";

export default function RecipeDetails({ recipeId }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const recipe = useSelector((state) =>
    state.recipes.items.find((r) => r._id === recipeId)
  );

  const getIngredientNameById = (id) => {
    const ingredient = ingredientsData.find((item) => item._id === id);
    return ingredient ? ingredient.name : "Unknown ingredient";
  };

  if (!recipe) return <p>Recipe not found.</p>;

  const {
    title,
    thumb,
    description,
    ingredients,
    instructions,
    category,
    time,
    calories,
  } = recipe;

  const handleSaveClick = async () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`/api/recipes/favorite/${recipeId}`); // при локальній перевірці закоментувати тут і в slice - state.items = action.payload;
      // тимчасове рішення для перевірки
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // розкоментувати
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
            onClick={handleSaveClick}
            disabled={isSaved || loading}
          >
            {isSaved ? "Saved" : loading ? "Saving..." : "Save"}
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
              {ingredients.map(({ id, measure }) => (
                <li key={id}>
                  {getIngredientNameById(id)} – {measure}
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

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from "./RecipeDetails.module.css";

import { addFavorite, deleteFavorite } from "../../redux/auth/operations.js";
import { selectFavorites } from "../../redux/auth/selectors.js";
import { selectCurrentRecipe } from "../../redux/recipes/selectors.js";
import { getRecipeById } from "../../redux/recipes/operations.js";
import { useEffect, useState } from "react";
import SaveAuthModal from "../SaveAuthModal/SaveAuthModal.jsx";
import Container from "../Container/Container.jsx";
import { FaRegBookmark } from "react-icons/fa6";
import { selectIngredients } from "../../redux/filters/selectors.js";
import toast from "react-hot-toast";

export default function RecipeDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  const recipe = useSelector(selectCurrentRecipe);

  const favorites = useSelector(selectFavorites);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const ingredientList = useSelector(selectIngredients);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

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

  const favorite = favorites.includes(id);

  const handleClickAddFavorite = async () => {
    try {
      await dispatch(addFavorite(id)).unwrap();
    } catch (error) {
      openModal();
      toast.error("Failed to add recipe to favorites. Please try again.");
      console.error("Failed to add recipes to favorites:", error);
    }
  };

  const handleClickDeleteFavorite = async () => {
    try {
      await dispatch(deleteFavorite(id)).unwrap();
    } catch (error) {
      console.error("Unable to remove recipes from favorites:", error);
    }
  };

  return (
    <Container>
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
              onClick={(e) => {
                e.currentTarget.blur(); // прибиратє фокус після кліку
                favorite
                  ? handleClickDeleteFavorite()
                  : handleClickAddFavorite();
              }}
            >
              {favorite ? "Remove" : "Save"}
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
                    {
                      ingredientList.find((ingredient) => ingredient._id === id)
                        ?.name
                    }{" "}
                    – {measure}
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

        <SaveAuthModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>
    </Container>
  );
}

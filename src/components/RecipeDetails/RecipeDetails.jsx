import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

import {
  addFavorite,
  deleteFavorite,
  refreshUser,
} from "../../redux/auth/operations.js";
import {
  selectFavorites,
  selectisLoadingButtonFavorite,
  selectIsLoggedIn,
} from "../../redux/auth/selectors.js";
import { selectCurrentRecipe } from "../../redux/recipes/selectors.js";
import { getRecipeById } from "../../redux/recipes/operations.js";
import { useEffect, useState } from "react";
import SaveAuthModal from "../SaveAuthModal/SaveAuthModal.jsx";
import Container from "../Container/Container.jsx";
import { FaRegBookmark } from "react-icons/fa6";
import { selectIngredients } from "../../redux/filters/selectors.js";
import { firstLetterToUpperCase } from "../../utils/firstLetterToUpperCase.js";
import toast from "react-hot-toast";
import css from "./RecipeDetails.module.css";

export default function RecipeDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipe = useSelector(selectCurrentRecipe);
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectisLoadingButtonFavorite);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const ingredientList = useSelector(selectIngredients);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!recipe || recipe._id !== id) {
      dispatch(getRecipeById(id));
    }
  }, [dispatch, recipe, id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!recipe) return null;

  const {
    title,
    thumb,
    description,
    ingredients,
    instructions,
    category,
    time,
    cals,
  } = recipe || {};

  const favorite = favorites.includes(id);

  const handleClickAddFavorite = async () => {
    try {
      await dispatch(addFavorite(id)).unwrap();
      toast.success("Successfully add recipe to favorite list.", {
        duration: 2000,
      });
    } catch (error) {
      try {
        if (error === "Access token expired") {
          await dispatch(refreshUser()).unwrap();
        }
        if (isLoggedIn) {
          toast.error("Failed to add recipe to favorites. Please try again.");
        }
        if (!isLoggedIn) {
          openModal();
        }
      } catch (error) {
        console.error("Failed to add recipes to favorites:", error);
      }
    }
  };

  const handleClickDeleteFavorite = async () => {
    try {
      await dispatch(deleteFavorite(id)).unwrap();
      toast.success("Successfully remove recipe to favorite list.", {
        duration: 2000,
      });
    } catch (error) {
      try {
        if (error === "Access token expired") {
          await dispatch(refreshUser()).unwrap();
        }
        toast.error("Failed to revome recipe to favorites. Please try again.");
      } catch (error) {
        console.error("Unable to remove recipes from favorites:", error);
      }
    }
  };

  return (
    <Container>
      <div className={css.container}>
        <div className={css.headerSection}>
          <div className={css.imageWrapper}>
            <img className={css.image} src={thumb} alt={title} />
          </div>
          <h2 className={css.title}>{firstLetterToUpperCase(title)}</h2>
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
                <strong>Caloric content:</strong> {cals ? `~${cals} kcal` : "—"}
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
              {isLoading ? (
                <BarLoader className={css.loader} />
              ) : (
                <>
                  {favorite ? "Remove" : "Save"}
                  <FaRegBookmark />
                </>
              )}
            </button>
          </div>

          <div className={css.otherInfoBlock}>
            <div className={css.block}>
              <h3>About recipe</h3>
              <p>{firstLetterToUpperCase(description)}</p>
            </div>

            <div className={css.block}>
              <h3>Ingredients</h3>
              <ul className={css.ingredientsList}>
                {ingredients.map(({ id, measure }) => {
                  const ingredient = ingredientList.find(
                    (item) => item._id === id
                  );
                  return (
                    <li key={id}>
                      {ingredient ? ingredient.name : "Unknown ingredient"} -
                      {measure}
                    </li>
                  );
                })}
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
                      {firstLetterToUpperCase(step)}
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

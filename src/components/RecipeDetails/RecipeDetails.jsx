import { useDispatch, useSelector } from "react-redux";
import {
  // useNavigate,
  useParams,
} from "react-router-dom";
import css from "./RecipeDetails.module.css";

import ingredientsData from "../../data/tmp-ingredients.json";
import { addFavorite, deleteFavorite } from "../../redux/auth/operations.js";
import {
  selectFavorites,
  // selectIsLoggedIn,
} from "../../redux/auth/selectors.js";
import { getRecipeById } from "../../redux/recipes/operations.js";
import { selectCurrentRecipe } from "../../redux/recipes/selectors.js";
import { useEffect, useState } from "react";
import SaveAuthModal from "../SaveAuthModal/SaveAuthModal.jsx";

export default function RecipeDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  const recipe = useSelector(selectCurrentRecipe);

  console.log(recipe);

  // const navigate = useNavigate();
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  const favorites = useSelector(selectFavorites);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  // const handleFavoriteClick = () => {
  //   if (!isLoggedIn) {
  //     navigate("/auth/login");
  //   }
  // };

  const handleClickAddFavorite = async () => {
    try {
      await dispatch(addFavorite(id)).unwrap();

      // handleFavoriteClick();
    } catch (error) {
      openModal();
      console.error("Не вдалося додати рецепти до улюбленого:", error);
    }
  };

  const handleClickDeleteFavorite = async () => {
    try {
      await dispatch(deleteFavorite(id)).unwrap();

      // handleFavoriteClick();
    } catch (error) {
      console.error("Не вдалося видалити рецепти з улюбленого:", error);
    }
  };

  const getIngredientNameById = (id) => {
    const ingredient = ingredientsData.find((item) => item._id === id);
    return ingredient ? ingredient.name : "Unknown ingredient";
  };

  // if (!recipe) return <p>Recipe not found.</p>;

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

          {favorite ? (
            <button onClick={handleClickDeleteFavorite}>Saved</button>
          ) : (
            <button onClick={handleClickAddFavorite}>Save</button>
          )}

          {/* <button
            className={css.saveButton}
            onClick={handleSaveClick}
            disabled={isSaved || loading}
          >
            {isSaved ? "Saved" : loading ? "Saving..." : "Save"}
            <FaRegBookmark />
          </button> */}
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

      <SaveAuthModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}

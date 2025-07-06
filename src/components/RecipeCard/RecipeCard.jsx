import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  useDispatch,
  // useSelector
} from "react-redux";

import { addFavorite, deleteFavorite } from "../../redux/auth/operations.js";
import { deleteFavoriteRecipeFromState } from "../../redux/recipes/slice.js";

import FavoriteBtn from "../FavoriteBtn/FavoriteBtn.jsx";
import LearnMoreBtn from "../LearnMoreBtn/LearnMoreBtn.jsx";
import { BsClock } from "react-icons/bs";

import SaveAuthModal from "../SaveAuthModal/SaveAuthModal.jsx";

// import { selectFavoriteRecipes } from "../../redux/recipes/selectors.js";

import css from "./RecipeCard.module.css";

export default function RecipeCard({ favorite, recipe }) {
  const dispatch = useDispatch();

  const { _id, title, description, thumb, time, calories } = recipe;

  // const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const handleFavoriteClick = () => {
  //   if (!isLoggedIn) {
  //     navigate("/auth/login");
  //   }
  // };

  // const favoriteRecipes = useSelector(selectFavoriteRecipes);

  // const handleClickAddFavorite = async () => {
  //   const result = await dispatch(addFavorite());
  //   console.log(result);
  //   handleFavoriteClick();
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickAddFavorite = async () => {
    try {
      await dispatch(addFavorite(recipe._id)).unwrap();

      // handleFavoriteClick();
    } catch (error) {
      openModal();
      console.error("Не вдалося додати рецепти до улюбленого:", error);
    }
  };

  const handleClickDeleteFavorite = async () => {
    try {
      await dispatch(deleteFavorite(recipe._id)).unwrap();

      dispatch(deleteFavoriteRecipeFromState(recipe._id));

      // handleFavoriteClick();
    } catch (error) {
      console.error("Не вдалося видалити рецепти з улюбленого:", error);
    }
  };

  return (
    <div className={css.card}>
      <img className={css.image} src={thumb} alt={title} />

      <div className={css.titleRow}>
        <h3 className={css.title}>{title}</h3>
        <span className={css.time}>
          <BsClock className={css.icon} /> {time}
        </span>
      </div>
      <div>
        <p className={css.description}>{description}</p>
        <p className={css.calories}>
          {calories ? `~${calories} cals` : " — cals"}
        </p>
      </div>
      <div className={css.actions}>
        <LearnMoreBtn recipeId={_id} />

        {favorite ? (
          <button onClick={handleClickDeleteFavorite}>Delete</button>
        ) : (
          <button onClick={handleClickAddFavorite}>Add</button>
        )}

        {/* <FavoriteBtn
          recipeId={_id}
          isInitiallyFavorite={isFavorite}
          onClick={handleFavoriteClick}
        /> */}

        <SaveAuthModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>
    </div>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";

import { addFavorite, deleteFavorite } from "../../redux/auth/operations.js";
import { deleteFavoriteRecipeFromState } from "../../redux/recipes/slice.js";

import FavoriteBtn from "../FavoriteBtn/FavoriteBtn.jsx";
import LearnMoreBtn from "../LearnMoreBtn/LearnMoreBtn.jsx";
import { BsClock } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import clsx from "clsx";

import SaveAuthModal from "../SaveAuthModal/SaveAuthModal.jsx";

import css from "./RecipeCard.module.css";

export default function RecipeCard({ favorite, recipe }) {
  const dispatch = useDispatch();

  const { _id, title, description, thumb, time, calories } = recipe;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickAddFavorite = async () => {
    try {
      await dispatch(addFavorite(recipe._id)).unwrap();
    } catch (error) {
      openModal();
      console.error("Failed to add recipes to favorites:", error);
    }
  };

  const handleClickDeleteFavorite = async () => {
    try {
      await dispatch(deleteFavorite(recipe._id)).unwrap();

      dispatch(deleteFavoriteRecipeFromState(recipe._id));
    } catch (error) {
      console.error("Unable to remove recipes from favorites:", error);
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

        <button
          className={clsx(
            css.button,
            favorite ? css.favBtnDelete : css.favBtnAdd
          )}
          onClick={(e) => {
            e.currentTarget.blur(); // прибратє фокус після кліку
            favorite ? handleClickDeleteFavorite() : handleClickAddFavorite();
          }}
        >
          <FaRegBookmark />
        </button>

        <SaveAuthModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>
    </div>
  );
}

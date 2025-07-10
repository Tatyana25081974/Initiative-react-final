import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import {
  addFavorite,
  deleteFavorite,
  refreshUser,
} from "../../redux/auth/operations.js";
import {
  changeTotalItemsFavoritesDelete,
  deleteFavoriteRecipeFromState,
} from "../../redux/recipes/slice.js";

import FavoriteBtn from "../FavoriteBtn/FavoriteBtn.jsx";
import LearnMoreBtn from "../LearnMoreBtn/LearnMoreBtn.jsx";
import { BsClock } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import notFoundImg from "../../assets/images/notFoundImg.jpg";
import clsx from "clsx";
import toast from "react-hot-toast";

import SaveAuthModal from "../SaveAuthModal/SaveAuthModal.jsx";

import css from "./RecipeCard.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { firstLetterToUpperCase } from "../../utils/firstLetterToUpperCase.js";

export default function RecipeCard({ favorite, recipe }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [favoritesLoading, setFavoritesLoading] = useState(null);

  const { _id, title, description, thumb, time, cals } = recipe;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickAddFavorite = async () => {
    try {
      setFavoritesLoading(recipe._id);
      await dispatch(addFavorite(recipe._id)).unwrap();
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
    } finally {
      setFavoritesLoading(null);
    }
  };

  const handleClickDeleteFavorite = async () => {
    try {
      setFavoritesLoading(recipe._id);
      await dispatch(deleteFavorite(recipe._id)).unwrap();

      dispatch(deleteFavoriteRecipeFromState(recipe._id));
      dispatch(changeTotalItemsFavoritesDelete());
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
    } finally {
      setFavoritesLoading(null);
    }
  };

  return (
    <div className={css.card}>
      <img className={css.image} src={thumb || notFoundImg} alt={title} />

      <div className={css.titleRow}>
        <h3 className={css.title}>{firstLetterToUpperCase(title)}</h3>
        <span className={css.time}>
          <BsClock className={css.icon} /> {time}
        </span>
      </div>
      <div>
        <p className={css.description}>{firstLetterToUpperCase(description)}</p>
        <p className={css.calories}>{cals ? `~${cals} cals` : " — cals"}</p>
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
          {favoritesLoading ? <ClipLoader size={17} /> : <FaRegBookmark />}
        </button>

        <SaveAuthModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>
    </div>
  );
}

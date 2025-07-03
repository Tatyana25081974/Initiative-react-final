import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { RiDeleteBin4Line } from "react-icons/ri";
import css from "./FavoriteBtn.module.css";
// import axios from "axios";

export default function FavoriteBtn({
  recipeId,
  isInitiallyFavorite,
  variant,
}) {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async (e) => {
    try {
      setLoading(true);
      if (isFavorite) {
        // await axios.delete(`/api/recipes/favorite/${recipeId}`);
        console.log("Delete from favorites", recipeId);
      } else {
        // await axios.post(`/api/recipes/favorite/${recipeId}`);
        console.log("Add to favorites", recipeId);
      }
      setIsFavorite(!isFavorite);
      e.currentTarget.blur();
    } catch (error) {
      console.error("Favorite update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const classNames = [
    css.button,
    isFavorite ? css.active : "",
    variant === "smallWhite" ? css.smallWhite : "",
  ].join(" ");

  return (
    <button
      // className={`${css.button} ${isFavorite ? css.active : ""}`}
      className={classNames}
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <RiDeleteBin4Line /> : <FaRegBookmark />}
    </button>
  );
}

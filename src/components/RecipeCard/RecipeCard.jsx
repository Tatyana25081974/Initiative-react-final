import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import css from "./RecipeCard.module.css";

import FavoriteBtn from "../FavoriteBtn/FavoriteBtn.jsx";
import LearnMoreBtn from "../LearnMoreBtn/LearnMoreBtn.jsx";
import { BsClock } from "react-icons/bs";

export default function RecipeCard({ recipe }) {
  const { _id, title, description, thumb, time, calories, isFavorite } = recipe;

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLearnMoreClick = () => {
    navigate(`/recipes/${_id}`);
  };

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
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
        <LearnMoreBtn onClick={handleLearnMoreClick} />
        <FavoriteBtn
          recipeId={_id}
          isInitiallyFavorite={isFavorite}
          onClick={handleFavoriteClick}
        />
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  changeCategoryFilter,
  changeIngredientFilter,
  // changeType,
  resetFilters,
} from "../../redux/filters/slice";

import {
  selectCategory,
  selectFilters,
  selectIngredients,
} from "../../redux/filters/selectors";

import css from "./Filters.module.css";

const Filters = ({ recipesCount }) => {
  const dispatch = useDispatch();
  const { category, ingredient, type } = useSelector(selectFilters);

  //  Визначаємо, чи ми на сторінці профілю
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");

  const Category = useSelector(selectCategory);
  const Ingredients = useSelector(selectIngredients);

  const handleCategoryChange = (e) => {
    dispatch(changeCategoryFilter(e.target.value));
  };

  const handleIngredientChange = (e) => {
    dispatch(changeIngredientFilter(e.target.value));
  };

  // const handleTypeChange = (e) => {
  //   dispatch(changeType(e.target.value));
  // };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={css.container}>
      <p className={css.recipesCount}>{recipesCount} recipes found</p>

      <div className={css.filtersContainer}>
        {/*  Reset */}
        <button onClick={handleReset} className={css.resetButton}>
          Reset filters
        </button>

        {/*  Категорія */}
        <select
          value={category}
          multiple
          onChange={handleCategoryChange}
          className={css.select}
        >
          <option value="">Category</option>
          {Category.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/*  Інгредієнт */}
        <select
          value={ingredient}
          multiple
          onChange={handleIngredientChange}
          className={css.select}
        >
          <option value="">Ingredient</option>
          {Ingredients.map((ing) => (
            <option key={ing._id} value={ing.name}>
              {ing.name}
            </option>
          ))}
        </select>

        {/*  Тип рецептів (own | favorite) — тільки на сторінці профілю */}
        {isProfilePage && (
          <select
            value={type}
            multiple
            // onChange={handleTypeChange}
            className={css.select}
          >
            <option value="own">My Recipes</option>
            <option value="favorite">Favorite Recipes</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Filters;

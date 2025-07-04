import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GrFilter } from "react-icons/gr";

import {
  changeCategoryFilter,
  changeIngredientFilter,
  resetFilters,
} from "../../redux/filters/slice";

import {
  selectCategory,
  selectFilters,
  selectIngredients,
} from "../../redux/filters/selectors";

import useWindowWidth from "../../utils/useWindowWidth";

import css from "./Filters.module.css";

const Filters = ({ recipesCount }) => {
  const dispatch = useDispatch();
  const width = useWindowWidth();

  const { searchedCategory, searchedIngredient } = useSelector(selectFilters);

  const Category = useSelector(selectCategory);
  const Ingredients = useSelector(selectIngredients);

  const [showDropdown, setShowDropdown] = useState(false);
  const isMobile = width < 768;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(`.${css.dropdownContent}`) &&
        !e.target.closest(`.${css.dropdownButton}`)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Скидання фільтрів
  const handleReset = () => {
    dispatch(resetFilters());
  };

  // Зміна категорії
  const handleCategoryChange = (e) => {
    dispatch(changeCategoryFilter(e.target.value));
  };

  // Зміна інгредієнта
  const handleIngredientChange = (e) => {
    dispatch(changeIngredientFilter(e.target.value));
  };

  return (
    <div className={css.container}>
      {isMobile ? (
        <>
          {/* Верхній рядок: лічильник + кнопка Filters */}
          <div className={css.topBar}>
            <p className={css.recipesCount}>{recipesCount} recipes found</p>

            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={css.dropdownButton}
            >
              <span className={css.buttonText}>Filters</span>
              <GrFilter className={css.icon} />
            </button>
          </div>

          {/* Дропдаун відкривається ПІД кнопкою */}
          {showDropdown && (
            <div className={css.dropdownContent}>
              <select
                value={searchedCategory}
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

              <select
                value={searchedIngredient}
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

              <button onClick={handleReset} className={css.resetButton}>
                Reset filters
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Десктоп: фільтри завжди видимі, горизонтальні */}
          <p className={css.recipesCount}>{recipesCount} recipes found</p>

          <div className={css.filtersContainer}>
            <select
              value={searchedCategory}
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

            <select
              value={searchedIngredient}
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

            <button onClick={handleReset} className={css.resetButton}>
              Reset filters
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Filters;

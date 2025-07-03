import { useState } from "react";
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
      {/* Кількість знайдених рецептів */}
      <p className={css.recipesCount}>{recipesCount} recipes found</p>

      {isMobile ? (
        //  Мобільна версія з кнопкою і дропдауном
        <div className={css.filtersDropdownContainer}>
          {/* Кнопка Filters */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={css.dropdownButton}
          >
            <span className={css.buttonText}>Filters</span>
            <GrFilter className={css.icon} />
          </button>

          {/* Відкритий дропдаун */}
          {showDropdown && (
            <div className={css.dropdownContent}>
              <button onClick={handleReset} className={css.resetButton}>
                Reset filters
              </button>
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
            </div>
          )}
        </div>
      ) : (
        //  Десктоп і планшет — фільтр завжди відкритий горизонтально
        <div className={css.filtersContainer}>
          <button onClick={handleReset} className={css.resetButton}>
            Reset filters
          </button>

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
        </div>
      )}
    </div>
  );
};

export default Filters;

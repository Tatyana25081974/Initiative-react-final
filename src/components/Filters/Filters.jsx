import { useState, useEffect } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";

import { GrFilter } from "react-icons/gr";

// import {
//   // changeCategoryFilter,
//   // changeIngredientFilter,
//   resetFilters,
// } from "../../redux/filters/slice";

import {
  selectCategory,
  // selectFilters,
  selectIngredients,
} from "../../redux/filters/selectors";

import useWindowWidth from "../../utils/useWindowWidth";

import { selectTotalRecipes } from "../../redux/recipes/selectors.js";

import css from "./Filters.module.css";
import toast from "react-hot-toast";

const Filters = ({
  setPage,
  searchedIngredient,
  setSearchedIngredient,
  searchedCategory,
  setSearchedCategory,
  onReset,
  disableToast,
}) => {
  const width = useWindowWidth();

  const recipesCount = useSelector(selectTotalRecipes);

  const Category = useSelector(selectCategory);
  const Ingredients = useSelector(selectIngredients);

  const [showDropdown, setShowDropdown] = useState(false);
  const isMobile = width < 768;

  const [wasFetched, setWasFetched] = useState(false);

  useEffect(() => {
    if (!wasFetched && recipesCount !== 0) {
      setWasFetched(true);
    }

    if (wasFetched && recipesCount === 0) {
      if (!disableToast) {
        toast.error("There are no recipes that meet the selected criteria.", {
          id: "no-recipes-toast",
        });
      }
    } else {
      toast.dismiss("no-recipes-toast");
    }
  }, [recipesCount, wasFetched, disableToast]);

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

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };
  const handleCategoryChange = (e) => {
    setPage(1);
    const searchedCategoryValue = e.target.value;
    setSearchedCategory(searchedCategoryValue);
  };

  const handleIngredientChange = (e) => {
    setPage(1);
    const searchedIngredientValue = e.target.value;
    setSearchedIngredient(searchedIngredientValue);
  };

  return (
    <div className={css.container}>
      {isMobile ? (
        <>
          {/* Верхній рядок: лічильник + кнопка Filters */}
          <div className={css.topBar}>
            <p className={css.recipesCount}>{recipesCount} recipes</p>

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
          <p className={css.recipesCount}>{recipesCount} recipes</p>

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

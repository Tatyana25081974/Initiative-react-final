import TestComponent from "../../components/TestComponent";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipes/operations";
import { selectFilters } from "../../redux/filters/selectors";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero.jsx";

// import RecipeList from "../../components/RecipeList/RecipeList";

const MainPage = () => {
  const dispatch = useDispatch();

  // Отримуємо фільтри з Redux store
  const filters = useSelector(selectFilters);

  // Отримуємо список рецептів та стани
  /*const {
    items: recipes,
    // loading,
    // error,
  } = useSelector((state) => state.recipes);*/

  // При зміні фільтрів запускаємо запит на бекенд
  useEffect(() => {
    dispatch(getRecipes(filters));
  }, [dispatch, filters]);

  return (
    <div>
      <Hero />
      {/* 🔹 Компонент фільтрів */}
      <Filters />
      {/* 🔸 Список рецептів */}
      {/*
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <RecipeList recipes={recipes} />
      */}
      <TestComponent />
    </div>
  );
};
export default MainPage;

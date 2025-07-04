import TestComponent from "../../components/TestComponent";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRecipes } from "../../redux/recipes/operations";
// import { selectFilters } from "../../redux/filters/selectors";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero.jsx";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.jsx";

import RecipeList from "../../components/RecipeList/RecipeList"; // Закоментувати потім

const MainPage = () => {
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



      <RecipeList />


      <TestComponent />
    </div>
  );
};
export default MainPage;

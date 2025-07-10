import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipes/operations.js";
import { selectRecipes } from "../../redux/recipes/selectors.js";

import Hero from "../../components/Hero/Hero.jsx";
import Container from "../../components/Container/Container.jsx";
import Filters from "../../components/Filters/Filters";
import RecipeList from "../../components/RecipeList/RecipeList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

import css from "./MainPage.module.css";

const MainPage = ({
  page,
  setPage,
  searchedIngredient,
  setSearchedIngredient,
  searchedCategory,
  setSearchedCategory,
  searchQuery,
  setSearchQuery,
  inputValue,
  setInputValue,
  onReset,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getRecipes({ page, searchQuery, searchedIngredient, searchedCategory })
    );
  }, [dispatch, page, searchQuery, searchedIngredient, searchedCategory]);

  const recipes = useSelector(selectRecipes);

  return (
    <>
      <Hero
        setPage={setPage}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <Container>
        <div className={css.wrapper}>
          <h2 id="recepies">Recepies</h2>
          <Filters
            setPage={setPage}
            searchedIngredient={searchedIngredient}
            setSearchedIngredient={setSearchedIngredient}
            setSearchedCategory={setSearchedCategory}
            searchedCategory={searchedCategory}
            onReset={onReset}
          />

          <RecipeList recipes={recipes} />

          <LoadMoreBtn page={page} setPage={setPage} />
        </div>
      </Container>
    </>
  );
};
export default MainPage;

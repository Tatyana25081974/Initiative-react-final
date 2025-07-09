import Hero from "../../components/Hero/Hero.jsx";
import Filters from "../../components/Filters/Filters";
import RecipeList from "../../components/RecipeList/RecipeList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipes/operations.js";
import { selectRecipes } from "../../redux/recipes/selectors.js";
import css from "./MainPage.module.css";
import Container from "../../components/Container/Container.jsx";
import { SearchBox } from "../../components/SearchBox/SearchBox";

const MainPage = ({
  page,
  setPage,
  searchedIngredient,
  setSearchedIngredient,
  searchedCategory,
  setSearchedCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getRecipes({ page, searchQuery, searchedIngredient, searchedCategory })
    );
  }, [dispatch, page, searchQuery, searchedIngredient, searchedCategory]);

  const recipes = useSelector(selectRecipes);
  const [inputValue, setInputValue] = useState("");

  const handleResetAll = () => {
    setSearchQuery("");
    setSearchedIngredient("");
    setInputValue("");
    setSearchedCategory("");
    setPage(1);
  };

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
            setSearchQuery={setSearchQuery}
            onReset={handleResetAll}
          />

          <RecipeList recipes={recipes} />

          <LoadMoreBtn page={page} setPage={setPage} />
        </div>
      </Container>
    </>
  );
};
export default MainPage;

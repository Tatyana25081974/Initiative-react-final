import Hero from "../../components/Hero/Hero.jsx";
import Filters from "../../components/Filters/Filters";
import RecipeList from "../../components/RecipeList/RecipeList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

const MainPage = ({
  page,
  setPage,
  searchedIngredient,
  setSearchedIngredient,
  searchedCategory,
  setSearchedCategory,
  setSearchQuery,
}) => {
  return (
    <div>
      <Hero setSearchQuery={setSearchQuery} />

      <Filters
        searchedIngredient={searchedIngredient}
        setSearchedIngredient={setSearchedIngredient}
        setSearchedCategory={setSearchedCategory}
        searchedCategory={searchedCategory}
        setSearchQuery={setSearchQuery}
      />

      <RecipeList />

      <LoadMoreBtn page={page} setPage={setPage} />
    </div>
  );
};
export default MainPage;

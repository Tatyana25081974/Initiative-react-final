// import { useEffect, useState } from "react";
// import Lottie from "lottie-react";
// import css from "./RecipeList.module.css";
// import { getAllRecipes } from "../../services/api";
// import RecipeCard from "../RecipeCard/RecipeCard";
// import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import cookingAnimation from "../../assets/animations/cookingloads.json";

// const PER_PAGE = 12;

// const RecipesList = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(0); //Спочатку 0, щоб не показувало картки до завантаження
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true); //Вмикаємо лоадер
//       try {
//         const data = await getAllRecipes(); // Повертає масив усіх рецептів
//         setRecipes(data);
//         setVisibleCount(PER_PAGE); // Показуємо 12 перших тільки після завантаження
//       } catch (error) {
//         console.error("Помилка при завантаженні рецептів:", error);
//       } finally {
//         setLoading(false); // Вимикаємо лоадер
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleLoadMore = () => {
//     setLoading(true); // вмикаємо лоадер при кліку на Load More

//     setTimeout(() => {
//       setVisibleCount((prev) => prev + PER_PAGE);
//       setLoading(false); // вимикаємо лоадер після завантаження
//     });
//   };

//   const visibleRecipes = recipes.slice(0, visibleCount);

//   return (
//     <>
//       <ul className={css.list}>
//         {visibleRecipes.map((recipe) => (
//           <li key={recipe._id}>
//             <RecipeCard recipe={recipe} />
//           </li>
//         ))}
//       </ul>

//       {!loading && recipes.length > visibleCount && (
//         <LoadMoreBtn onClick={handleLoadMore} />
//       )}

//       {loading && (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "40px",
//           }}
//         >
//           <Lottie
//             animationData={cookingAnimation}
//             loop={true}
//             style={{ width: 200 }}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default RecipesList;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipes/operations";
import { selectFilters } from "../../redux/filters/selectors";
import {
  selectRecipes,
  selectRecipesLoading,
  selectRecipesPage,
  selectRecipesTotalPages,
} from "../../redux/recipes/selectors";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./RecipeList.module.css";

const PER_PAGE = 12;

const RecipeList = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const recipes = useSelector(selectRecipes);
  const loading = useSelector(selectRecipesLoading);
  const page = useSelector(selectRecipesPage);
  const totalPages = useSelector(selectRecipesTotalPages);

  // const [page, setPage] = useState(1);

  useEffect(() => {
    // setPage(1); // Скидаємо сторінку при зміні фільтрів
    dispatch(getRecipes({ ...filters, page: 1, perPage: PER_PAGE }));
  }, [dispatch, filters]);

  // const handleLoadMore = () => {
  //   const nextPage = page + 1;
  //   setPage(nextPage);
  //   dispatch(getRecipes({ ...filters, page: nextPage, perPage: PER_PAGE }));
  // };

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(getRecipes({ ...filters, page: page + 1, perPage: PER_PAGE }));
    }
  };

  console.log("recipes from redux:", recipes);

  return (
    <>
      <ul className={css.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>

      {!loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </>
  );
};

export default RecipeList;

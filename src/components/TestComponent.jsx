// Компонент створено для тимчасового,
// візуального і локального тесту
// не великих компонентів
//! Після закінчення проекту підлягає видаленню

import Logo from "./Logo/Logo.jsx";
import LearnMoreBtn from "./LearnMoreBtn/LearnMoreBtn.jsx";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";
import FavoriteBtn from "./FavoriteBtn/FavoriteBtn.jsx";
import css from "./TestComponent.module.css";

const TestComponent = () => {
  return (
    <div className={css.container}>
      <Logo />
      <LearnMoreBtn />
      <LoadMoreBtn onClick={() => console.log("Load more clicked")} />
      <FavoriteBtn
        recipeId="6462a8f74c3d0ddd2889802b"
        isInitiallyFavorite={false}
      />
    </div>
  );
};

export default TestComponent;

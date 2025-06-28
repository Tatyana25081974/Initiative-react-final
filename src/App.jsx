import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Logo from "./components/Logo/Logo.jsx";
import LearnMoreBtn from "./components/LearnMoreBtn/LearnMoreBtn.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import FavoriteBtn from "./components/FavoriteBtn/FavoriteBtn.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <LearnMoreBtn />
      <LoadMoreBtn onClick={() => console.log("Load more clicked")} />
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Test Favorite Button</h2>
        <FavoriteBtn
          recipeId="6462a8f74c3d0ddd2889802b"
          isInitiallyFavorite={false}
        />
      </div>
      {/* <AppRoutes /> */}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;

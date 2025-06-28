import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";

import MainPage from "../pages/MainPage/MainPage.jsx";
import RecipeViewPage from "../pages/RecipeViewPage/RecipeViewPage.jsx";
import AddRecipePage from "../pages/AddRecipePage/AddRecipePage.jsx";

import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import OwnPage from "../pages/OwnPage/OwnPage.jsx";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage.jsx";

import AuthPage from "../pages/AuthPage/AuthPage.jsx";

import NotFound from "../pages/NotFound/NotFound.jsx";

// import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/recipes/:id" element={<RecipeViewPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />

          <Route path="/profile" element={<ProfilePage />}>
            <Route path="own" element={<OwnPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>

          {/* <Route path="/profile/:recipeType" element={<ProfilePage />} /> */}

          <Route path="/auth/:authType" element={<AuthPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;

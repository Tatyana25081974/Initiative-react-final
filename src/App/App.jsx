import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";

// import MainPage from "../pages/MainPage/MainPage.jsx";
import RecipeViewPage from "../pages/RecipeViewPage/RecipeViewPage.jsx";
import AddRecipePage from "../pages/AddRecipePage/AddRecipePage.jsx";

import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import OwnPage from "../pages/OwnPage/OwnPage.jsx";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage.jsx";

import AuthPage from "../pages/AuthPage/AuthPage.jsx";

import NotFound from "../pages/NotFound/NotFound.jsx";

import { useEffect, lazy } from "react";

import { useDispatch } from "react-redux";
import { refreshUser } from "../redux/auth/operations.js";

import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";
import RestrictedRoute from "../components/RestrictedRoute/RestrictedRoute.jsx";

import Modal from "react-modal";

// import { selectIsRefreshing } from "../redux/auth/selectors";
import { getRecipes } from "../redux/recipes/operations.js";

import { getCategory, getIngredients } from "../redux/filters/operation.js";
import { Toaster } from "react-hot-toast";

// import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";

Modal.setAppElement("#root");

const MainPage = lazy(() => import("../pages/MainPage/MainPage.jsx"));

const App = () => {
  const dispatch = useDispatch();

  // Вказує на те чи рефрешиться зараз сторінка чи ні
  // const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getRecipes());
    dispatch(getCategory());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/recipes/:id" element={<RecipeViewPage />} />
          <Route
            path="/add-recipe"
            element={
              <PrivateRoute
                component={<AddRecipePage />}
                redirectTo="/auth/login"
              />
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute
                component={<ProfilePage />}
                redirectTo="/auth/login"
              />
            }
          >
            <Route path="own" element={<OwnPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>

          {/* <Route path="/profile/:recipeType" element={<ProfilePage />} /> */}

          <Route
            path="/auth/:authType"
            element={
              <RestrictedRoute component={<AuthPage />} redirectTo={"/"} />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

      <Toaster position="top-center" toastOptions={{ duration: 6000 }} />
    </>
  );
};

export default App;

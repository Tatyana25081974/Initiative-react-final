import Modal from "react-modal";
import SyncLoader from "react-spinners/SyncLoader";
import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/Layout/Layout.jsx";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";
import RestrictedRoute from "../components/RestrictedRoute/RestrictedRoute.jsx";

import { refreshUser } from "../redux/auth/operations.js";
import { selectIsRefreshing } from "../redux/auth/selectors";

import { getCategory, getIngredients } from "../redux/filters/operation.js";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import {
  selectErrorIngredientsAndCategories,
  selectLoadingIngredientsAndCategories,
} from "../redux/filters/selectors.js";
import { NetworkError } from "../components/NetworkError/NetworkError.jsx";
import { selectIsGlobalLoading } from "../redux/isGlobalLoading.js";

Modal.setAppElement("#root");

const MainPage = lazy(() => import("../pages/MainPage/MainPage.jsx"));

const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage.jsx"));

const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage.jsx"));

const OwnPage = lazy(() => import("../pages/OwnPage/OwnPage.jsx"));

const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FavoritesPage.jsx")
);

const RecipeViewPage = lazy(() =>
  import("../pages/RecipeViewPage/RecipeViewPage.jsx")
);

const AddRecipePage = lazy(() =>
  import("../pages/AddRecipePage/AddRecipePage.jsx")
);

const NotFound = lazy(() => import("../pages/NotFound/NotFound.jsx"));

const App = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedIngredient, setSearchedIngredient] = useState("");
  const [searchedCategory, setSearchedCategory] = useState("");

  const [inputValue, setInputValue] = useState("");

  const handleResetAll = () => {
    setSearchQuery("");
    setSearchedIngredient("");
    setInputValue("");
    setSearchedCategory("");
    setPage(1);
  };

  const isRefreshing = useSelector(selectIsRefreshing);

  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getIngredients());

    dispatch(refreshUser());
  }, [dispatch]);

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#3d2218",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const loadingIngredientsAndCategories = useSelector(
    selectLoadingIngredientsAndCategories
  );

  const errorIngredientsAndCategories = useSelector(
    selectErrorIngredientsAndCategories
  );

  return isRefreshing && loadingIngredientsAndCategories ? (
    <div style={overlayStyle}>
      <SyncLoader color="#ffffff" />
    </div>
  ) : errorIngredientsAndCategories ? (
    <NetworkError />
  ) : (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                page={page}
                setPage={setPage}
                searchedIngredient={searchedIngredient}
                setSearchedIngredient={setSearchedIngredient}
                searchedCategory={searchedCategory}
                setSearchedCategory={setSearchedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onReset={handleResetAll}
              />
            }
          ></Route>

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
            path="/profile/"
            element={
              <PrivateRoute
                component={<ProfilePage />}
                redirectTo="/auth/login"
              />
            }
          >
            <Route
              path="own"
              element={
                <OwnPage
                  page={page}
                  setPage={setPage}
                  searchedIngredient={searchedIngredient}
                  setSearchedIngredient={setSearchedIngredient}
                  searchedCategory={searchedCategory}
                  setSearchedCategory={setSearchedCategory}
                  onReset={handleResetAll}
                />
              }
            />
            <Route
              path="favorites"
              element={
                <FavoritesPage
                  page={page}
                  setPage={setPage}
                  searchedIngredient={searchedIngredient}
                  setSearchedIngredient={setSearchedIngredient}
                  searchedCategory={searchedCategory}
                  setSearchedCategory={setSearchedCategory}
                  onReset={handleResetAll}
                />
              }
            />
          </Route>

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

      {isGlobalLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <SyncLoader color="#3d2218" />
        </div>
      )}
    </>
  );
};

export default App;

// import css from "./ProfilePage.module.css";

import { Outlet } from "react-router-dom";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import css from "./ProfilePage.module.css";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOwnRecipes } from "../../redux/recipes/operations";
import // selectFiltredOwnRecipes,
// selectOwnRecipes,
"../../redux/recipes/selectors";
import Filters from "../../components/Filters/Filters";

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnRecipes());
  }, [dispatch]);

  // const ownrecipes = useSelector(selectOwnRecipes);
  // console.log(ownrecipes);
  // const recipes = useSelector(selectFiltredOwnRecipes);
  // console.log(recipes);

  return (
    <>
      <Section>
        <Container>
          <h1 className={css.profTitle}>My profile</h1>
          <ProfileNavigation />
          <Filters />
          <Outlet />
        </Container>
        <LoadMoreBtn />
      </Section>
    </>
  );
};

export default ProfilePage;

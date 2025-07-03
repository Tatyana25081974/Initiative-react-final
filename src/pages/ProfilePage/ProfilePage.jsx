// import css from "./ProfilePage.module.css";

import { Outlet } from "react-router-dom";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import css from "./ProfilePage.module.css";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const ProfilePage = () => {
  return (
    <>
      <Section>
        <Container>
          <h1 className={css.profTitle}>My profile</h1>
          <ProfileNavigation />
          <Outlet />
        </Container>
        <LoadMoreBtn />
      </Section>
    </>
  );
};

export default ProfilePage;

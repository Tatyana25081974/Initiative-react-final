import css from "./ProfilePage.module.css";

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// import Section from "../../components/Section/Section";
// import Container from "../../components/Container/Container";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
// import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Container from "../../components/Container/Container";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      navigate("/profile/own", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <Section>
        <Container>
          <h1 className={css.profTitle}>My profile</h1>
          <ProfileNavigation />
          {/* <Filters /> */}
          <Outlet />
        </Container>
        <LoadMoreBtn />
      </Section>
    </>
  );
};

export default ProfilePage;

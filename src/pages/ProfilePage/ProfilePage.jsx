// import css from "./ProfilePage.module.css";

import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <>
      <p>Profile</p>

      <Outlet />
    </>
  );
};

export default ProfilePage;

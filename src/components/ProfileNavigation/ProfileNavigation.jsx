import { NavLink } from "react-router-dom";
import css from "./ProfileNavigation.module.css";

const ProfileNavigation = () => {
  return (
    <ul className={css.profNavList}>
      <li className={css.profNavItem}>
        <NavLink to="own">My Recipes</NavLink>
      </li>
      <li className={css.profNavItem}>
        <NavLink to="favorites">Saved Recipes</NavLink>
      </li>
    </ul>
  );
};

export default ProfileNavigation;

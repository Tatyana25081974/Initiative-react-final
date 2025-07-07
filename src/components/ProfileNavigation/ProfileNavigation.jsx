import css from "./ProfileNavigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

const ProfileNavigation = () => {
  return (
    <ul className={css.profNavList}>
      <li className={css.profNavItem}>
        <NavLink className={buildLinkClass} to="own">
          My Recipes
        </NavLink>
      </li>
      <li className={css.profNavItem}>
        <NavLink className={buildLinkClass} to="favorites">
          Saved Recipes
        </NavLink>
      </li>
    </ul>
  );
};

export default ProfileNavigation;

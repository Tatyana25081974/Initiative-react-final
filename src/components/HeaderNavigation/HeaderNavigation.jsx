import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { IoIosLogOut } from "react-icons/io";

import css from "./HeaderNavigation.module.css";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const HeaderNavigation = ({ userName }) => {
  const firstletterOnName = userName.slice(0, 1);

  return (
    <nav className={css.navigationContainer}>
      <NavLink to="/Recipes" className={getLinkStyles}>
        Recipes
      </NavLink>
      <NavLink to="/LogIn" className={getLinkStyles}>
        Log in
      </NavLink>
      <NavLink to="/Register" className={getLinkStyles}>
        Register
      </NavLink>
      <div className={css.userInfo}>
        <div className={css.avatarCircle}>{`${firstletterOnName}`}</div>
        <span>{`${userName}`}</span>
      </div>
      <NavLink to="/logout" className={getLinkStyles}>
        <IoIosLogOut />
      </NavLink>
    </nav>
  );
};

export default HeaderNavigation;

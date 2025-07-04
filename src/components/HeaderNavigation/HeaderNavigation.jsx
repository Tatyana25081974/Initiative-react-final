import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { IoIosLogOut } from "react-icons/io";
import css from "./HeaderNavigation.module.css";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const HeaderNavigation = ({ userName }) => {
  const isLoggedIn = Boolean(userName);

  const firstletterOnName = userName?.slice(0, 1);

  return (
    <nav className={css.navigationContainer}>
      <div className={css.leftSide}>
        <NavLink to="/recipes" className={getLinkStyles}>
          Recipes
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/profile" className={getLinkStyles}>
            My Profile
          </NavLink>
        )}
      </div>

      <div className={css.rightSide}>
        {isLoggedIn ? (
          <>
            <NavLink to="/add" className={css.addButton}>
              Add Recepy
            </NavLink>
            <div className={css.userInfo}>
              <div className={css.avatarCircle}>{firstletterOnName}</div>
              <span>{userName}</span>
            </div>
            <div className={css.separator} />
            <NavLink to="/auth/logout" className={getLinkStyles}>
              <IoIosLogOut />
            </NavLink>
          </>
        ) : (
          <>
            <div className={css.userInfoNonAuth}>
              <NavLink to="/auth/login" className={getLinkStyles}>
                Log in
              </NavLink>
              <NavLink to="/auth/register" className={css.buttonLink}>
                Register
              </NavLink>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default HeaderNavigation;

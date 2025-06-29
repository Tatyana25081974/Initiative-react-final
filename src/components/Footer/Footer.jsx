import { useLocation } from "react-router-dom";
import css from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/profile";
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.footer__logo}>
          <a href="/">
            <img
              src="/images/Logo.png"
              alt="Logo.png"
              className={css.logo_img}
            />
          </a>
        </div>

        <div className={css.footer_copyright}>
          <p>
            © {new Date().getFullYear()} CookingCompanion. All rights reserved.
          </p>
        </div>

        <nav className={css.footer_nav}>
          <a href="/">Recipes</a>
          {!isRegisterPage && <a href="/profile">Account</a>}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

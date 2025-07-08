import { Link, useLocation } from "react-router-dom";
import css from "./Footer.module.css";
import Container from "../Container/Container.jsx";

const Footer = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/profile";
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.container}>
          <div className={css.footer__logo}>
            <Link to="/">
              <img
                src="/images/Logo.png"
                alt="Logo.png"
                className={css.logo_img}
              />
            </Link>
          </div>

          <div className={css.footer_copyright}>
            <p>
              © {new Date().getFullYear()} CookingCompanion. All rights
              reserved.
            </p>
          </div>

          <nav className={css.footer_nav}>
            <Link to="/">Recipes</Link>
            {!isRegisterPage && <Link to="/profile">Account</Link>}
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

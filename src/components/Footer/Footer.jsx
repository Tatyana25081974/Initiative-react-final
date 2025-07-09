import { Link, useLocation } from "react-router-dom";
import css from "./Footer.module.css";
import Container from "../Container/Container.jsx";
import { HashLink } from "react-router-hash-link";
import Logo from "../Logo/Logo.jsx";

const Footer = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/profile";
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.container}>
          <div className={css.footer__logo}>
            {/* <Link
              to="/"
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <img
                src="/images/Logo.png"
                alt="Logo.png"
                className={css.logo_img}
              />
            </Link> */}
            <Logo />
          </div>

          <div className={css.footer_copyright}>
            <p>
              © {new Date().getFullYear()} CookingCompanion. All rights
              reserved.
            </p>
          </div>

          <nav className={css.footer_nav}>
            <HashLink smooth to="/#recepies">
              Recipes
            </HashLink>
            {!isRegisterPage && <Link to="/profile">Account</Link>}
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

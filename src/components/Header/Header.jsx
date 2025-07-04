// import css from "./Header.module.css";
import HeaderNavigation from "../HeaderNavigation/HeaderNavigation";

import css from "./Header.module.css";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";

const Header = () => {
  return (
    <header className={css.wrapper}>
      <Container>
        <div className={css.container}>
          <Logo />
          <HeaderNavigation userName={""} />
        </div>
      </Container>
    </header>
  );
};

export default Header;

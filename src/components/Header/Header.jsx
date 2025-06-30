import css from "./Header.module.css";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";

const Header = () => {
  return (
    <header className={css.wrapper}>
      <Container>
        <Logo />
      </Container>
    </header>
  );
};

export default Header;

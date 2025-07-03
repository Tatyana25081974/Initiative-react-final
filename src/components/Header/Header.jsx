import css from "./Header.module.css";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";
import HeaderModal from "./HeaderModal/HeaderModal.jsx";

import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTableOrDesctop = useMediaQuery({ minWidth: 768 });

  return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
          <Logo />
          {isMobile && (
            <HeaderModal>
              <p>Navigation</p>
            </HeaderModal>
          )}
          {isTableOrDesctop && <p>Navigation</p>}
        </div>
      </Container>
    </header>
  );
};

export default Header;

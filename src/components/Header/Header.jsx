import css from "./Header.module.css";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";
import HeaderModal from "./HeaderModal/HeaderModal.jsx";
import HeaderNavigation from "../HeaderNavigation/HeaderNavigation.jsx";

import { selectUser } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";

import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTableOrDesctop = useMediaQuery({ minWidth: 768 });
  const user = useSelector(selectUser);
  const userName = user?.name || "Max";

  return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
          <Logo />
          {isMobile && (
            <HeaderModal>
              <HeaderNavigation userName={userName} />
            </HeaderModal>
          )}
          {isTableOrDesctop && <HeaderNavigation userName={userName} />}
        </div>
      </Container>
    </header>
  );
};

export default Header;

import css from "./Header.module.css";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";
import { useState } from "react";

const customStylesModal = {
  overlay: {
    zIndex: 1000,
  },
  content: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: "100vw",
    height: "100vh",

    border: "none",
    backgroundColor: "#3d2218",

    padding: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
};

const Header = () => {
  const [isOpenModal, setisOpenModal] = useState(false);

  return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
          <Logo />
          <button
            onClick={() => setisOpenModal(true)}
            className={css.btnBgrOpenModalMenu}
          >
            <RxHamburgerMenu className={css.iconOpen} />
          </button>
          <Modal
            isOpen={isOpenModal}
            style={customStylesModal}
            bodyOpenClassName="modal-open"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#3d2218",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className={css.wrapperBgrMenu}>
                <div className={css.wrapperLogoModal}>
                  <Logo />
                  <button
                    onClick={() => setisOpenModal(false)}
                    className={css.btnCloseModalMenu}
                  >
                    <RxCrossCircled className={css.iconClose} />
                  </button>
                </div>
                <ul className={css.navMenu}>
                  <li>Recipes</li>
                  <li>Log in</li>
                  <li>Register</li>
                </ul>
              </div>
            </motion.div>
          </Modal>
        </div>
      </Container>
    </header>
  );
};

export default Header;

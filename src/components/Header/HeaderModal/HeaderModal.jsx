import css from "./HeaderModal.module.css";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const customStylesModal = {
  overlay: {
    zIndex: 1000,
    backgroundColor: "inherit",
  },
  content: {
    position: "fixed",
    top: "71px",
    left: 0,
    right: 0,
    bottom: 0,

    width: "100vw",
    height: "100vh",

    border: "none",
    backgroundColor: "inherit",

    padding: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
};

const HeaderModal = ({ children }) => {
  const [isOpenModal, setisOpenModal] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setisOpenModal(false);
  }, [location]);

  return (
    <div className={css.wrapperModal}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isOpenModal ? "close" : "open"}
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
          transition={{ duration: 0.25 }}
        >
          {!isOpenModal ? (
            <button
              onClick={() => setisOpenModal(true)}
              className={css.btnBgrOpenModalMenu}
            >
              <RxHamburgerMenu className={css.iconOpen} />
            </button>
          ) : (
            <button
              onClick={() => setisOpenModal(false)}
              className={css.btnCloseModalMenu}
            >
              <RxCrossCircled className={css.iconClose} />
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isOpenModal && (
          <Modal
            isOpen={isOpenModal}
            onRequestClose={() => setisOpenModal(false)}
            style={customStylesModal}
            bodyOpenClassName="modal-open"
            overlayClassName="CustomOverlay"
            ariaHideApp={false}
          >
            <motion.div
              key="modal-motion"
              initial={{ opacity: 0, y: "-100vh" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100vh" }}
              transition={{ duration: 0.4, type: "spring", damping: 20 }}
              style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#3d2218",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <div className={css.wrapperBgrMenu}>{children}</div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderModal;

import { useEffect } from "react";
import Modal from "react-modal";
import css from "./SignOutModal.module.css";
import { RxCross2 } from "react-icons/rx";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations.js";
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const SignOutModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    onRequestClose();
    navigate("/");
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onRequestClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.closeBtn} onClick={onRequestClose}>
        <RxCross2 size={24} />
      </button>
      <h2 className={css.title}>Are you sure?</h2>
      <p className={css.text}>We will miss you!</p>
      <div className={css.btnGroup}>
        <button className={css.logoutBtn} onClick={handleLogout}>
          Log out
        </button>
        <button className={css.cancelBtn} onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default SignOutModal;

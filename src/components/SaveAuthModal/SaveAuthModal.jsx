import Modal from "react-modal";
import css from "./SaveAuthModal.module.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");

const SaveAuthModal = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onRequestClose();
    navigate("/auth/login");
  };

  const handleRegister = () => {
    onRequestClose();
    navigate("/auth/register");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={css.overlay}
      className={css.modal}
    >
      <button className={css.closeBtn} onClick={onRequestClose}>
        <IoClose size={24} />
      </button>
      <p className={css.title}>Error while saving</p>
      <p className={css.subtitle}>
        To save this recipe, you need to <br />
        authorize first
      </p>
      <div className={css.buttons}>
        <button className={css.loginBtn} onClick={handleLogin}>
          Log in
        </button>
        <button className={css.registerBtn} onClick={handleRegister}>
          Register
        </button>
      </div>
    </Modal>
  );
};

export default SaveAuthModal;

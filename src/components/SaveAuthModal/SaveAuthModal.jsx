import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import css from "./SaveAuthModal.module.css";

export default function SaveAuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={css.dialog} onClose={onClose}>
        <div className={css.overlay} />
        <div className={css.wrapper}>
          <Dialog.Panel className={css.panel}>
            <button onClick={onClose} className={css.closeBtn}>
              <XMarkIcon className={css.icon} />
            </button>
            <Dialog.Title className={css.title}>
              Error while saving
            </Dialog.Title>
            <Dialog.Description className={css.text}>
              To save this recipe, you need to authorize first
            </Dialog.Description>
            <div className={css.actions}>
              <button
                className={`${css.btn} ${css.outline}`}
                onClick={handleLogin}
              >
                Log in
              </button>
              <button
                className={`${css.btn} ${css.primary}`}
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

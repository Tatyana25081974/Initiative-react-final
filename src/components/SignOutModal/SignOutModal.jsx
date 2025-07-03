import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./SignOutModal.module.css";

const modalRoot = document.getElementById("modal-root");

export default function SignOutModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 6L18 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h2 className={css.title}>Are you sure?</h2>
        <p className={css.subtitle}>We will miss you!</p>
        <div className={css.actions}>
          <button className={`${css.btn} ${css.logout}`} onClick={onConfirm}>
            Log out
          </button>
          <button className={`${css.btn} ${css.cancel}`} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

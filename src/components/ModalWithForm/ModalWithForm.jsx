import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  submitText,
  altText,
  onAltClick,
  isSubmitDisabled,
  children,
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />

        <h2 className="modal__title">{title}</h2>

        <form
          className={`modal__form modal__form_type_${name}`}
          onSubmit={onSubmit}
        >
          {children}

          <button
            type="submit"
            className={`modal__submit ${
              isSubmitDisabled ? "modal__submit_disabled" : ""
            }`}
            disabled={isSubmitDisabled}
          >
            {submitText}
          </button>

          {altText && (
            <p className="modal__alt-text">
              or{" "}
              <button
                type="button"
                className="modal__alt-button"
                onClick={onAltClick}
              >
                {altText}
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

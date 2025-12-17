import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container modal__container_success">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        />
        <h2 className="modal__title modal__title_success">
          Registration successfully completed!
        </h2>
        <button
          type="button"
          className="modal__link modal__link_success"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;

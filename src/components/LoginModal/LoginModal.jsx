import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showEmailError = emailTouched && email.trim() !== "" && !isEmailValid;

  const isFormValid = isEmailValid && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password });
    }
  };

  const handleSwitchModal = () => {
    setEmail("");
    setPassword("");
    setEmailTouched(false);
    onSwitchToRegister();
  };

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign in"
      altText="Sign up"
      onAltClick={handleSwitchModal}
      isSubmitDisabled={!isFormValid}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
        />
        {showEmailError && (
          <span className="modal__input-error">Invalid email address</span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;

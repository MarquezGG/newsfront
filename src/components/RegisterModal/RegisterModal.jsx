import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isFormValid =
    email.trim() !== "" && password.length >= 8 && name.length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegister) {
      onRegister({ email, password, name });
    }
  };

  const handleSwitchModal = () => {
    setEmail("");
    setPassword("");
    setName("");
    onSwitchToLogin();
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign up"
      altText="Sign in"
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
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

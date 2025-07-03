import "./App.css";
import { useState, useRef } from "react";

export const App = () => {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [state, setState] = useState(initialState);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const getState = () => state;
  const { email, password, confirmPassword } = getState();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const submitButtonRef = useRef(null);
  const resetState = () => {
    setState(initialState);
  };
  const updateState = (fieldName, fieldValue) => {
    setState({ ...state, [fieldName]: fieldValue });
  };

  const onChange = ({ target }) => {
    updateState(target.name, target.value);
    if (
      target.value.length > 0 &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      submitButtonRef.current.focus();
    }
  };

  const onBlur = () => {
    if (!regex.test(email)) {
      setEmailError("Некорректный email");
    } else if (password !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Пароли не совпадают ");
    } else {
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(getState());
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      {emailError && <div className="error">{emailError}</div>}
      {passwordError && <div className="error">{passwordError}</div>}
      {confirmPasswordError && (
        <div className="error">{confirmPasswordError}</div>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="emailInput"
        onChange={onChange}
        onBlur={onBlur}
        // required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        className="passwordInput"
        onChange={onChange}
        onBlur={onBlur}
        // required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        value={confirmPassword}
        className="confirmPasswordInput"
        onChange={onChange}
        onBlur={onBlur}
        // required
      />
      <button
        type="submit"
        className="button"
        ref={submitButtonRef}
        disabled={emailError || passwordError || confirmPasswordError}
      >
        Зарегистрироваться
      </button>
      <button type="reset" className="button" onClick={resetState}>
        Сбросить
      </button>
    </form>
  );
};

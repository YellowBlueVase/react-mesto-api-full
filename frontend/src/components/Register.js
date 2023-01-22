import {useState} from "react";
import { Link, withRouter } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((inputData) => ({ ...inputData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(inputData.password, inputData.email)
  }

  return (
    <form
      className={`form-container form-container_dark`}
      onSubmit={handleSubmit}
    >
      <h2 className="form-container__title form-container__title_dark">
        Регистрация
      </h2>
      <input
        id="form-container__input_email"
        type="text"
        name="email"
        placeholder="Email"
        required
        minLength="2"
        maxLength="200"
        className="form-container__input form-container__input_email"
        value={inputData.email || ""}
        onChange={handleChange}
      />
      <input
        id="form-container__input_password"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        minLength="2"
        maxLength="200"
        className="form-container__input form-container__input_password"
        value={inputData.password || ""}
        onChange={handleChange}
      />
      <button
        type="submit"
        name="submit"
        className="form-container__submit form-container__submit_dark"
      >
        Зарегистрироваться
      </button>
      <div className="register__signin">
        <Link to="/signin" className="register__signin__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  );
};

export default withRouter(Register);

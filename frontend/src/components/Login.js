import {useState} from 'react';
import { withRouter } from 'react-router-dom';

const Login = ({onLogin}) => {
    const [inputData, setInputData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setInputData((inputData) => ({...inputData, [name]: value}));
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!inputData.email || !inputData.password){
          return;
        };
        onLogin(inputData.password, inputData.email)
    } 

    return (
        <form
          className={`form-container form-container_dark`}
          onSubmit={handleSubmit}
        >
            <h2 className="form-container__title form-container__title_dark">Вход</h2>
            <input
                id="form-container__input_email"
                type="text"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="200"
                className="form-container__input form-container__input_email"
                value={inputData.email || ''}
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
                value={inputData.password || ''}
                onChange={handleChange}
                />
            <button
                type="submit"
                name="submit"
                className="form-container__submit form-container__submit_dark">
                Войти
            </button>
        </form>
    )
}

export default withRouter(Login);
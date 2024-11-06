import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import loginImage from '../images/registration.png';
import eyeClosedIcon from '../images/eye-closed.svg';
import eyeOpenedIcon from '../images/eye-opened.svg';
import { login } from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');  // Замінили email на username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(username, password);  // Використовуємо username замість email
            navigate('/');
        } catch (err) {
            setError('Невірний username або пароль');  // Змінено на username
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <div className="login__container">
                <Link to="/" className="login__logo">
                    <img className="login__logo-img" src={logo} alt="logo" />
                </Link>
                
                <h3 className="login__title">Вхід</h3>

                <div className="login__content">
                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="login-form__item">
                            <label htmlFor="username" className="login-form__label">
                                Ім'я користувача
                            </label>
                            <input 
                                type="text"  // Замінили тип на text для username
                                id="username"
                                className="login-form__input" 
                                placeholder="vitalikostrovskyi"
                                value={username}  // Використовуємо username
                                onChange={(e) => setUsername(e.target.value)}  // Змінюємо на username
                            />
                        </div>

                        <div className="login-form__item">
                            <label 
                                htmlFor="password" 
                                className="login-form__label"
                            >
                                Пароль
                            </label>
                            <div className="login-form__password-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="login-form__input" 
                                    placeholder="password"
                                    value={password}  // Додаємо зв'язок для пароля
                                    onChange={(e) => setPassword(e.target.value)}  // Додаємо onChange для пароля
                                />
                                <button 
                                    type="button"
                                    className="login-form__password-toggle"
                                    aria-label="Toggle password visibility"
                                    onClick={togglePasswordVisibility}
                                >
                                    <img 
                                        src={showPassword ? eyeOpenedIcon : eyeClosedIcon}
                                        alt="toggle password visibility"
                                        className="login-form__eye-icon"
                                        width="60"
                                        height="60"
                                    />
                                </button>
                            </div>
                        </div>

                        <Link to="/forgot-password" className="login-form__forgot-link">
                            Забули пароль?
                        </Link>

                        <div className="btn-wrapper">
                            <button type="submit" className="login-form__btn">
                                Увійти
                            </button>
                        </div>
                    </form>

                    <img 
                        src={loginImage} 
                        alt="Login" 
                        className="login__img" 
                    />
                </div>

                <div className="login__account-check">
                    <span className="login__account-text">
                        Не маєте акаунту?
                    </span>
                    <Link to="/registration" className="login__register-link">
                        Зареєструватися
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
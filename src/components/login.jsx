import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import loginImage from '../images/registration.png';
import eyeClosedIcon from '../images/eye-closed.svg';
import eyeOpenedIcon from '../images/eye-opened.svg';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        <div className="login-form__item">
                            <label 
                                htmlFor="email" 
                                className="login-form__label"
                            >
                                Електронна пошта
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                className="login-form__input" 
                                placeholder="example@gmail.com"
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
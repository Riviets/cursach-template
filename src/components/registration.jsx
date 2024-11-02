import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import registration from '../images/registration.png';
import eyeClosedIcon from '../images/eye-closed.svg';
import eyeOpenedIcon from '../images/eye-opened.svg';

function RegistrationStepOne() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleContinue = (e) => {
        e.preventDefault();
        navigate('/registration/step-two');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="registration__content">
            <div className="registration__form-container">
                <form className="registration-form" onSubmit={handleContinue}>
                    <div className="registration-form__item">
                        <label htmlFor="email" className="registration-form__label">
                            Електронна пошта
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            className="registration-form__input" 
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div className="registration-form__item">
                        <label htmlFor="password" className="registration-form__label">
                            Пароль
                        </label>
                        <div className="registration-form__password-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="registration-form__input" 
                                placeholder="password"
                            />
                            <button 
                                type="button"
                                className="registration-form__password-toggle"
                                aria-label="Toggle password visibility"
                                onClick={togglePasswordVisibility}
                            >
                                <img 
                                    src={showPassword ? eyeOpenedIcon : eyeClosedIcon}
                                    alt="toggle password visibility"
                                    className="registration-form__eye-icon"
                                    width="60"
                                    height="60"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="registration-form__item">
                        <label htmlFor="nickname" className="registration-form__label">
                            Псевдонім
                        </label>
                        <input 
                            type="text" 
                            id="nickname"
                            className="registration-form__input" 
                            placeholder="Ivan"
                        />
                    </div>
                    <div className="btn-wrapper">
                        <button type="submit" className="registration-form__btn">
                            Продовжити
                        </button>
                    </div>
                </form>
            </div>
            <div className="registration__image-container">
                <img src={registration} alt="Registration" className="registration__img" />
            </div>
        </div>
    );
}

function RegistrationStepTwo() {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
    };

    const handleBack = () => {
        navigate('/registration');
    };

    return (
        <div className="registration__content">
            <div className="registration__form-container">
                <form className="registration-form" onSubmit={handleRegister}>
                    <div className="registration-form__item">
                        <label htmlFor="name" className="registration-form__label">Ім'я</label>
                        <input 
                            type="text" 
                            id="name"
                            className="registration-form__input" 
                            placeholder="Іван"
                        />
                    </div>
                    <div className="registration-form__item">
                        <label htmlFor="surname" className="registration-form__label">Прізвище</label>
                        <input 
                            type="text" 
                            id="surname"
                            className="registration-form__input" 
                            placeholder="Крутий"
                        />
                    </div>
                    <div className="registration-form__item">
                        <label htmlFor="phone" className="registration-form__label">Телефон</label>
                        <input 
                            type="tel" 
                            id="phone"
                            className="registration-form__input" 
                            placeholder="+380991234567"
                        />
                    </div>
                    <div className="registration-form__buttons">
                        <button type="button" onClick={handleBack} className="registration-form__btn--back">
                            Назад
                        </button>
                        <button type="submit" className="registration-form__btn">
                            Зареєструватися
                        </button>
                    </div>
                </form>
            </div>
            <div className="registration__image-container">
                <img src={registration} alt="Registration" className="registration__img" />
            </div>
        </div>
    );
}

function Registration() {
    return (
        <div className="registration">
            <div className="registration__container">
                <Link to="/" className="registration__logo">
                    <img className="registration__logo-img" src={logo} alt="logo" />
                </Link>
                <h3 className="registration__title">Реєстрація</h3>
                <Routes>
                    <Route index element={<RegistrationStepOne />} />
                    <Route path="step-two" element={<RegistrationStepTwo />} />
                </Routes>
                <div className="registration__account-check">
                    <span className="registration__account-text">Вже є акаунт?</span>
                    <Link to="/login" className="registration__login-link">Вхід</Link>
                </div>
            </div>
        </div>
    );
}

export default Registration;
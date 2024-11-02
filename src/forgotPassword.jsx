import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './images/logo.svg';
import bellNotification from './images/bell-notification.png';
import shieldLock from './images/shield-lock.png';
import emailIcon from './images/email-icon.png';

function EmailStep() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/forgot-password/verification');
    };

    return (
        <div className="forgot-password__content">
            <div className="forgot-password__form-container">
                <form className="forgot-form" onSubmit={handleSubmit}>
                    <div className="forgot-form__item">
                        <label 
                            htmlFor="email" 
                            className="forgot-form__label"
                        >
                            Електронна пошта
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            className="forgot-form__input" 
                            placeholder="example@gmail.com"
                        />
                        <p className="forgot-form__hint">
                            Ми надішлемо код на вказану пошту
                        </p>
                    </div>
                    <div className="btn-wrapper">
                        <button type="submit" className="forgot-form__btn">
                            Надіслати
                        </button>
                    </div>
                </form>
            </div>
            <div className="forgot-password__image-container">
                <img 
                    src={emailIcon} 
                    alt="Enter Email" 
                    className="forgot-password__img" 
                />
            </div>
        </div>
    );
}

function VerificationStep() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/forgot-password/reset');
    };

    return (
        <div className="forgot-password__content">
            <div className="forgot-password__form-container">
                <form className="forgot-form" onSubmit={handleSubmit}>
                    <div className="forgot-form__item">
                        <label 
                            htmlFor="code" 
                            className="forgot-form__label"
                        >
                            Код підтвердження
                        </label>
                        <input 
                            type="text" 
                            id="code"
                            className="forgot-form__input" 
                            placeholder="123456"
                        />
                    </div>
                    <div className="btn-wrapper">
                        <button type="submit" className="forgot-form__btn">
                            Надіслати
                        </button>
                    </div>
                </form>
            </div>
            <div className="forgot-password__image-container">
                <img 
                    src={bellNotification} 
                    alt="Verification Code" 
                    className="forgot-password__img" 
                />
            </div>
        </div>
    );
}

function ResetStep() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="forgot-password__content">
            <div className="forgot-password__form-container">
                <form className="forgot-form" onSubmit={handleSubmit}>
                    <div className="forgot-form__item">
                        <label 
                            htmlFor="newPassword" 
                            className="forgot-form__label"
                        >
                            Введіть новий пароль
                        </label>
                        <input 
                            type="password" 
                            id="newPassword"
                            className="forgot-form__input" 
                            placeholder="newPassword"
                        />
                    </div>
                    <div className="forgot-form__item">
                        <label 
                            htmlFor="confirmPassword" 
                            className="forgot-form__label"
                        >
                            Підтвердіть пароль
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            className="forgot-form__input" 
                            placeholder="newPassword"
                        />
                    </div>
                    <div className="btn-wrapper">
                        <button type="submit" className="forgot-form__btn">
                            Надіслати
                        </button>
                    </div>
                </form>
            </div>
            <div className="forgot-password__image-container">
                <img 
                    src={shieldLock} 
                    alt="Reset Password" 
                    className="forgot-password__img" 
                />
            </div>
        </div>
    );
}

function ForgotPassword() {
    const getTitle = () => {
        const path = window.location.pathname;
        if (path === '/forgot-password' || path === '/forgot-password/verification') {
            return 'Забули пароль?';
        }
        return 'Скидання паролю';
    };

    return (
        <div className="forgot-password">
            <div className="forgot-password__container">
                <Link to="/" className="forgot-password__logo">
                    <img className="forgot-password__logo-img" src={logo} alt="logo" />
                </Link>
                <h3 className="forgot-password__title">{getTitle()}</h3>
                <Routes>
                    <Route index element={<EmailStep />} />
                    <Route path="verification" element={<VerificationStep />} />
                    <Route path="reset" element={<ResetStep />} />
                </Routes>
            </div>
        </div>
    );
}

export default ForgotPassword;
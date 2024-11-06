import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import logo from '../images/logo.svg';
import registration from '../images/registration.png';
import eyeClosedIcon from '../images/eye-closed.svg';
import eyeOpenedIcon from '../images/eye-opened.svg';

function RegistrationStepOne() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        username: ''
    });

    const handleContinue = (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.password2) {
            alert('Паролі не співпадають');
            return;
        }

        // Store first step data in localStorage
        localStorage.setItem('registrationStep1', JSON.stringify(formData));
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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                        <label htmlFor="password2" className="registration-form__label">
                            Підтвердження паролю
                        </label>
                        <input 
                            type="password" 
                            id="password2"
                            className="registration-form__input" 
                            placeholder="Confirm password"
                            value={formData.password2}
                            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                        />
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
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        role: 'student' // Default role
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const step1Data = JSON.parse(localStorage.getItem('registrationStep1'));
            const userData = {
                ...step1Data,
                password1: step1Data.password,
                password2: step1Data.password2,
                ...formData,
                profile_image_url: ''
            };
            const response = await register(userData);

            localStorage.removeItem('registrationStep1');
            navigate('/login');
        } catch (err) {
            setIsSubmitting(false);
            const errorData = err?.response?.data || {};
            setErrors(errorData.errors || {});
        }
    };

    const handleBack = () => {
        navigate('/registration');
    };

    return (
        <div className="registration__content">
            <div className="registration__form-container">
                <form className="registration-form" onSubmit={handleRegister}>
                    <div className="registration-form__item">
                        <label htmlFor="first_name" className="registration-form__label">Ім'я</label>
                        <input 
                            type="text" 
                            id="first_name"
                            className="registration-form__input" 
                            placeholder="Іван"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        />
                        {errors.first_name && <p className="error-message">{errors.first_name[0]}</p>}
                    </div>
                    <div className="registration-form__item">
                        <label htmlFor="last_name" className="registration-form__label">Прізвище</label>
                        <input 
                            type="text" 
                            id="last_name"
                            className="registration-form__input" 
                            placeholder="Крутий"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        />
                        {errors.last_name && <p className="error-message">{errors.last_name[0]}</p>}
                    </div>
                    <div className="registration-form__item">
                        <label htmlFor="phone_number" className="registration-form__label">Телефон</label>
                        <input 
                            type="tel" 
                            id="phone_number"
                            className="registration-form__input" 
                            placeholder="+380991234567"
                            value={formData.phone_number}
                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        />
                        {errors.phone_number && <p className="error-message">{errors.phone_number[0]}</p>}
                    </div>

                    <div className="registration-form__buttons">
                        <button type="button" onClick={handleBack} className="registration-form__btn--back">
                            Назад
                        </button>
                        <button type="submit" className="registration-form__btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Зачекайте...' : 'Зареєструватися'}
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

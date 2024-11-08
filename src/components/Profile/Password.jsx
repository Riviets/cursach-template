// components/Profile/Password.jsx

import React, { useState } from 'react';
import { changePassword } from '../../services/api/userApi';

function Password() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      setMessage('Нові паролі не співпадають');
      return;
    }

    try {
      await changePassword(currentPassword, newPassword, newPasswordConfirm);
      setMessage('Пароль успішно змінено');
    } catch (error) {
      setMessage('Помилка при зміні паролю');
    }
  };

  return (
    <div className="profile-item">
      <h2 className="profile-item__title title">Змінити пароль</h2>
      {message && <p>{message}</p>}
      <form className="profile-item__form" onSubmit={handleChangePassword}>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="password">
            Введіть поточний пароль
          </label>
          <input
            className="profile-item__form-input input"
            id="password"
            type="password"
            placeholder="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="new-password">
            Введіть новий пароль
          </label>
          <input
            className="profile-item__form-input input"
            id="new-password"
            type="password"
            placeholder="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="new-password-confirm">
            Повторіть новий пароль
          </label>
          <input
            className="profile-item__form-input input"
            id="new-password-confirm"
            type="password"
            placeholder="newPassword"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn profile-item__form-btn">
          Зберегти зміни
        </button>
      </form>
    </div>
  );
}

export default Password;

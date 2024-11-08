// components/Profile/Contacts.jsx

import React, { useState, useEffect } from 'react';
import { updateUserProfile, getUserById } from '../../services/api/userApi';
import { useSelector } from 'react-redux';

function Contacts() {
  const user = useSelector((state) => state.user.user);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserById(user.id);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
      } catch (error) {
        console.error('Не вдалося завантажити дані користувача:', error);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user.id, { email, phone_number: phoneNumber });
      setMessage('Зміни успішно збережено');
    } catch (error) {
      setMessage('Помилка при збереженні змін');
    }
  };

  return (
    <div className="profile-item">
      <h2 className="profile-item__title title">Контакти</h2>
      {message && <p>{message}</p>}
      <form className="profile-item__form" onSubmit={handleSaveChanges}>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="phone">
            Телефон
          </label>
          <input
            className="profile-item__form-input input"
            id="phone"
            placeholder="+380994832485"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="email">
            Електронна пошта
          </label>
          <input
            className="profile-item__form-input input"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn profile-item__form-btn">
          Зберегти зміни
        </button>
      </form>
    </div>
  );
}

export default Contacts;

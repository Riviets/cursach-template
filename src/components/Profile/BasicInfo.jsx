// components/Profile/BasicInfo.jsx

import React, { useState, useEffect } from 'react';
import { getUserById, updateUserProfile, uploadProfileImage } from '../../services/api/userApi';
import { useSelector } from 'react-redux';

function BasicInfo() {
  const user = useSelector((state) => state.user.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserById(user.id);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setUsername(data.username);
        setProfileImageUrl(data.profile_image_url);
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
      await updateUserProfile(user.id, {
        first_name: firstName,
        last_name: lastName,
        username,
      });
      setMessage('Зміни успішно збережено');
    } catch (error) {
      setMessage('Помилка при збереженні змін');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profile_image', file);
        const data = await uploadProfileImage(user.id, formData);
        setProfileImageUrl(data.profile_image_url);
        setMessage('Фотографію успішно оновлено');
      } catch (error) {
        setMessage('Помилка при завантаженні фотографії');
      }
    }
  };

  return (
    <div className="profile-item">
      <h2 className="profile-item__title title">Інформація</h2>
      {message && <p>{message}</p>}
      <div className="change-pfp">
        <img className="change-pfp__img" alt="pfp" src={profileImageUrl || 'default_profile_image_url'} />
        <div className="change-pfp__content">
          <p className="change-pfp__text">Завантажте вашу фотографію...</p>
          <input
            className="change-pfp__btn"
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="change-pfp__btn" onClick={() => document.getElementById('file-upload').click()}>
            Вибрати файл
          </button>
        </div>
      </div>
      <form className="profile-item__form" onSubmit={handleSaveChanges}>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="first-name">
            Ім'я
          </label>
          <input
            className="profile-item__form-input input"
            id="first-name"
            placeholder="Іван"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="last-name">
            Прізвище
          </label>
          <input
            className="profile-item__form-input input"
            id="last-name"
            placeholder="Круглий"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="profile-item__form-item">
          <label className="profile-item__form-label" htmlFor="username">
            Псевдонім
          </label>
          <input
            className="profile-item__form-input input"
            id="username"
            placeholder="Ivan"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" className="btn profile-item__form-btn">
          Зберегти зміни
        </button>
      </form>
    </div>
  );
}

export default BasicInfo;

import React, { useState, useEffect } from 'react';
import { getUserById, updateUserProfile, uploadProfileImage } from '../../services/api/userApi';
import { User } from 'lucide-react';

function BasicInfo() {
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Initial userData from localStorage:', storedUser);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const userId = userData?.id;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (!userId) {
          console.log('No user ID found');
          return;
        }

        setLoading(true);
        console.log('Fetching user data for ID:', userId);
        const response = await getUserById(userId);
        console.log('API Response:', response);

        if (response && response.data) {
          const userDataFromApi = response.data;
          console.log('Setting user data:', userDataFromApi);
          setUserData(userDataFromApi);

          localStorage.setItem('user', JSON.stringify(userDataFromApi));
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setMessage('Помилка завантаження даних користувача');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      if (!userId || !userData) return;

      const updatedData = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        phone_number: userData.phone_number,
        profile_image_url: userData.profile_image_url,
      };

      console.log('Sending update with data:', updatedData);
      const response = await updateUserProfile(userId, updatedData);

      if (response && response.data) {
        const updatedUserData = response.data;
        console.log('Received updated user data:', updatedUserData);
        
        setUserData(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        setMessage('Зміни успішно збережено');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      setMessage('Помилка при збереженні змін');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      try {
        const formData = new FormData();
        formData.append('profile_image', file);
        
        console.log('Uploading file for user:', userId);
        const response = await uploadProfileImage(userId, formData);
        console.log('Upload response:', response);

        if (response && response.data && response.data.profile_image_url) {
          const newImageUrl = response.data.profile_image_url;
          console.log('New image URL:', newImageUrl);

          // Оновлюємо дані користувача з новим URL зображення
          setUserData(prev => ({
            ...prev,
            profile_image_url: newImageUrl
          }));

          // Оновлюємо localStorage
          const currentUser = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem('user', JSON.stringify({
            ...currentUser,
            profile_image_url: newImageUrl
          }));

          setMessage('Фотографію успішно оновлено');

          // Оновлюємо всі дані користувача після завантаження фото
          const updatedUserData = await getUserById(userId);
          if (updatedUserData && updatedUserData.data) {
            setUserData(updatedUserData.data);
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setMessage('Помилка при завантаженні фотографії');
      }
    }
  };

  const handleInputChange = (field) => (e) => {
    setUserData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  if (loading && !userData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

    return (
      <div className="profile-item">
          <h2 className="profile-item__title title">Інформація</h2>
          {message && (
              <p className={`message ${message.includes('успішно') ? 'success' : 'error'}`}>
                  {message}
              </p>
          )}
          
          <div className="change-pfp">
              <div className="change-pfp__content">
                  <p className="change-pfp__text">Змінити фото профіля</p>
                  <input
                      type="file"
                      id="file-upload"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept="image/*"
                  />
                  <button 
                      className="change-pfp__btn"
                      type="button"
                      onClick={() => document.getElementById('file-upload').click()}
                  >
                      Вибрати файл
                  </button>
              </div>
          </div>

          <form className="profile-item__form" onSubmit={handleSaveChanges}>
              <div className="profile-item__section">
                  <div className="profile-item__form-item">
                      <label className="profile-item__form-label" htmlFor="first-name">
                          Ім'я
                      </label>
                      <input
                          className="profile-item__form-input input"
                          id="first-name"
                          placeholder="Введіть ім'я"
                          value={userData?.first_name || ''}
                          onChange={handleInputChange('first_name')}
                      />
                  </div>

                  <div className="profile-item__form-item">
                      <label className="profile-item__form-label" htmlFor="last-name">
                          Прізвище
                      </label>
                      <input
                          className="profile-item__form-input input"
                          id="last-name"
                          placeholder="Введіть прізвище"
                          value={userData?.last_name || ''}
                          onChange={handleInputChange('last_name')}
                      />
                  </div>

                  <div className="profile-item__form-item">
                      <label className="profile-item__form-label" htmlFor="username">
                          Псевдонім
                      </label>
                      <input
                          className="profile-item__form-input input"
                          id="username"
                          placeholder="Введіть псевдонім"
                          value={userData?.username || ''}
                          onChange={handleInputChange('username')}
                      />
                  </div>
              </div>

              <div className="profile-item__section">
                  <div className="profile-item__form-item">
                      <label className="profile-item__form-label" htmlFor="phone">
                          Телефон
                      </label>
                      <input
                          className="profile-item__form-input input"
                          id="phone"
                          placeholder="Введіть номер телефону"
                          value={userData?.phone_number || ''}
                          onChange={handleInputChange('phone_number')}
                      />
                  </div>
                  
                  <div className="profile-item__form-item">
                      <label className="profile-item__form-label" htmlFor="email">
                          Електронна пошта
                      </label>
                      <input
                          className="profile-item__form-input input"
                          id="email"
                          type="email"
                          placeholder="Введіть email"
                          value={userData?.email || ''}
                          onChange={handleInputChange('email')}
                          readOnly
                      />
                  </div>
              </div>

              <button type="submit" className="btn profile-item__form-btn">
                  Зберегти зміни
              </button>
          </form>
      </div>
  );
}

export default BasicInfo;
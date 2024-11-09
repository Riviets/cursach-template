// components/Profile/Contacts.jsx
import React, { useState, useEffect } from 'react';
import { updateUserProfile, getUserById } from '../../services/api/userApi';

function Contacts() {
    const [userData, setUserData] = useState(() => {
        const storedUser = localStorage.getItem('user');
        console.log('Initial userData from localStorage:', storedUser);
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    
    // Отримуємо ID користувача
    const userId = userData?.id || JSON.parse(localStorage.getItem('user'))?.id;

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
                
                if (response.data) {
                    setUserData(response.data);
                } else {
                    console.error('No data in response');
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
            if (!userId) return;

            const response = await updateUserProfile(userId, {
                email: userData.email,
                phone_number: userData.phone_number
            });
            
            if (response.data) {
                setUserData(response.data);
                setMessage('Зміни успішно збережено');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
            setMessage('Помилка при збереженні змін');
        }
    };

    const handleInputChange = (field) => (e) => {
        setUserData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="profile-item">
            <h2 className="profile-item__title title">Контакти</h2>
            {message && (
                <p className={`message ${message.includes('успішно') ? 'success' : 'error'}`}>
                    {message}
                </p>
            )}
            
            <form className="profile-item__form" onSubmit={handleSaveChanges}>
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

                <button type="submit" className="btn profile-item__form-btn">
                    Зберегти зміни
                </button>
            </form>
        </div>
    );
}

export default Contacts;
// components/Profile/AsideMenu.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout, getUserById } from '../../services/api/userApi';
import { User } from 'lucide-react';

function AsideMenu() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const [showPlaceholder, setShowPlaceholder] = useState(false);
    const [userData, setUserData] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userId = userData?.id;
                if (userId) {
                    const response = await getUserById(userId);
                    if (response.data) {
                        setUserData(response.data);
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, [userData?.id]);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        navigate('/');
    };

    const toggleModal = () => {
        setShowModal(!showModal);
        setActiveItem(prev => prev === 'logout' ? '' : 'logout');
    };

    const handleNavLinkClick = (path) => {
        setActiveItem(path);
        setShowModal(false);
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
        setShowPlaceholder(true);
    };

    return (
        <div className="profile-aside">
            <div className="profile-aside__user">
               
                    {!showPlaceholder && userData?.profile_image_url ? (
                        <img 
                            className="profile-img" 
                            src={userData.profile_image_url} 
                            alt="Profile" 
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="profile-aside__avatar-placeholder">
                            <User size={24} className="text-gray-400" />
                        </div>
                    )}
                </div>
                <div className="profile-aside__user-info">
                    <p className="profile-aside__username">
                        {userData?.username || 'Користувач'}
                    </p>
                    {userData?.email && (
                        <p className="profile-aside__email">{userData.email}</p>
                    )}
              
            </div>
            
            <nav className="profile-aside__nav">
                <ul className="profile-aside__menu">
                    <li className="profile-aside__menu-item">
                        <NavLink
                            to="/profile/basic-info"
                            className={({ isActive }) =>
                                `profile-aside__menu-link ${isActive && activeItem !== 'logout' ? 'active' : ''}`
                            }
                            onClick={() => handleNavLinkClick('basic-info')}
                        >
                            Основна інформація
                        </NavLink>
                    </li>
                    <li className="profile-aside__menu-item">
                        <NavLink
                            to="/profile/password"
                            className={({ isActive }) =>
                                `profile-aside__menu-link ${isActive && activeItem !== 'logout' ? 'active' : ''}`
                            }
                            onClick={() => handleNavLinkClick('password')}
                        >
                            Пароль
                        </NavLink>
                    </li>
                    <li className="profile-aside__menu-item">
                        <NavLink
                            to="/profile/payments"
                            className={({ isActive }) =>
                                `profile-aside__menu-link ${isActive && activeItem !== 'logout' ? 'active' : ''}`
                            }
                            onClick={() => handleNavLinkClick('payments')}
                        >
                            Способи оплати
                        </NavLink>
                    </li>
                    <li className="profile-aside__menu-item">
                        <button
                            className={`profile-aside__menu-link profile-aside__logout-btn ${
                                activeItem === 'logout' ? 'active' : ''
                            }`}
                            onClick={toggleModal}
                        >
                            Вийти з аккаунту
                        </button>
                    </li>
                </ul>
            </nav>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text">Ви дійсно хочете вийти з аккаунту?</p>
                        <div className="modal-buttons">
                            <button onClick={handleLogout} className="modal-btn confirm-btn">
                                Так
                            </button>
                            <button onClick={toggleModal} className="modal-btn cancel-btn">
                                Ні
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AsideMenu;
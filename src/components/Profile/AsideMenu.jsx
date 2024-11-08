// components/Profile/AsideMenu.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api/userApi';
import pfp from '../../images/pfp.jpg';

function AsideMenu() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setActiveItem('logout');
    } else {
      setActiveItem('');
    }
  };

  const handleNavLinkClick = (path) => {
    setActiveItem(path);
    setShowModal(false);
  };

  return (
    <div className="profile-aside">
      <div className="pfp">
        <img className="pfp-img" src={pfp} alt="pfp" />
        <p className="pfp-name">Name</p>
      </div>
      <ul className="profile-aside__menu">
        <li className="profile-aside__menu-item">
          <NavLink
            to="/profile/basic-info"
            className={({ isActive }) =>
              isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
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
              isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
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
              isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
            }
            onClick={() => handleNavLinkClick('payments')}
          >
            Способи оплати
          </NavLink>
        </li>
        <li className="profile-aside__menu-item">
          <NavLink
            to="/profile/contacts"
            className={({ isActive }) =>
              isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
            }
            onClick={() => handleNavLinkClick('contacts')}
          >
            Контакти
          </NavLink>
        </li>
        <li className="profile-aside__menu-item">
          <div className="profile-aside__logout">
            <button
              className={`profile-aside__menu-link profile-aside__logout-btn ${activeItem === 'logout' ? 'active' : ''}`}
              onClick={toggleModal}
            >
              Вийти з аккаунту
            </button>
          </div>
        </li>
      </ul>

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

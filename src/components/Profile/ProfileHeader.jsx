// components/Profile/ProfileHeader.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import settings from '../../images/settings.svg';

function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="container">
        <div className="profile-header__inner">
          <Link to="/" className="logo">
            <img className="logo-img" src={logo} alt="logo" />
          </Link>
          <img className="profile-header__img" src={settings} alt="settings" />
          <p className="profile-header__text">Профіль</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

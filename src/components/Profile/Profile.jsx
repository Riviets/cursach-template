// components/Profile/Profile.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import AsideMenu from './AsideMenu';
import '../../scss/styles.css';

function Profile() {
  return (
    <div className="profile">
      <ProfileHeader />
      <div className="profile-container">
        <div className="profile-content">
          <AsideMenu />
          <div className="profile-main">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

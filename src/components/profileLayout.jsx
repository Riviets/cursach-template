import React from 'react';
import { Outlet } from 'react-router-dom';

function ProfileLayout() {
  return (
    <div className="app">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default ProfileLayout;
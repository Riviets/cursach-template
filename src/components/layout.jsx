import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';

function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
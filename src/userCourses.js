import React from 'react';
import Header from './Header';
import MyCourses from './myCourses';
import Footer from './footer';

function UserCourses() {
  return (
    <div className="user-courses">
      <Header />
      <MyCourses />
      <Footer />
    </div>
  );
}

export default UserCourses;
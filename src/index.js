import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserCourses from './userCourses';
import AllCourses from './allCourses';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UserCourses />} />
        <Route path="/all-courses" element={<AllCourses />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
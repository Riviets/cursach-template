import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import EmptyLayout from './EmptyLayout';
import UserCourses from './userCourses';
import AllCourses from './allCourses';
import Profile, { BasicInfo, Password, Payments, Contacts } from './profile'; 
import Course from './course';
import Lesson from './lesson';
import Registration from './registration';
import Login from './login';
import ForgotPassword from './forgotPassword';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserCourses />} />
          <Route path="all-courses" element={<AllCourses />} />
          <Route path="courses/:id" element={<Course />} />
          <Route path="courses/:courseId/lessons/:lessonId" element={<Lesson />} />
        </Route>

        <Route path="/registration/*" element={<EmptyLayout />}>
          <Route path="*" element={<Registration />} />
        </Route>
        <Route path="/login" element={<EmptyLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/profile" element={<Profile />}>
          <Route path="basic-info" element={<BasicInfo />} />
          <Route path="password" element={<Password />} />
          <Route path="payments" element={<Payments />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
        <Route path="/forgot-password/*" element={<ForgotPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

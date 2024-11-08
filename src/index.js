import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './components/layout';
import EmptyLayout from './components/EmptyLayout';
import UserCourses from './components/userCourses';
import AllCourses from './components/allCourses';

import Profile from './components/Profile/Profile';
import BasicInfo from './components/Profile/BasicInfo';
import Password from './components/Profile/Password';
import Payments from './components/Profile/Payments';
import Contacts from './components/Profile/Contacts';

import Course from './components/Course/Course';

import Lesson from './components/lesson';
import Registration from './components/registration';
import Login from './components/login';
import ForgotPassword from './components/forgotPassword';
import CreateLesson from './components/createLesson';
import EditLesson from './components/editLesson';
import { store } from './state/store';
import AssignmentDetail from './components/Assigment/AssignmentDetail';

import Materials from './components/Materials/Materials';
import MaterialDetail from './components/Materials/MaterialDetail';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<UserCourses />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="courses/:id" element={<Course />} />
            <Route path="courses/:courseId/lessons/:lessonId" element={<Lesson />} />
            <Route path="create-lesson" element={<CreateLesson />} />
            <Route path="edit-lesson" element={<EditLesson />} />
            <Route path="/assignments/:assignmentId" element={<AssignmentDetail />} />
           
            <Route path="materials" element={<Materials />} />
            <Route path="materials/:materialId" element={<MaterialDetail />} />
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
    </Provider>
  </React.StrictMode>
);

// components/Course/Course.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../scss/styles.css';
import CourseDescription from './CourseDescription';
import CourseModules from './CourseModules';
import CourseTasks from './CourseTasks';

function Course() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <CourseDescription />;
      case 'modules':
        return <CourseModules />;
      case 'tasks':
        return <CourseTasks />;
      default:
        return <CourseDescription />;
    }
  };

  return (
    <div className='course-info'>
      <div className='container'>
        <nav className='course__nav'>
          <ul className='course__nav-list'>
            <li 
              className={`course__nav-item ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Опис
            </li>
            <li 
              className={`course__nav-item ${activeTab === 'modules' ? 'active' : ''}`}
              onClick={() => setActiveTab('modules')}
            >
              Заняття
            </li>
            <li 
              className={`course__nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Завдання
            </li>
          </ul>
        </nav>
        <div className='course__content'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Course;

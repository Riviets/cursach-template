import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../scss/styles.css';
import CourseDescription from './CourseDescription';
import CourseModules from './CourseModules';
import CourseTasks from './CourseTasks';
// import CourseParticipants from './CourseParticipants';
import { Link } from 'react-router-dom';

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
      // case 'participants':
      //   return <CourseParticipants courseId={id} />;
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
            <li className="course__nav-item"
             onClick={() => setActiveTab('participants')}>
              <Link className="nav-link" to="/materials">
                Матеріали
              </Link>
            </li>
            {/* <li 
              className={`course__nav-item ${activeTab === 'participants' ? 'active' : ''}`}
              onClick={() => setActiveTab('participants')}
            >
              Учасники
            </li> */}
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

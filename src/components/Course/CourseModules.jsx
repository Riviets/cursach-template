// components/Course/CourseModules.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchModulesByCourseId } from '../../services/api/courseApi';
import ModuleLessons from './ModuleLessons';

function CourseModules() {
  const { id: courseId } = useParams();
  const [expandedModules, setExpandedModules] = useState({});
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const data = await fetchModulesByCourseId(courseId);
        setModules(data);
      } catch (error) {
        console.error("Не вдалося завантажити модулі курсу:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [courseId]);

  const toggleModule = (moduleIndex) => {
    setExpandedModules((prevState) => ({
      ...prevState,
      [moduleIndex]: !prevState[moduleIndex],
    }));
  };

  if (loading) {
    return <p>Завантаження модулів...</p>;
  }

  return (
    <div className="course-modules">
      {modules.length === 0 ? (
        <p className='course-modules__not-found'>Модулів не знайдено.</p>
      ) : (
        <ul className="course-modules__list">
          {modules.map((module, index) => (
            <li key={module.id} className="course-modules__item">
              <div className="module">
                <div className="module__header">
                  <div className="module__info">
                    <span className="module__number">{module.title}</span>
                  </div>
                  <button
                    className="module__toggle"
                    onClick={() => toggleModule(index)}
                  >
                    {expandedModules[index] ? 'Згорнути' : 'Розгорнути'}
                  </button>
                </div>
                <div className="module__content">
                  <div className="module__description">
                    <p className='module__description-text'>{module.description}</p>
                  </div>
                  {expandedModules[index] && (
                    <ModuleLessons moduleId={module.id} />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseModules;

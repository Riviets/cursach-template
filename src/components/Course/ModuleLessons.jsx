// components/Course/ModuleLessons.jsx

import React, { useState, useEffect } from 'react';
import { fetchLessonsByModuleId } from '../../services/api/lessonApi';
import LessonItem from './LessonItem';

function ModuleLessons({ moduleId }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await fetchLessonsByModuleId(moduleId);
        setLessons(data);
      } catch (error) {
        console.error("Не вдалося завантажити уроки модуля:", error);
        setError("Не вдалося завантажити уроки");
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [moduleId]);

  if (loading) {
    return <p>Завантаження уроків...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <ul className="module__lessons">
      {lessons.map((lesson) => (
        <li key={lesson.id} className="module__lesson-item">
          <LessonItem lesson={lesson} />
        </li>
      ))}
    </ul>
  );
}

export default ModuleLessons;

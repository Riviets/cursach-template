// components/Course/LessonItem.jsx

import React from 'react';
import { Link, useParams } from 'react-router-dom';

function LessonItem({ lesson }) {
  const { id: courseId } = useParams(); // Отримуємо ID курсу з URL

  return (
    <Link 
      to={`/courses/${courseId}/lessons/${lesson.id}`} 
      className="lesson"
    >
      <div className='lesson__content'>
        <h3 className="lesson__name">{lesson.title}</h3>
        <div className="lesson__info">
          <span className="lesson__duration">
            Тривалість: {lesson.duration} хв.
          </span>
          {lesson.is_completed && (
            <span className="lesson__completed">
              ✓ Завершено
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default LessonItem;

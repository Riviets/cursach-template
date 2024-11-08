// components/Course/CourseDescription.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../../services/api/courseApi';

function CourseDescription() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourseData(data);
      } catch (error) {
        console.error("Не вдалося завантажити дані курсу:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (!courseData) {
    return <p>Курс не знайдено.</p>;
  }

  return (
    <div className='course-description'>
      <p className='course-description__category'>
        {courseData.categories.map(cat => cat.name).join(', ')}
      </p>
      <h2 className='course-description__title'>{courseData.title}</h2>
      <div className='course-description__content'>
        <p className='course-description__lessons'>{courseData.total_lessons} уроки</p>
        <p className='course-description__duration'>Тривалість: {courseData.duration} год.</p>
      </div>
      <p className='course-description__details'>{courseData.description}</p>
      <img className='course-description__img' src={courseData.image_url} alt='course image' />
    </div>
  );
}

export default CourseDescription;

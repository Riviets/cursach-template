import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { fetchCourseById, enrollInCourse, fetchUserCourses } from '../../services/api/courseApi';

function CourseDescription() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollMessage, setEnrollMessage] = useState('');
  const [userCourses, setUserCourses] = useState([]);

  const user = useSelector((state) => state.user);

  // Завантаження курсів користувача
  useEffect(() => {
    if (user.id) {
      const loadUserCourses = async () => {
        try {
          const data = await fetchUserCourses(user.id);
          setUserCourses(data.courses || []); // Список курсів користувача
        } catch (error) {
          console.error("Не вдалося отримати курси користувача:", error);
        }
      };

      loadUserCourses();
    }
  }, [user.id]);

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

  // Перевірка, чи користувач уже записаний на курс
  const isEnrolled = userCourses.some(course => course.id === parseInt(id));

  const handleEnroll = async () => {
    if (!user.id) {
      setEnrollMessage('Будь ласка, увійдіть, щоб записатися на курс.');
      return;
    }

    if (isEnrolled) {
      setEnrollMessage('Ви вже записані на цей курс.');
      return;
    }

    try {
      const response = await enrollInCourse({ course_id: parseInt(id), student_id: user.id });
      setEnrollMessage(response.message);
    } catch (error) {
      console.error('Помилка під час запису на курс:', error);
      setEnrollMessage('Не вдалося записатися на курс. Спробуйте ще раз.');
    }
  };

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
      <button 
        className={`course-description__btn ${isEnrolled ? 'course-description__btn--disabled' : ''}`} 
        onClick={handleEnroll} 
        disabled={isEnrolled}
      >
        {isEnrolled ? 'Записано' : 'Записатися'}
      </button>

      {enrollMessage && <p className='enroll-message'>{enrollMessage}</p>}
    </div>
  );
}

export default CourseDescription;

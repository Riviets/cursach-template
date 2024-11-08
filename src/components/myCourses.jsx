// components/myCourses.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserCourses } from '../services/api/courseApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import rating from '../images/rating.svg'; // Переконайтеся, що шлях правильний

function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector((state) => state.user?.id);

    useEffect(() => {
        const loadCourses = async () => {
            if (userId) {
                try {
                    const response = await fetchUserCourses(userId);
                    setCourses(response.courses || []); // Доступ до масиву курсів з відповіді
                } catch (error) {
                    console.error('Не вдалося отримати курси користувача:', error);
                    setError('Не вдалося завантажити курси');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError('Користувач не авторизований');
            }
        };

        loadCourses();
    }, [userId]);

    if (loading) {
        return <p>Завантаження курсів...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    const renderCourses = () => {
        if (!courses.length) {
            return <p>У вас поки немає курсів</p>;
        }

        return courses.map(course => (
            <Link key={course.id} className='course' to={`/courses/${course.id}`}>
                <div className="course__image-wrapper">
                    <img 
                        className='course__img' 
                        src={course.image_url} 
                        alt={course.title} 
                    />
                </div>
                
                <div className="course__content">
                    <div className="course__header">
                        <p className='course__progress'>
                            Пройдено: {course.completed_lessons} з {course.total_lessons} уроків
                        </p>
                        
                        <div className='course__categories'>
                            {course.categories.map(category => (
                                <span 
                                    key={category.id} 
                                    className='course__category'
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h3 className='course__title'>{course.title}</h3>

                    <div className='course__details'>
                        <div className='course__meta'>
                            {course.duration && (
                                <p className='course__duration'>
                                    Тривалість: {course.duration} год.
                                </p>
                            )}
                            {course.status === 'premium' && (
                                <span className="course__premium">
                                    Premium • {course.price} грн
                                </span>
                            )}
                        </div>
                    </div>

                    <p className='course__description'>{course.description}</p>

                    <div className="course__progress-bar">
                        <div 
                            className="course__progress-fill"
                            style={{
                                width: `${(course.completed_lessons / course.total_lessons) * 100}%`
                            }}
                        />
                    </div>
                </div>
            </Link>
        ));
    };

    return (
        <div className='mycourses'>
            <div className='container'>
                <h2 className='mycourses__title title'>Мої курси</h2>
                <div className='mycourses__list courses-list'>
                    {renderCourses()}
                </div>
            </div>
        </div>
    );
}

export default MyCourses;
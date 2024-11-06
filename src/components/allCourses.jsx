import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../services/api.js';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch (error) {
                setError("Не вдалося завантажити курси");
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    const renderCourses = () => {
        return courses.map(course => (
            <Link key={course.id} className='course' to={`/courses/${course.id}`}>
                <img className='course__img' src={course.image_url || '../images/course-img.jpg'} alt='course image' />
                <p className='course__progress'>{course.progress}</p>
                <p className='course__category'>{course.category}</p>
                <p className='course__title'>{course.title}</p>
                <div className='course__details'>
                    <p className='course__status'>{course.status}</p>
                    {course.status !== 'free' && (
                        <p className='course__price'>{course.price} грн</p>
                    )}
                </div>
                <div className='course__description'>{course.description}</div>
            </Link>
        ));
    };

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='all-courses'>
            <div className='container'>
                <h2 className='title all-courses__title'>Усі курси</h2>
                <div className='all-courses__list courses-list'>
                    {renderCourses()}
                </div>
            </div>
        </div>
    );
}

export default AllCourses;

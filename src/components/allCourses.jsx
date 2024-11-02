import React from 'react';
import courseImg from '../images/course-img.jpg';
import rating from '../images/rating.svg';

const allCoursesData = [
    {
        id: 1,
        image: courseImg,
        progress: 'Завершено: 5 з 20 уроків',
        category: 'Програмування',
        title: 'JavaScript для початківців',
        rating: 4.8,
        duration: 'Тривалість: 30 г. 12 хв.',
        description: 'Вивчіть основи JavaScript та почніть створювати інтерактивні веб-сайти'
    },
    {
        id: 2,
        image: courseImg,
        progress: 'Завершено: 8 з 50 уроків',
        category: 'Дизайн',
        title: 'Основи графічного дизайну',
        rating: 4.5,
        duration: 'Тривалість: 60 г. 0 хв.',
        description: 'Отримайте навички створення візуального контенту та макетів'
    },
    {
        id: 3,
        image: courseImg,
        progress: 'Завершено: 5 з 20 уроків',
        category: 'Програмування',
        title: 'JavaScript для початківців',
        rating: 4.8,
        duration: 'Тривалість: 30 г. 12 хв.',
        description: 'Вивчіть основи JavaScript та почніть створювати інтерактивні веб-сайти'
    },
    {
        id: 4,
        image: courseImg,
        progress: 'Завершено: 8 з 50 уроків',
        category: 'Дизайн',
        title: 'Основи графічного дизайну',
        rating: 4.5,
        duration: 'Тривалість: 60 г. 0 хв.',
        description: 'Отримайте навички створення візуального контенту та макетів'
    },
];

function AllCourses() {
    const renderCourses = () => {
        return allCoursesData.map(course => (
            <a key={course.id} className='course' href='#'>
                <img className='course__img' src={course.image} alt='course image' />
                <p className='course__progress'>{course.progress}</p>
                <p className='course__category'>{course.category}</p>
                <p className='course__title'>{course.title}</p>
                <div className='course__details'>
                    <div className='course__rating'>
                        <img className='course__rating-img' alt='star' src={rating} />
                        ({course.rating})
                    </div>
                    <p className='course__duration'>{course.duration}</p>
                </div>
                <div className='course__description'>{course.description}</div>
            </a>
        ));
    };

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

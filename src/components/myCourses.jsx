import React from 'react';
import { Link } from 'react-router-dom';
import courseImg from '../images/course-img.jpg';
import rating from '../images/rating.svg';

const coursesData = [
    {
        id: 1,
        image: courseImg,
        progress: 'Завершено: 17 з 34 уроків',
        category: 'IT курси',
        title: 'HTML/CSS Спеціаліст',
        rating: 4.2,
        duration: 'Тривалість: 43 г. 24 хв.',
        description: 'Отримайте прибуткову IT-професію і станьте затребуваним HTML/CSS спеціалістом'
    },
];

function MyCourses() {
    const renderCourses = () => {
        return coursesData.map(course => (
            <Link key={course.id} className='course' to={`/courses/${course.id}`}>
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

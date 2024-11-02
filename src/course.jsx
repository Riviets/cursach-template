import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './scss/styles.css';
import courseImg from './images/course-img-large.jpg';
import teacherImg from './images/teacher.png';
import lessonImg from './images/lesson-img.jpg';

function CourseDescription() {
    const { id } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            setLoading(true);

            const data = {
                category: 'IT Курси',
                title: 'HTML/CSS Спеціаліст',
                lessons: 34,
                duration: '43 г. 24 хв.',
                description: 'Цей курс призначений для тих, хто хоче освоїти основи веб-розробки та стати фахівцем у верстці веб-сторінок. Ви навчитеся створювати сучасні, адаптивні та ефективні веб-інтерфейси за допомогою HTML та CSS.',
                image: courseImg,
                teachers: [
                    {
                        name: 'Вікторія',
                        image: teacherImg
                    }
                ]
            };

            setCourseData(data);
            setLoading(false);
        };

        fetchCourseData();
    }, [id]);

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (!courseData) {
        return <p>Курс не знайдено.</p>;
    }

    return (
        <div className='course-description'>
            <p className='course-description__category'>{courseData.category}</p>
            <h2 className='course-description__title'>{courseData.title}</h2>
            <div className='course-description__content'>
                <p className='course-description__lessons'>{courseData.lessons} уроки</p>
                <p className='course-description__duration'>Тривалість: {courseData.duration}</p>
            </div>
            <p className='course-description__details'>{courseData.description}</p>
            <img className='course-description__img' src={courseData.image} alt='course image' />
            <p className='course-description__teachers-title'>Вчителі:</p>
            <div className='course-description__teachers'>
                {courseData.teachers.map((teacher, index) => (
                    <div key={index} className='course-description__teacher'>
                        <img className='course-description__teacher-img' src={teacher.image} alt='teacher image' />
                        <p className='course-description__teacher-name'>{teacher.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LessonItem({ lesson, courseId }) {
    return (
        <Link to={`/courses/${courseId}/lessons/${lesson.id}`} className="lesson">
            <div className='lesson__content'>
                <h3 className="lesson__name">{lesson.name}</h3>
                <p className="lesson__description">{lesson.description}</p>
                <div className="lesson__materials">
                    {lesson.materials.map((material, index) => (
                        <div 
                            key={index} 
                            className="lesson__material-item"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="lesson__material-icon">🔗</span>
                            <span className="lesson__material-text">{material.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <img src={lesson.image} alt="Lesson image" className="lesson__img" />
        </Link>
    );
}


function CourseModules() {
    const { id: courseId } = useParams();
    const [expandedModules, setExpandedModules] = useState({});

    const toggleModule = (moduleIndex) => {
        setExpandedModules((prevState) => ({
            ...prevState,
            [moduleIndex]: !prevState[moduleIndex],
        }));
    };

    const modules = [
        {
            title: 'Модуль 1',
            progress: 'Пройдено: 2 з 2 уроків',
            time: '2 год. 44 хв. з 2 год. 44 хв.',
            description: 'Цей блок познайомить вас з основами HTML та CSS. Він допоможе розібратися, як і де ці технології застосовуються для створення веб-сторінок, та за допомогою яких інструментів можна ефективно працювати з ними. Ми розглянемо практичні приклади використання HTML та CSS для розробки сайтів, а також як ці навички можуть стати основою для заробітку у сфері малого та середнього бізнесу.',
            lessons: [
                {
                    id: 1,
                    name: 'Урок №1',
                    description: 'На цьому занятті ми починаємо практикувати створення HTML розмітки на практиці В процесі заняття створимо першу веб-сторінку за макетом від дизайнера.',
                    materials: [{ name: 'Домашнє завдання 1.docx', link: '#' }],
                    image: lessonImg
                },
                {
                    id: 2,
                    name: 'Урок №2',
                    description: 'На цьому занятті ми починаємо практикувати створення HTML розмітки на практиці В процесі заняття створимо першу веб-сторінку за макетом від дизайнера.',
                    materials: [{ name: 'Домашнє завдання 2.docx', link: '#' }],
                    image: lessonImg
                }
            ]
        },
        {
            title: 'Модуль 2',
            progress: 'Пройдено: 1 з 3 уроків',
            time: '1 год. 30 хв. з 3 год.',
            description: 'Цей блок познайомить вас з основами HTML та CSS. Він допоможе розібратися, як і де ці технології застосовуються для створення веб-сторінок, та за допомогою яких інструментів можна ефективно працювати з ними.',
            lessons: [
                {
                    id: 3,
                    name: 'Урок №3',
                    description: 'На цьому занятті ми починаємо практикувати створення HTML розмітки на практиці В процесі заняття створимо першу веб-сторінку за макетом від дизайнера.',
                    materials: [{ name: 'Домашнє завдання 3.docx', link: '#' }],
                    image: lessonImg
                }
            ]
        }
    ];

    return (
        <div className="course-modules">
            <ul className="course-modules__list">
                {modules.map((module, index) => (
                    <li key={index} className="course-modules__item">
                        <div className="module">
                            <div className="module__header">
                                <div className="module__info">
                                    <span className="module__number">{module.title}</span>
                                    <div className="module__stats">
                                        <div className="module__progress">
                                            <span className="module__progress-icon">📋</span>
                                            <span className="module__progress-text">{module.progress}</span>
                                        </div>
                                        <div className="module__time">
                                            <span className="module__time-icon">⏰</span>
                                            <span className="module__time-text">{module.time}</span>
                                        </div>
                                    </div>
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
                                    <ul className="module__lessons">
                                        {module.lessons.map((lesson) => (
                                            <li key={lesson.id}>
                                                <LessonItem lesson={lesson} courseId={courseId} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CourseTasks() {
    return (
        <div>
            <h3>Завдання курсу</h3>
            <p>Опис завдань, які потрібно виконати для завершення курсу.</p>
        </div>
    );
}

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
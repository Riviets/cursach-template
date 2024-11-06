import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../scss/styles.css';
import lessonImg from '../images/lesson-img.jpg';
import { fetchCourseById, fetchModulesByCourseId, fetchLessonsByModuleId } from '../services/api.js';


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
            <p className='course-description__category'>{courseData.categories.map(cat => cat.name).join(', ')}</p>
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

function LessonItem({ lesson, courseId }) {
    return (
        <Link to={`/courses/${lesson.module.course.id}/lessons/${lesson.id}`} className="lesson">
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


function ModuleLessons({ moduleId }) {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const loadLessons = async () => {
            try {
                const data = await fetchLessonsByModuleId(moduleId);
                setLessons(data);
            } catch (error) {
                console.error("Не вдалося завантажити уроки модуля:", error);
            }
        };

        loadLessons();
    }, [moduleId]);

    return (
        <ul className="module__lessons">
            {lessons.map((lesson) => (
                <li key={lesson.id}>
                    <LessonItem lesson={lesson} />
                </li>
            ))}
        </ul>
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
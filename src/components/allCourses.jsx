import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../services/api/courseApi';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import search from '../images/search.svg'

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    const allCategories = [...new Set(courses.flatMap(course => 
        course.categories.map(cat => cat.name)
    ))];

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

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategories.length === 0 || 
            course.categories.some(cat => selectedCategories.includes(cat.name));

        const matchesPrice = priceFilter === 'all' || 
            (priceFilter === 'free' && course.status === 'free') ||
            (priceFilter === 'paid' && course.status !== 'free');

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        }
        return b.title.localeCompare(a.title);
    });

    const renderCourses = () => {
        return sortedCourses.map(course => (
            <Link key={course.id} className='course' to={`/courses/${course.id}`}>
                <img className='course__img' src={course.image_url || '../images/course-img.jpg'} alt='course image' />
                <div className='course__content'>
                    <div className='course__categories'>
                        {course.categories.map(cat => (
                            <span key={cat.id} className='course__category'>
                                {cat.name}
                            </span>
                        ))}
                    </div>
                    <p className='course__title'>{course.title}</p>
                    <div className='course__details'>
                        <p className='course__status'>
                            {course.status === 'free' ? 'Безкоштовно' : 'Платний'}
                        </p>
                        {course.status !== 'free' && (
                            <p className='course__price'>{course.price} грн</p>
                        )}
                    </div>
                    <div className='course__description'>{course.description}</div>
                </div>
            </Link>
        ));
    };


    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    return (
        <div className='all-courses'>
            <div className="container">
                {!loading && (
                    <div className='search'>
                        <img className='search-img' alt='search' src={search} />
                        <input
                            type='text'
                            placeholder='Пошук курсів...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='search-input'
                        />
                    </div>
                )}
                <div className="all-courses__inner">
                    {!loading && (
                        <div className='filters'>
                            <div className='filters__categories'>
                                <div className='filters__buttons'>
                                    {allCategories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategories(prev => 
                                                prev.includes(category) 
                                                    ? prev.filter(c => c !== category)
                                                    : [...prev, category]
                                            )}
                                            className={`filters__button ${
                                                selectedCategories.includes(category)
                                                    ? 'filters__button--selected'
                                                    : 'filters__button--default'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='all-courses__list'>
                        {renderCourses()}
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default AllCourses;
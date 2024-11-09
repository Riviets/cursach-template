// components/AllCourses.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../services/api/courseApi';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Стани для фільтрів
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'free', 'paid'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    // Отримуємо унікальні категорії з курсів
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

    // Функція фільтрації курсів
    const filteredCourses = courses.filter(course => {
        // Фільтр по пошуку
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Фільтр по категоріях
        const matchesCategory = selectedCategories.length === 0 || 
            course.categories.some(cat => selectedCategories.includes(cat.name));

        // Фільтр по ціні
        const matchesPrice = priceFilter === 'all' || 
            (priceFilter === 'free' && course.status === 'free') ||
            (priceFilter === 'paid' && course.status !== 'free');

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Сортування курсів
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    return (
        <div>
            <br />
            <div className='filters mb-6 space-y-4'>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Пошук курсів..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    {/* Фільтр категорій */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Категорії
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {allCategories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategories(prev => 
                                        prev.includes(category) 
                                            ? prev.filter(c => c !== category)
                                            : [...prev, category]
                                    )}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        selectedCategories.includes(category)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Фільтр ціни */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ціна
                        </label>
                        <select
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Всі курси</option>
                            <option value="free">Безкоштовні</option>
                            <option value="paid">Платні</option>
                        </select>
                    </div>

                    {/* Сортування */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Сортування
                        </label>
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            {sortOrder === 'asc' ? (
                                <><SortAsc className="w-4 h-4" /> За назвою (А-Я)</>
                            ) : (
                                <><SortDesc className="w-4 h-4" /> За назвою (Я-А)</>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Кількість знайдених курсів */}
            <p className="text-gray-600 mb-4">
                Знайдено курсів: {sortedCourses.length}
            </p>
            <div className='all-courses'>

                {/* Список курсів */}
                <div className='all-courses__list courses-list'>
                    {renderCourses()}
                </div>
            </div>
        </div>
    );
}

export default AllCourses;
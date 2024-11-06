const API_CONFIG = 'http://localhost:8000/api';

export const fetchCourses = async () => {
    const response = await fetch(`${API_CONFIG}/courses/`);
    if (!response.ok) {
        throw new Error('Не вдалося завантажити курси');
    }
    return await response.json();
};

export const fetchCourseById = async (id) => {
    const response = await fetch(`${API_CONFIG}/courses/${id}/`);
    if (!response.ok) {
        throw new Error('Не вдалося завантажити дані курсу');
    }
    return await response.json();
};

export const fetchModulesByCourseId = async (courseId) => {
    const response = await fetch(`${API_CONFIG}/modules/get_modules/${courseId}/`);
    if (!response.ok) {
        throw new Error('Не вдалося завантажити модулі курсу');
    }
    return await response.json();
};

export const fetchLessonsByModuleId = async (moduleId) => {
    const response = await fetch(`${API_CONFIG}/lessons/get_lessons/${moduleId}/`);
    if (!response.ok) {
        throw new Error('Не вдалося завантажити уроки модуля');
    }
    return await response.json();
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const login = async (username, password) => {
    const response = await fetch(`${API_CONFIG}/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
        throw new Error('Помилка входу');
    }
    
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

export const register = async (userData) => {
    const response = await fetch(`${API_CONFIG}/users/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        throw new Error('Помилка реєстрації');
    }
    
    return await response.json();
};

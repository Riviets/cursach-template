import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/api/userApi';
import logo from '../images/logo.svg';
import search from '../images/search.svg';
import pfp from '../images/pfp.jpg';
import '../scss/styles.css';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const user = getCurrentUser();
        setUser(user);
    }, []);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <div className="header">
            <div className='container'>
                <div className='header__inner'>
                    <Link to="/" className='logo'>
                        <img className='logo-img' src={logo} alt='logo' />
                    </Link>
                    <nav className='header__nav'>
                        <ul className='header__list'>
                            <li className='header__list-item'>
                                <Link 
                                    to="/" 
                                    className={`header__list-link ${location.pathname === '/' ? 'active' : ''}`}
                                >
                                    Мої курси
                                </Link>
                            </li>
                            <li className='header__list-item'>
                                <Link 
                                    to="/all-courses" 
                                    className={`header__list-link ${location.pathname === '/all-courses' ? 'active' : ''}`}
                                >
                                    Усі курси
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {user ? (
                        <div className='profile'>
                            <Link to='/profile/basic-info' className='profile-info'>
                                <img 
                                    className='profile-img' 
                                    src={user.profileImageUrl || pfp} 
                                    alt='profile' 
                                />
                                
                                <p className='profile-name'>{user.userName}</p>
                            </Link>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="auth-btn auth-button">Login</Link> 
                            <Link to="/registration" className="auth-btn auth-button">Signup</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;

// Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './images/logo.svg';
import search from './images/search.svg';
import './scss/styles.css';

function Header() {
    const location = useLocation();
    
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
                    <div className='header__search'>
                        <img className='header__search-img' alt='search' src={search} />
                        <input className='header__search-input' type='text' placeholder='Пошук курсу' />
                    </div>
                    <div className='header__profile'>
                        <img className='header__profile-img' src='' alt='pfp' />
                        <p className='header__profile-name'>Name</p>
                    </div>
                </div>
           </div>
        </div>
    );
}

export default Header;
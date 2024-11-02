import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.svg';
import inst from './images/socials/inst.svg';
import fb from './images/socials/fb.svg';
import youtube from './images/socials/youtube.svg';
import './scss/styles.css';

function Footer() {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='footer__inner'>
                    <Link to="/" className='logo'>
                        <img className='logo-img' src={logo} alt='logo' />
                    </Link>
                    <ul className='footer__list'>
                        <li className='footer__item'>
                            <Link 
                                to="/profile/basic-info" 
                                className='footer__item-link'
                            >
                                Профіль
                            </Link>
                        </li>
                        <li className='footer__item'>
                            <Link 
                                to="/profile/basic-info" 
                                className='footer__item-link'
                            >
                                Налаштування
                            </Link>
                        </li>
                        <li className='footer__item'>
                            <Link 
                                to="/" 
                                className='footer__item-link'
                            >
                                Мої курси
                            </Link>
                        </li>
                        <li className='footer__item'>
                            <Link 
                                to="/all-courses" 
                                className='footer__item-link'
                            >
                                Усі курси
                            </Link>
                        </li>
                    </ul>
                    <div className='socials'>
                        <a 
                            className='socials__link' 
                            href='https://instagram.com' 
                            target='_blank' 
                            rel="noopener noreferrer"
                        >
                            <img className='socials__img' src={inst} alt='inst' />
                        </a>
                        <a 
                            className='socials__link' 
                            href='https://facebook.com' 
                            target='_blank' 
                            rel="noopener noreferrer"
                        >
                            <img className='socials__img' src={fb} alt='fb' />
                        </a>
                        <a 
                            className='socials__link' 
                            href='https://www.youtube.com/@cegshorts' 
                            target='_blank' 
                            rel="noopener noreferrer"
                        >
                            <img className='socials__img' src={youtube} alt='youtube' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
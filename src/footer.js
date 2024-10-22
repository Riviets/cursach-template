import React from 'react'
import logo from './images/logo.svg'
import inst from './images/socials/inst.svg'
import fb from './images/socials/fb.svg'
import youtube from './images/socials/youtube.svg'
import './scss/styles.css'

function Footer(){
    return(
        <div className='footer'>
            <div className='container'>
                <div className='footer__inner'>
                    <a className='logo'>
                        <img className='logo-img' src={logo} alt='logo'></img>
                    </a>
                    <ul className='footer__list'>
                        <li className='footer__item'>
                            <a className='footer__item-link' href='#'>Профіль</a>
                        </li>
                        <li className='footer__item'>
                            <a className='footer__item-link' href='#'>Налаштування</a>
                        </li>
                        <li className='footer__item'>
                            <a className='footer__item-link' href='#'>Мої курси</a>
                        </li>
                        <li className='footer__item'>
                            <a className='footer__item-link' href='#'>Усі курси</a>
                        </li>
                    </ul>
                    <div className='socials'>
                        <a className='socials__link' href='https://instagram.com' target='_blank'>
                            <img href='socials__img' src={inst} alt='inst'></img>
                        </a>
                        <a className='socials__link' href='https://facebook.com' target='_blank'>
                            <img href='socials__img' src={fb} alt='fb'></img>
                        </a>
                        <a className='socials__link' href='https://www.youtube.com/@cegshorts' target='_blank'>
                            <img href='socials__img' src={youtube} alt='youtube'></img>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
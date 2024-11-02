import React from 'react'
import { Link, useLocation, NavLink, Outlet } from 'react-router-dom';
import logo from './images/logo.svg'
import settings from './images/settings.svg'
import pfp from './images/pfp.jpg'
import './scss/styles.css'

function ProfileHeader(){
    return(
        <div className="profile-header">
            <div className='container'>
                <div className='profile-header__inner'>
                    <Link to="/" className='logo'>
                        <img className='logo-img' src={logo} alt='logo' />
                    </Link>
                    <img className='profile-header__img' src={settings} alt='settings'></img>
                    <p className='profile-header__text'>Профіль</p>
                </div>
            </div>
        </div>
    )
}

function AsideMenu(){
    return(
        <div className='profile-aside'>
            <div className='pfp'>
                <img className='pfp-img' src={pfp} alt='pfp' />
                <p className='pfp-name'>Name</p>
            </div>
            <ul className='profile-aside__menu'>
                <li className='profile-aside__menu-item'>
                    <NavLink 
                        to="/profile/basic-info"
                        className={({ isActive }) => 
                            isActive ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        >
                        Основна інформація
                    </NavLink>
                </li>
                <li className='profile-aside__menu-item'>
                    <NavLink 
                        to="/profile/password"
                        className={({ isActive }) => 
                            isActive ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        >
                        Пароль
                    </NavLink>
                </li>
                <li className='profile-aside__menu-item'>
                    <NavLink 
                        to="/profile/payments"
                        className={({ isActive }) => 
                            isActive ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        >
                        Способи оплати
                    </NavLink>
                </li>
                <li className='profile-aside__menu-item'>
                    <NavLink 
                        to="/profile/contacts"
                        className={({ isActive }) => 
                            isActive ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        >
                        Контакти
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

function BasicInfo() {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Вибраний файл:', file.name);
        }
    };
    return (
        <div className='profile-item'>
            <h2 className='profile-item__title title'>Інформація</h2>
            <div className='change-pfp'>
                <img className='change-pfp__img' alt='pfp' src={pfp}></img>
                <div className='change-pfp__content'>
                    <p className='change-pfp__text'>Завантажте вашу фотографію...</p>
                    <input
                        className='change-pfp__btn'
                        type='file'
                        id='file-upload'
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <button
                        className='change-pfp__btn'
                        onClick={() => document.getElementById('file-upload').click()}
                    >
                        Вибрати файл
                    </button>
                </div>
            </div>
            <form className='profile-item__form'>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' htmlFor='username'>Ім'я</label>
                    <input className='profile-item__form-input input' id='username' placeholder='Іван'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' htmlFor='second-name'>Прізвище</label>
                    <input className='profile-item__form-input input' id='second-name' placeholder='Круглий'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' htmlFor='login'>Псевдонім</label>
                    <input className='profile-item__form-input input' id='login' placeholder='Ivan'></input>
                </div>
                <button className='btn profile-item__form-btn'>Зберегти зміни</button>
            </form>
        </div>
    )
}

function Password() {
    return(
        <div className='profile-item'>
            <h2 className='profile-item__title title'>Змінити пароль</h2>
            <form className='profile-item__form'>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' for='password'>Введіть поточний пароль</label>
                    <input className='profile-item__form-input input' id='password' placeholder='password'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' for='new-password'>Введіть новий пароль</label>
                    <input className='profile-item__form-input input' id='new-password' placeholder='newPassword'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' for='login'>Псевдонім</label>
                    <input className='profile-item__form-input input' id='login' placeholder='newPassword'></input>
                </div>
                <button className='btn profile-item__form-btn'>Зберегти зміни</button>
            </form>
        </div>
    )
}
function Payments() {
   return(
        <div className='profile-item'>
            <h2 className='profile-item__title title'>Способи оплати</h2>
        </div>
    )
}

function Contacts() {
    return(
        <div className='profile-item'>
            <h2 className='profile-item__title title'>Контакти</h2>
            <form className='profile-item__form'>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' for='phone'>Телефон</label>
                    <input className='profile-item__form-input input' id='phone' placeholder='+380994832485'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' for='email'>Електронна пошта</label>
                    <input className='profile-item__form-input input' id='email' placeholder='example@gmail.com'></input>
                </div>
                <button className='btn profile-item__form-btn'>Зберегти зміни</button>
            </form>
        </div>
    )
}

function Profile(){
    return(
        <div className='profile'>
            <ProfileHeader />
            <div className='profile-container'>
                <div className='profile-content'>
                    <AsideMenu />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export { BasicInfo, Password, Payments, Contacts };
export default Profile;
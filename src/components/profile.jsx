import {React, useState} from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg'
import settings from '../images/settings.svg'
import pfp from '../images/pfp.jpg'
import '../scss/styles.css'
import {logout} from '../services/api/userApi'

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

function AsideMenu() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        navigate('/');
    };

    const toggleModal = () => {
        setShowModal(!showModal);
        if (!showModal) {
            setActiveItem('logout');
        } else {
            setActiveItem('');
        }
    };

    const handleNavLinkClick = (path) => {
        setActiveItem(path);
        setShowModal(false);
    };

    return (
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
                            isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        onClick={() => handleNavLinkClick('basic-info')}
                    >
                        Основна інформація
                    </NavLink>
                </li>
                <li className='profile-aside__menu-item'>
                    <NavLink 
                        to="/profile/password"
                        className={({ isActive }) => 
                            isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        onClick={() => handleNavLinkClick('password')}
                    >
                        Пароль
                    </NavLink>
                </li>
                <li className='profile-aside__menu-item'>
                    <NavLink 
                        to="/profile/payments"
                        className={({ isActive }) => 
                            isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        onClick={() => handleNavLinkClick('payments')}
                    >
                        Способи оплати
                    </NavLink>
                </li>
                <li className='profile-aside__menu-item'>
                    <NavLink 
                        to="/profile/contacts"
                        className={({ isActive }) => 
                            isActive && activeItem !== 'logout' ? 'profile-aside__menu-link active' : 'profile-aside__menu-link'
                        }
                        onClick={() => handleNavLinkClick('contacts')}
                    >
                        Контакти
                    </NavLink>
                </li>
                <li className='profile-aside__menu-item'>
                    <div className="profile-aside__logout">
                        <button 
                            className={`profile-aside__menu-link profile-aside__logout-btn ${activeItem === 'logout' ? 'active' : ''}`}
                            onClick={toggleModal}
                        >
                            Вийти з аккаунту
                        </button>
                    </div>
                </li>
            </ul>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text">Ви дійсно хочете вийти з аккаунту?</p>
                        <div className="modal-buttons">
                            <button onClick={handleLogout} className="modal-btn confirm-btn">
                                Так
                            </button>
                            <button onClick={toggleModal} className="modal-btn cancel-btn">
                                Ні
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function ExitAccount() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        navigate('/');
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <button 
                className={`exit-account-btn ${showModal ? 'active' : ''}`} 
                onClick={toggleModal}
            >
                Вийти з аккаунту
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Ви дійсно хочете вийти з аккаунту?</p>
                        <button onClick={handleLogout} className="modal-btn confirm-btn">
                            Так
                        </button>
                        <button onClick={toggleModal} className="modal-btn cancel-btn">
                            Ні
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
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
                    <label className='profile-item__form-label' htmlFor='password'>Введіть поточний пароль</label>
                    <input className='profile-item__form-input input' id='password' placeholder='password'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' htmlFor='new-password'>Введіть новий пароль</label>
                    <input className='profile-item__form-input input' id='new-password' placeholder='newPassword'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' htmlFor='login'>Псевдонім</label>
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
                    <label className='profile-item__form-label' htmlFor='phone'>Телефон</label>
                    <input className='profile-item__form-input input' id='phone' placeholder='+380994832485'></input>
                </div>
                <div className='profile-item__form-item'>
                    <label className='profile-item__form-label' htmlFor='email'>Електронна пошта</label>
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
import React from 'react'
import { Link } from 'react-router-dom'
import linkIcon from "./images/linkIcon.svg"    
import downloadIcon from "./images/downloadIcon.svg"
import testVideo from './GOT intro.mp4'

function LessonAsideMenu() {
    return (
        <aside className="lesson-aside">
            <div className="lesson-aside__module">
                <h3 className="lesson-aside__title">Модуль 1</h3>
                <ul className="lesson-aside__list">
                    <li className="lesson-aside__item">
                        <div className="lesson-aside__lesson">
                            <div className="lesson-aside__lesson-info">
                                <Link to="/lessons/:lesson-id" className="lesson-aside__lesson-name">
                                    Вступ. Знайомство
                                </Link>
                                <span className="lesson-aside__lesson-duration">44 хв.</span>
                            </div>
                        </div>
                    </li>
                    <li className="lesson-aside__item">
                        <div className="lesson-aside__lesson">
                            <div className="lesson-aside__lesson-info">
                                <Link to="/lessons/:lesson-id" className="lesson-aside__lesson-name">
                                    Основи. Введення
                                </Link>
                                <span className="lesson-aside__lesson-duration">2 год.</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}



function Player(){
    return(
        <div className="player">
            <video width="640" height="360" controls>
            <source src={testVideo} type="video/mp4" />
            Ваш браузер не підтримує відеоплеєр.
            </video>
        </div>
    )
}



function LessonInfo(){
        return (
        <div className="lesson-info">
          <h2 className="lesson-info__title">Урок №1. Основні завдання розробника</h2>
          
          <p className="lesson-info__description">
            На цьому занятті ми розбираємо основні питання, що стосуються професії Markup (HTML/CSS) розробника:
          </p>
          
          <div className="lesson-info__resources">
            <a href="https://uk.wikipedia.org/wiki" className="lesson-info__link">
              <img src={linkIcon} alt="Link icon" className="lesson-info__icon" />
              https://uk.wikipedia.org/wiki
            </a>
            
            <a href="#" download className="lesson-info__download">
              <img src={downloadIcon} alt="Download icon" className="lesson-info__icon" />
              Додаткові матеріали.pptx
            </a>
          </div>
          
          <button className="btn lesson-info__button">Виконано</button>
        </div>
      );
};

function Lesson(){
    return(
        <div className="lesson-component">
           <div className="container">
            <div className="lesson-component__content">
                    <Player />
                    <LessonAsideMenu />
                </div>
                <div className="lesson-component__info">
                    <LessonInfo />
                </div>
           </div>
        </div>
    )
}

export default Lesson
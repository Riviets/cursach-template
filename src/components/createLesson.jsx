import React from 'react'

function CreateLesson() {
    return (
      <div className="create-lesson">
        <h1 className="create-lesson__title">Створення уроку</h1>
        
        <div className="create-lesson__content">
          <div className="create-lesson__main">
            <div className="create-lesson__field">
              <label className="create-lesson__label">Назва уроку</label>
              <input 
                type="text" 
                className="create-lesson__input" 
                placeholder="Урок 1. ..."
              />
            </div>
  
            <div className="create-lesson__field">
              <label className="create-lesson__label">Опис уроку</label>
              <textarea 
                className="create-lesson__textarea"
                placeholder="На цьому уроці ..."
              />
            </div>
  
            <div className="create-lesson__field">
              <label className="create-lesson__label">
                Завантажте додаткові файли чи посилання:
              </label>
              <div className="create-lesson__files">
                <div className="create-lesson__file">
                  Домашнє завдання №1.docx
                </div>
                <div className="create-lesson__file">
                  https://classroom.google.com/
                </div>
              </div>
              <div className="create-lesson__actions">
                <button className="create-lesson__btn create-lesson__btn--secondary">
                  Вибрати файл
                </button>
                <button className="create-lesson__btn create-lesson__btn--secondary">
                  Додати посилання
                </button>
              </div>
            </div>
  
            <div className="create-lesson__buttons">
              <button className="create-lesson__btn create-lesson__btn--primary">
                Створити урок
              </button>
              <button className="create-lesson__btn create-lesson__btn--outline">
                Скасувати
              </button>
            </div>
          </div>
  
          <div className="create-lesson__media">
            <div className="create-lesson__field">
              <label className="create-lesson__label">Відеофайл уроку</label>
              <button className="create-lesson__upload">
                Вибрати файл
              </button>
            </div>
  
            <div className="create-lesson__field">
              <label className="create-lesson__label">Заставка уроку</label>
              <input 
                type="text" 
                className="create-lesson__input" 
                value="Заставка.png"
                readOnly
              />
              <button className="create-lesson__upload">
                Вибрати файл
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default CreateLesson
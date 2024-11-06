import React from 'react'

function EditLesson() {
    return (
      <div className="edit-lesson">
        <h1 className="edit-lesson__title">Редагування уроку</h1>
        
        <div className="edit-lesson__content">
          <div className="edit-lesson__main">
            <div className="edit-lesson__field">
              <label className="edit-lesson__label">Назва уроку</label>
              <input 
                type="text" 
                className="edit-lesson__input" 
                placeholder="Урок 1. ..."
              />
            </div>
   
            <div className="edit-lesson__field">
              <label className="edit-lesson__label">Опис уроку</label>
              <textarea 
                className="edit-lesson__textarea"
                placeholder="На цьому уроці ..."
              />
            </div>
   
            <div className="edit-lesson__field">
              <label className="edit-lesson__label">
                Завантажте додаткові файли чи посилання:
              </label>
              <div className="edit-lesson__files">
                <div className="edit-lesson__file">
                  Домашнє завдання №1.docx
                </div>
                <div className="edit-lesson__file">
                  https://classroom.google.com/
                </div>
              </div>
              <div className="edit-lesson__actions">
                <button className="edit-lesson__btn edit-lesson__btn--secondary">
                  Вибрати файл
                </button>
                <button className="edit-lesson__btn edit-lesson__btn--secondary">
                  Додати посилання
                </button>
              </div>
            </div>
   
            <div className="edit-lesson__buttons">
              <button className="edit-lesson__btn edit-lesson__btn--primary">
                Зберегти дані
              </button>
              <button className="edit-lesson__btn edit-lesson__btn--outline">
                Скасувати
              </button>
            </div>
          </div>
   
          <div className="edit-lesson__media">
            <div className="edit-lesson__field">
              <label className="edit-lesson__label">Відеофайл уроку</label>
              <button className="edit-lesson__upload">
                Вибрати файл
              </button>
            </div>
   
            <div className="edit-lesson__field">
              <label className="edit-lesson__label">Заставка уроку</label>
              <input 
                type="text" 
                className="edit-lesson__input" 
                value="Заставка.png"
                readOnly
              />
              <button className="edit-lesson__upload">
                Вибрати файл
              </button>
            </div>
          </div>
        </div>
      </div>
    );
   }

   export default EditLesson
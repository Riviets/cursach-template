// components/lesson.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import {
  fetchLessonById,
  fetchLessonFiles,
  fetchLessonLinks,
  fetchLessonsByModuleId,
} from '../services/api/lessonApi';

import {fetchModulesByCourseId } from '../services/api/courseApi'

import linkIcon from '../images/linkIcon.svg';
import downloadIcon from '../images/downloadIcon.svg';

function Lesson() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessonData = async () => {
      try {
        const lessonData = await fetchLessonById(lessonId);
        setLesson(lessonData);

        const filesData = await fetchLessonFiles(lessonId);
        setFiles(filesData);

        const linksData = await fetchLessonLinks(lessonId);
        setLinks(linksData);

        const modulesData = await fetchModulesByCourseId(courseId);
        setModules(modulesData);
      } catch (error) {
        console.error('Не вдалося отримати дані уроку:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLessonData();
  }, [courseId, lessonId]);

  if (loading) {
    return <p>Завантаження уроку...</p>;
  }

  if (!lesson) {
    return <p>Урок не знайдено.</p>;
  }

  return (
    <div className="lesson-component">
      <div className="container">
        <div className="lesson-component__content">
          <Player files={files} />
          <LessonAsideMenu modules={modules} currentLessonId={lessonId} courseId={courseId} />
        </div>
        <div className="lesson-component__info">
          <LessonInfo lesson={lesson} files={files} links={links} />
        </div>
      </div>
    </div>
  );
}

function Player({ files }) {
  const videoFile = files.find(file => file.file_type === 'mp4');

  if (!videoFile) {
    return <p>Відео недоступне для цього уроку.</p>;
  }

  return (
    <div className="player">
      <video width="640" height="360" controls>
        <source src={videoFile.file_url} type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
    </div>
  );
}

function LessonInfo({ lesson, files, links }) {
  return (
    <div className="lesson-info">
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>

      <div className="lesson-info__resources">
        {links.map(link => (
          <a key={link.id} href={link.link_url} target="_blank" rel="noopener noreferrer">
            <img src={linkIcon} alt="Link icon" />
            {link.link_url}
          </a>
        ))}

        {files
          .filter(file => file.file_type !== 'mp4')
          .map(file => (
            <a key={file.id} href={file.file_url} download>
              <img src={downloadIcon} alt="Download icon" />
              {file.file_name}
            </a>
          ))}
      </div>

      <button className="btn lesson-info__button">
        {lesson.is_completed ? 'Пройдено' : 'Позначити як пройдено'}
      </button>
    </div>
  );
}

function LessonAsideMenu({ modules, currentLessonId, courseId }) {
  return (
    <aside className="lesson-aside">
      {modules.map(module => (
        <div key={module.id} className="lesson-aside__module">
          <h3>{module.title}</h3>
          <ModuleLessons moduleId={module.id} currentLessonId={currentLessonId} courseId={courseId} />
        </div>
      ))}
    </aside>
  );
}

function ModuleLessons({ moduleId, currentLessonId, courseId }) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await fetchLessonsByModuleId(moduleId);
        setLessons(data);
      } catch (error) {
        console.error('Не вдалося отримати уроки модуля:', error);
      }
    };

    loadLessons();
  }, [moduleId]);

  return (
    <ul>
      {lessons.map(lesson => (
        <li key={lesson.id} className={lesson.id === parseInt(currentLessonId) ? 'active' : ''}>
          <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>{lesson.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Lesson;

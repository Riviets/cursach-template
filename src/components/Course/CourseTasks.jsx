import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAssignmentsByCourseId } from '../../services/api/assignmentApi.js';
import { 
    CheckCircle, 
    Clock, 
    FileText, 
    AlertCircle,
    ChevronRight
} from 'lucide-react';

function getStatusInfo(status) {
    switch (status) {
        case 'graded':
            return {
                icon: <CheckCircle className="status-icon text-green-500" />,
                text: 'Оцінено',
                color: 'text-green-500'
            };
        case 'submitted':
            return {
                icon: <Clock className="status-icon text-blue-500" />,
                text: 'Подано',
                color: 'text-blue-500'
            };
        default:
            return {
                icon: <AlertCircle className="status-icon text-yellow-500" />,
                text: 'Очікує подання',
                color: 'text-yellow-500'
            };
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function CourseTasks() {
    const { id: courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAssignments = async () => {
            try {
                const data = await fetchAssignmentsByCourseId(courseId);
                setAssignments(data);
            } catch (error) {
                console.error("Не вдалося завантажити завдання курсу:", error);
                setError("Не вдалося завантажити завдання");
            } finally {
                setLoading(false);
            }
        };

        loadAssignments();
    }, [courseId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
            </div>
        );
    }

    return (
        <div className="course-tasks p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Завдання курсу</h3>
            {assignments.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-600">Завдання не знайдено</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {assignments.map((assignment) => {
                        const statusInfo = getStatusInfo(assignment.status);
                        return (
                            <Link
                                key={assignment.id}
                                to={`/assignments/${assignment.id}`}
                                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xl font-semibold text-gray-800">
                                            {assignment.title}
                                        </h4>
                                        <div className="flex items-center">
                                            {statusInfo.icon}
                                            <span className={`ml-2 ${statusInfo.color}`}>
                                                {statusInfo.text}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                                    
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>Термін: {formatDate(assignment.due_date)}</span>
                                        </div>
                                        
                                        {assignment.grade && (
                                            <div className="flex items-center">
                                                <div className={`px-3 py-1 rounded-full ${
                                                    assignment.grade >= 90 ? 'bg-green-100 text-green-700' :
                                                    assignment.grade >= 75 ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    Оцінка: {assignment.grade}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {assignment.feedback && (
                                            <div className="flex-1 text-right italic">
                                                "{assignment.feedback}"
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="px-6 py-3 bg-gray-50 rounded-b-lg flex items-center justify-end text-sm text-gray-500">
                                    Переглянути деталі
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CourseTasks;
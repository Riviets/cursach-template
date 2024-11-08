// components/Assignment/AssignmentDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAssignmentDetail } from '../../services/api/assignmentApi.js';
import { 
    Calendar,
    FileText,
    Link as LinkIcon,
    MessageSquare,
    Download,
    ExternalLink,
    AlertCircle,
    Loader
} from 'lucide-react';

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

function AssignmentDetail() {
    const { assignmentId } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAssignment = async () => {
            try {
                const data = await fetchAssignmentDetail(assignmentId);
                setAssignment(data);
            } catch (error) {
                console.error("Не вдалося завантажити деталі завдання:", error);
                setError("Не вдалося завантажити деталі завдання");
            } finally {
                setLoading(false);
            }
        };

        loadAssignment();
    }, [assignmentId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center">
                    <Loader className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="mt-4 text-gray-600">Завантаження деталей завдання...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <p className="text-gray-600">Завдання не знайдено</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Заголовок */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {assignment.title}
                    </h2>
                    <div className="flex items-center text-blue-100">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>Термін здачі: {formatDate(assignment.due_date)}</span>
                    </div>
                </div>

                <div className="p-6">
                    {/* Опис */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Опис завдання</h3>
                        <p className="text-gray-600 leading-relaxed">{assignment.description}</p>
                    </div>

                    {/* Файли */}
                    {assignment.files && assignment.files.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <FileText className="h-5 w-5 mr-2" />
                                Файли
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                {assignment.files.map((file) => (
                                    <div 
                                        key={file.id}
                                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                            <div>
                                                <p className="text-gray-800 font-medium">{file.file_name}</p>
                                                <p className="text-sm text-gray-500">{formatFileSize(file.file_size)}</p>
                                            </div>
                                        </div>
                                        <a 
                                            href={file.file_url}
                                            download
                                            className="flex items-center px-3 py-1 text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            Завантажити
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Посилання */}
                    {assignment.links && assignment.links.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <LinkIcon className="h-5 w-5 mr-2" />
                                Корисні посилання
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                {assignment.links.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.link_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-2 text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        {link.link_url}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Відгук */}
                    {assignment.feedback && (
                        <div className="rounded-lg bg-green-50 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <MessageSquare className="h-5 w-5 mr-2" />
                                Відгук викладача
                            </h3>
                            <p className="text-gray-700 italic">"{assignment.feedback}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AssignmentDetail;
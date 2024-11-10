import React, { useEffect, useState } from 'react';
import { fetchCourseParticipants, fetchUserDetails } from '../../services/api/courseApi';
import { User, Users, ShieldCheck, GraduationCap, X, Mail, Phone } from 'lucide-react';
import Modal from '../Modal';

function ParticipantCard({ participant, role, onClick }) {
    return (
        <div 
            onClick={onClick}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
            {participant.profile_image_url ? (
                <img 
                    src={participant.profile_image_url} 
                    alt={participant.username}
                    className="profile-img"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                    }}
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                </div>
            )}
            <div className="flex-1">
                <p className="font-medium text-gray-900">{participant.username}</p>
                <p className="text-sm text-gray-500">
                    {role === 'teacher' && 'Викладач'}
                    {role === 'student' && 'Студент'}
                    {role === 'admin' && 'Адміністратор'}
                </p>
            </div>
        </div>
    );
}

function ParticipantsList({ title, participants, role, icon: Icon, onParticipantClick }) {
    if (!participants?.length) return null;

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-medium">
                    {title} ({participants.length})
                </h3>
            </div>
            <div className="space-y-2">
                {participants.map(participant => (
                    <ParticipantCard
                        key={participant.id}
                        participant={participant}
                        role={role}
                        onClick={() => onParticipantClick(participant, role)}
                    />
                ))}
            </div>
        </div>
    );
}

function CourseParticipants({ courseId }) {
    const [participants, setParticipants] = useState({ students: [], teachers: [], admins: [] });
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadParticipants = async () => {
            try {
                setLoading(true);
                const data = await fetchCourseParticipants(courseId);
                setParticipants(data);
            } catch (error) {
                console.error('Помилка при завантаженні учасників курсу:', error);
                setError('Не вдалося завантажити список учасників');
            } finally {
                setLoading(false);
            }
        };

        loadParticipants();
    }, [courseId]);

    const openProfileModal = async (participant, role) => {
        try {
            const data = await fetchUserDetails(participant.id, role);
            setSelectedParticipant({ ...data, role });
            setModalOpen(true);
        } catch (error) {
            console.error('Помилка при завантаженні профілю учасника:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }
    const closeModal = () => {
      setModalOpen(false);
      setSelectedParticipant(null);
    };
    const totalParticipants = 
        (participants.teachers?.length || 0) + 
        (participants.students?.length || 0) + 
        (participants.admins?.length || 0);

        return (
          <div className="bg-white rounded-lg p-6 shadow">
              <div className="space-y-6">
                  {/* Викладачі */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4">
                          Викладачі ({participants.teachers?.length || 0})
                      </h3>
                      <div className="grid gap-4">
                          {participants.teachers?.map(teacher => (
                              <div 
                                  key={teacher.id}
                                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                  onClick={() => openProfileModal(teacher, 'teacher')}
                              >
                                  {teacher.profile_image_url ? (
                                      <img 
                                          src={teacher.profile_image_url}
                                          alt={teacher.username}
                                          className="profile-img"
                                      />
                                  ) : (
                                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                          <User className="w-6 h-6 text-gray-400" />
                                      </div>
                                  )}
                                  <div>
                                      <p className="font-medium">{teacher.username}</p>
                                      <p className="text-sm text-gray-500">Викладач</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
  
                  {/* Студенти */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4">
                          Студенти ({participants.students?.length || 0})
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {participants.students?.map(student => (
                              <div 
                                  key={student.id}
                                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                  onClick={() => openProfileModal(student, 'student')}
                              >
                                  {student.profile_image_url ? (
                                      <img 
                                          src={student.profile_image_url}
                                          alt={student.username}
                                          className="profile-img"
                                      />
                                  ) : (
                                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                          <User className="w-6 h-6 text-gray-400" />
                                      </div>
                                  )}
                                  <div>
                                      <p className="font-medium">{student.username}</p>
                                      <p className="text-sm text-gray-500">Студент</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
  
                  {/* Адміністратори */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4">
                          Адміністратори ({participants.admins?.length || 0})
                      </h3>
                      <div className="grid gap-4">
                          {participants.admins?.map(admin => (
                              <div 
                                  key={admin.id}
                                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                  onClick={() => openProfileModal(admin, 'admin')}
                              >
                                  {admin.profile_image_url ? (
                                      <img 
                                          src={admin.profile_image_url}
                                          alt={admin.username}
                                          className="profile-img"
                                      />
                                  ) : (
                                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                          <User className="w-6 h-6 text-gray-400" />
                                      </div>
                                  )}
                                  <div>
                                      <p className="font-medium">{admin.username}</p>
                                      <p className="text-sm text-gray-500">Адміністратор</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
  
              {modalOpen && (
                  <Modal onClose={closeModal}>
                      <div className="text-center">
                          <h2 className="text-xl font-semibold mb-6">Профіль учасника</h2>
                          {selectedParticipant && (
                              <div className="space-y-4">
                                  {selectedParticipant.profile_image_url ? (
                                      <img 
                                          src={selectedParticipant.profile_image_url}
                                          alt={selectedParticipant.username}
                                          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                                      />
                                  ) : (
                                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                                          <User className="w-12 h-12 text-gray-400" />
                                      </div>
                                  )}
                                  <div className="text-left space-y-2">
                                      <p>
                                          <span className="font-medium">Ім'я користувача:</span>{' '}
                                          {selectedParticipant.username}
                                      </p>
                                      <p>
                                          <span className="font-medium">Email:</span>{' '}
                                          {selectedParticipant.email}
                                      </p>
                                      {selectedParticipant.phone_number && (
                                          <p>
                                              <span className="font-medium">Телефон:</span>{' '}
                                              {selectedParticipant.phone_number}
                                          </p>
                                      )}
                                  </div>
                              </div>
                          )}
                      </div>
                  </Modal>
              )}
          </div>
      );
  }

export default CourseParticipants;
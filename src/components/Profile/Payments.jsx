// components/Profile/Payments.jsx
import React, { useState, useEffect } from 'react';
import { fetchPaymentHistory } from '../../services/api/paymentsApi';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadPaymentHistory = async () => {
            try {
                // Отримуємо ID користувача з localStorage
                const userData = JSON.parse(localStorage.getItem('user'));
                if (!userData?.id) {
                    setMessage('Користувач не авторизований');
                    return;
                }

                setLoading(true);
                const response = await fetchPaymentHistory(userData.id);
                console.log('Payment history:', response);
                setPayments(response || []);
            } catch (error) {
                console.error('Error loading payments:', error);
                setMessage('Не вдалося завантажити історію платежів');
            } finally {
                setLoading(false);
            }
        };

        loadPaymentHistory();
    }, []);

    if (loading) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className="profile-item">
            <h2 className="profile-item__title title">Історія платежів</h2>
            {message && <p className="message">{message}</p>}
            
            {payments.length === 0 ? (
                <p>Історія платежів порожня</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Сума</th>
                            <th>Опис</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>
                                    {new Date(payment.transaction_date).toLocaleDateString('uk-UA', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td>{payment.amount} грн</td>
                                <td>{payment.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Payments;

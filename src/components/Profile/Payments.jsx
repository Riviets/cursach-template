// components/Profile/Payments.jsx

import React, { useState, useEffect } from 'react';
import { fetchPaymentHistory } from '../../services/api/paymentsApi';
import { useSelector } from 'react-redux';

function Payments() {
  const user = useSelector((state) => state.user.user);
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPaymentHistory = async () => {
      try {
        const data = await fetchPaymentHistory(user.id);
        setPayments(data);
      } catch (error) {
        setMessage('Не вдалося завантажити історію платежів');
      }
    };

    if (user) {
      loadPaymentHistory();
    }
  }, [user]);

  return (
    <div className="profile-item">
      <h2 className="profile-item__title title">Способи оплати</h2>
      {message && <p>{message}</p>}
      {payments.length === 0 ? (
        <p>Історія платежів порожня</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Сума</th>
              <th>Курс</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.date).toLocaleString()}</td>
                <td>{payment.amount}</td>
                <td>{payment.course_title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Payments;

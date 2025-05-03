import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Resident {
  resident_id: number;
  first_name: string;
  last_name: string;
}

const ApartmentDetailPage = () => {
  const { aptNumber } = useParams<{ aptNumber: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/apartment-details/${aptNumber}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message));
  }, [aptNumber]);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  const { current, approved, waitlist } = data;

  const goToResident = (id: number, type: 'resident' | 'approved' | 'waitlist') => {
    if (type === 'resident') navigate(`/resident/${id}`);
    else if (type === 'approved') navigate(`/approvedresident/${id}`);
    else navigate(`/waitlist/${id}`);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl mb-4">Apartment {aptNumber}</h2>

      <div className="mb-3">
        <strong>Current Resident:</strong>{' '}
        {current ? (
          <button onClick={() => goToResident(current.resident_id, 'resident')}>
            {current.first_name} {current.last_name}
          </button>
        ) : (
          'None'
        )}
      </div>

      <div className="mb-3">
        <strong>Approved Resident:</strong>{' '}
        {approved ? (
          <button onClick={() => goToResident(approved.approved_id, 'approved')}>
            {approved.first_name} {approved.last_name}
          </button>
        ) : (
          'None'
        )}
      </div>

      <div>
        <strong>Resident Waitlist:</strong>{' '}
        {waitlist.length > 0 ? (
          waitlist.map((w: any) => (
            <button
              key={w.waitlist_id}
              onClick={() => goToResident(w.waitlist_id, 'waitlist')}
              className="mr-2"
            >
              {w.first_name} {w.last_name}
            </button>
          ))
        ) : (
          'None'
        )}
      </div>
    </div>
  );
};

export default ApartmentDetailPage;

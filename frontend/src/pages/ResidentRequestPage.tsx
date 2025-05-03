import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ResidentRequestPage() {
  const { id } = useParams();
  const [requestData, setRequestData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/user_maintenance_requests/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || 'Failed to fetch request');
        }
        return res.json();
      })
      .then(data => setRequestData(data))
      .catch(err => {
        console.error('Error fetching maintenance request:', err.message);
        setError(err.message);
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!requestData) return <p>Loading...</p>;

  const { request_id, resident_name, request_date, status, issue_apartment } = requestData;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-light mb-4">Resident Maintenance Request {request_id}</h2>
      <p className="text-lg">Resident: {resident_name}</p>
      <br />
      <p>Request made on {request_date}</p>
      <br />
      <p>Status: {status}</p>
      <br />
      <p>Apartment: {issue_apartment}</p>
    </div>
  );
}

export default ResidentRequestPage;

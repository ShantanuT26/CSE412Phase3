import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ApprovedResidentPage() {
  const { id } = useParams(); // This is the approved_id
  const [residentData, setResidentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/approved_resident/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const message = await res.text();
          throw new Error(message || 'Failed to fetch approved resident');
        }
        return res.json();
      })
      .then(data => setResidentData(data))
      .catch(err => {
        console.error('Error fetching approved resident:', err.message);
        setError(err.message);
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!residentData) return <p>Loading...</p>;

  const {
    first_name,
    last_name,
    email,
    phone_number,
    application_date,
    assigned_apartment,
    status
  } = residentData;

  return (
    <div>
      <h2>{first_name} {last_name}</h2>
      <p>Approved Resident</p>
      <p>Email Address: {email}</p>
      <p>Phone Number: {phone_number}</p>
      <p>Application Date: {application_date}</p>
      <p>Assigned Apartment: {assigned_apartment}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default ApprovedResidentPage;

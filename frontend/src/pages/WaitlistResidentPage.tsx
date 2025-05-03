import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function WaitlistResidentPage() {
  const { id } = useParams(); // waitlist_id
  const [resident, setResident] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/waitlist/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const message = await res.text();
          throw new Error(message || 'Failed to fetch waitlist resident');
        }
        return res.json();
      })
      .then(data => setResident(data))
      .catch(err => {
        console.error('Error fetching waitlist resident:', err.message);
        setError(err.message);
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!resident) return <p>Loading...</p>;

  const {
    first_name,
    last_name,
    email,
    phone_number,
    application_date,
    preferred_apartment,
    status
  } = resident;

  return (
    <div>
      <h2>{first_name} {last_name}</h2>
      <p>Email Address: {email}</p>
      <p>Phone Number: {phone_number}</p>
      <p>Application Date: {application_date}</p>
      <p>Preferred Apartment: {preferred_apartment}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default WaitlistResidentPage;

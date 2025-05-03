import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Define the types
interface Resident {
  resident_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  apt_number: string;
  lease_start: string;
  lease_end: string;
  rent_due: string;
}

interface MaintenanceRequest {
  request_id: number;
  issue_apartment: string;
  request_date: string;
  status: string;
}

interface ApiResponse {
  resident: Resident;
  maintenance_requests: MaintenanceRequest[];
}

function ResidentPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [residentData, setResidentData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/api/current_resident/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const message = await res.text();
          throw new Error(message || 'Failed to fetch resident');
        }
        return res.json();
      })
      .then((data: ApiResponse) => setResidentData(data))
      .catch(err => {
        console.error('Error fetching resident:', err.message);
        setError(err.message);
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!residentData) return <p>Loading...</p>;

  const { resident, maintenance_requests } = residentData;
  

  return (
    <div>
      <h2>{resident.first_name} {resident.last_name}</h2>
      <p>Email Address: {resident.email}</p>
      <p>Phone Number: {resident.phone_number}</p>
      <p>Apartment Number: {resident.apt_number}</p>
      <p>Lease Start Date: {resident.lease_start}</p>
      <p>Lease End Date: {resident.lease_end}</p>
      <p>Rent Due: {resident.rent_due}</p>

      <h3>Maintenance Requests:</h3>
      {maintenance_requests.length > 0 ? (
        maintenance_requests.map(req => (
          <button key={req.request_id} onClick={() => navigate(`/resident-request/${req.request_id}`)}>
              Request {req.request_id}
          </button>
        ))
      ) : (
        <p>No maintenance requests.</p>
      )}
    </div>
  );
}

export default ResidentPage;

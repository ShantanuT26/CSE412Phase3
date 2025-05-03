import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Request {
  request_id: number;
  location: string;
}

interface ApiResponse {
  staff_name: string;
  requests: Request[];
}

export default function StaffRequestsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/staff/${id}/requests`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-light mb-4">Staff Maintenance Requests</h2>
      <p className="mb-6">Staffer: <strong>{data.staff_name}</strong></p>

      {data.requests.map(req => (
        <button
          key={req.request_id}
          className="block bg-white py-2 px-4 rounded-lg shadow mb-4"
          onClick={() => navigate(`/community-requests/${req.request_id}`)}
        >
          Request {req.request_id}
        </button>
      ))}
    </div>
  );
}

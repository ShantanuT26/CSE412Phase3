import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ✅ Include staff_id in the interface
interface CommunityRequestDetail {
  resident_name: string;
  staff_name: string;
  staff_id: number;
  location: string;
}

function CommunityRequestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<CommunityRequestDetail | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/community_requests/${id}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Community Maintenance Request {id}</h2>

      <p><strong>Resident who requested:</strong> {data.resident_name}</p>

      <p>
        <strong>Staff who requested:</strong>{' '}
        <button onClick={() => navigate(`/staff/${data.staff_id}`)}>
          {data.staff_name}
        </button>
      </p>

      <p><strong>The location in question:</strong> {data.location}</p>
    </div>
  );
}

export default CommunityRequestDetail;

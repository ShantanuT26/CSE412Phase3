import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface CommunityRequest {
    request_id: number;
    resident_name: string;
    staff_name: string;
    location: string;
  }

function CommunityRequestsPage() {
  const [requests, setRequests] = useState<CommunityRequest[]>([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch('http://localhost:3001/api/community_requests')
      .then(res => res.json())
      .then(setRequests)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Community Maintenance Requests</h2>
      {requests.map(req => (
        <button key={req.request_id} onClick={() => navigate(`/community-requests/${req.request_id}`)}>
          Request {req.request_id}
        </button>
      ))}
    </div>
  );
}

export default CommunityRequestsPage;

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Staff {
  staff_id: number;
  name: string;
  role: string;
}

export default function StaffDetail() {
  const { id } = useParams<{ id: string }>();
  const [staff, setStaff] = useState<Staff | null>(null);
  const navigate = useNavigate();

  const goToMaintanence = (staff: Staff) =>
  {
    navigate(`/staff/${staff.staff_id}/requests`);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/staff/${id}`)
      .then(res => res.json())
      .then(data => setStaff(data))
      .catch(err => console.error('Error fetching staff:', err));
  }, [id]);

  if (!staff) return <p>Loading...</p>;

  return (
    <div>
      <h2>{staff.name}</h2>
      <p>Role: {staff.role}</p>
      <p>Maintenance Requests: <button onClick={()=>goToMaintanence(staff)}>View Maintenance Requests</button></p>
    </div>
  );
}

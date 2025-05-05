import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';


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

  // Request button style
  const requestButtonStyle = {
    ...commonStyles.components.button.secondary,
    margin: '0.5rem',
    padding: '0.75rem 1.25rem',
    width: '100%',
    textAlign: 'left' as const,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <motion.div 
      style={commonStyles.layout.pageContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={commonStyles.layout.container}>
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h2 
            style={commonStyles.fonts.heading}
          >
            Community Maintenance Requests
          </motion.h2>
          
          <motion.button
            style={commonStyles.components.button.home}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
          >
            Home
          </motion.button>
        </motion.div>
        
        <motion.div 
          style={commonStyles.components.card.container}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {requests.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {requests.map(req => (
                <motion.button 
                  key={req.request_id} 
                  style={requestButtonStyle as React.CSSProperties}
                  whileHover={{ 
                    scale: 1.01, 
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f7fafc"
                  }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(`/community-requests/${req.request_id}`)}
                >
                  <div>
                    <span style={{ fontWeight: 600 }}>Request {req.request_id}</span>
                    <div style={{ fontSize: '0.875rem', color: '#4a5568', marginTop: '0.25rem' }}>
                      <div>Resident: {req.resident_name}</div>
                      <div>Staff: {req.staff_name}</div>
                      <div>Location: {req.location}</div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
              No maintenance requests found.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CommunityRequestsPage;

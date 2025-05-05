import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

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

  if (!data) return (
    <div style={commonStyles.layout.pageContainer}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            fontSize: '1.25rem',
            color: commonStyles.colors.secondary,
            fontWeight: 500,
          }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );

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
    marginBottom: '0.75rem',
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
            Staff Maintenance Requests
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
          <motion.div
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              backgroundColor: '#ebf8ff',
              color: '#2c5282',
              fontWeight: 600,
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              border: '1px solid #bee3f8',
            }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Staff Member: {data.staff_name}
          </motion.div>
          
          <div style={{ marginTop: '1.5rem' }}>
            {data.requests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.requests.map(req => (
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
              <div style={{ 
                padding: '2rem', 
                textAlign: 'center' as const, 
                color: '#718096',
                backgroundColor: '#f7fafc',
                borderRadius: '0.5rem',
                border: '1px dashed #e2e8f0',
              }}>
                No maintenance requests found for this staff member.
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <motion.button
              style={commonStyles.components.button.secondary}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
            >
              Back
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

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

  // Loading and error states with modern styling
  if (error) return (
    <div style={commonStyles.layout.pageContainer}>
      <div style={{
        ...commonStyles.components.card.container,
        textAlign: 'center',
        padding: '2rem',
        maxWidth: '500px',
        margin: '4rem auto',
      } as React.CSSProperties}>
        <h2 style={commonStyles.fonts.subheading}>Error</h2>
        <p style={{...commonStyles.fonts.body, color: commonStyles.colors.danger, marginTop: '1rem'}}>{error}</p>
        <motion.button
          style={{...commonStyles.components.button.primary, marginTop: '1.5rem'}}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
        >
          Return Home
        </motion.button>
      </div>
    </div>
  );
  
  if (!residentData) return (
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

  const { resident, maintenance_requests } = residentData;
  

  // Info item style
  const infoItemStyle = {
    display: 'flex',
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
  } as React.CSSProperties;

  // Label style
  const labelStyle = {
    ...commonStyles.fonts.label,
    fontWeight: 600,
    minWidth: '180px',
  } as React.CSSProperties;

  // Value style
  const valueStyle = {
    ...commonStyles.fonts.body,
    fontWeight: 500,
  } as React.CSSProperties;

  // Request button style
  const requestButtonStyle = {
    ...commonStyles.components.button.secondary,
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
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
            {resident.first_name} {resident.last_name}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resident Information Card */}
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
              Current Resident
            </motion.div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <motion.div 
                style={infoItemStyle}
                whileHover={{ backgroundColor: '#edf2f7' }}
              >
                <span style={labelStyle}>Email Address:</span>
                <span style={valueStyle}>{resident.email}</span>
              </motion.div>
              
              <motion.div 
                style={infoItemStyle}
                whileHover={{ backgroundColor: '#edf2f7' }}
              >
                <span style={labelStyle}>Phone Number:</span>
                <span style={valueStyle}>{resident.phone_number}</span>
              </motion.div>
              
              <motion.div 
                style={infoItemStyle}
                whileHover={{ backgroundColor: '#edf2f7' }}
              >
                <span style={labelStyle}>Apartment Number:</span>
                <span style={valueStyle}>{resident.apt_number}</span>
              </motion.div>
              
              <motion.div 
                style={infoItemStyle}
                whileHover={{ backgroundColor: '#edf2f7' }}
              >
                <span style={labelStyle}>Lease Start Date:</span>
                <span style={valueStyle}>{resident.lease_start}</span>
              </motion.div>
              
              <motion.div 
                style={infoItemStyle}
                whileHover={{ backgroundColor: '#edf2f7' }}
              >
                <span style={labelStyle}>Lease End Date:</span>
                <span style={valueStyle}>{resident.lease_end}</span>
              </motion.div>
              
              <motion.div 
                style={infoItemStyle}
                whileHover={{ backgroundColor: '#edf2f7' }}
              >
                <span style={labelStyle}>Rent Due:</span>
                <span style={valueStyle}>{resident.rent_due}</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Maintenance Requests Card */}
          <motion.div 
            style={commonStyles.components.card.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.h3 
              style={{
                ...commonStyles.fonts.subheading,
                marginBottom: '1.5rem',
              }}
            >
              Maintenance Requests
            </motion.h3>
            
            {maintenance_requests.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {maintenance_requests.map(req => (
                  <motion.button 
                    key={req.request_id} 
                    style={requestButtonStyle as React.CSSProperties}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/resident-request/${req.request_id}`)}
                  >
                    <div style={{ textAlign: 'left' as const }}>
                      <div style={{ fontWeight: 600 }}>Request {req.request_id}</div>
                      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        <div>Location: {req.issue_apartment}</div>
                        <div>Date: {req.request_date}</div>
                        <div>
                          <span 
                            style={{
                              display: 'inline-block',
                              padding: '0.125rem 0.5rem',
                              borderRadius: '9999px',
                              backgroundColor: req.status === 'Completed' ? '#c6f6d5' : 
                                req.status === 'In Progress' ? '#bee3f8' : '#feebc8',
                              color: req.status === 'Completed' ? '#22543d' : 
                                req.status === 'In Progress' ? '#2a4365' : '#7b341e',
                              fontWeight: 600,
                              fontSize: '0.625rem',
                              marginTop: '0.25rem',
                            }}
                          >
                            {req.status}
                          </span>
                        </div>
                      </div>
                    </div>
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
                No maintenance requests found.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResidentPage;

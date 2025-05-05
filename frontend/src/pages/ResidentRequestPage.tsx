import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

function ResidentRequestPage() {
  const { id } = useParams();
  const [requestData, setRequestData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/user_maintenance_requests/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || 'Failed to fetch request');
        }
        return res.json();
      })
      .then(data => setRequestData(data))
      .catch(err => {
        console.error('Error fetching maintenance request:', err.message);
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
  
  if (!requestData) return (
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

  const { request_id, resident_name, request_date, status, issue_apartment } = requestData;

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

  // Get status badge style based on status
  const getStatusBadgeStyle = (status: string) => {
    let bgColor, textColor, borderColor;
    
    switch(status.toLowerCase()) {
      case 'completed':
        bgColor = '#c6f6d5';
        textColor = '#22543d';
        borderColor = '#9ae6b4';
        break;
      case 'in progress':
        bgColor = '#bee3f8';
        textColor = '#2a4365';
        borderColor = '#90cdf4';
        break;
      default:
        bgColor = '#feebc8';
        textColor = '#7b341e';
        borderColor = '#fbd38d';
    }
    
    return {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      backgroundColor: bgColor,
      color: textColor,
      fontWeight: 600,
      fontSize: '0.75rem',
      border: `1px solid ${borderColor}`,
    };
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
            Maintenance Request #{request_id}
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
            Resident Maintenance Request
          </motion.div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Resident:</span>
              <span style={valueStyle}>{resident_name}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Request Date:</span>
              <span style={valueStyle}>{request_date}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Apartment:</span>
              <span style={valueStyle}>{issue_apartment}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Status:</span>
              <motion.span 
                style={getStatusBadgeStyle(status)}
                whileHover={{ y: -1 }}
              >
                {status}
              </motion.span>
            </motion.div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <motion.button
              style={commonStyles.components.button.primary}
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

export default ResidentRequestPage;

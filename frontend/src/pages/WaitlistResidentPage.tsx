import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

function WaitlistResidentPage() {
  const { id } = useParams(); // waitlist_id
  const [resident, setResident] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
  
  if (!resident) return (
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

  const {
    first_name,
    last_name,
    email,
    phone_number,
    application_date,
    preferred_apartment,
    status
  } = resident;

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
            {first_name} {last_name}
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
              backgroundColor: '#fff0f5',
              color: '#702459',
              fontWeight: 600,
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              border: '1px solid #fbb6ce',
            }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Waitlist Resident
          </motion.div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Email Address:</span>
              <span style={valueStyle}>{email}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Phone Number:</span>
              <span style={valueStyle}>{phone_number}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Application Date:</span>
              <span style={valueStyle}>{application_date}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Preferred Apartment:</span>
              <span style={valueStyle}>{preferred_apartment}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Status:</span>
              <motion.span 
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: '#feebc8',
                  color: '#7b341e',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  border: '1px solid #fbd38d',
                }}
                whileHover={{ y: -1 }}
              >
                {status}
              </motion.span>
            </motion.div>
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

export default WaitlistResidentPage;

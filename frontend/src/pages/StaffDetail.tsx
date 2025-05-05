import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

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

  if (!staff) return (
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
            {staff.name}
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
            Staff Member
          </motion.div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Role:</span>
              <span style={valueStyle}>{staff.role}</span>
            </motion.div>
            
            <motion.div 
              style={infoItemStyle}
              whileHover={{ backgroundColor: '#edf2f7' }}
            >
              <span style={labelStyle}>Maintenance Requests:</span>
              <motion.button
                style={{
                  ...commonStyles.components.button.primary,
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToMaintanence(staff)}
              >
                View Maintenance Requests
              </motion.button>
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

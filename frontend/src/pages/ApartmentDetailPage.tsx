import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

interface Resident {
  resident_id: number;
  first_name: string;
  last_name: string;
}

const ApartmentDetailPage = () => {
  const { aptNumber } = useParams<{ aptNumber: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/apartment-details/${aptNumber}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message));
  }, [aptNumber]);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  const { current, approved, waitlist } = data;

  const goToResident = (id: number, type: 'resident' | 'approved' | 'waitlist') => {
    if (type === 'resident') navigate(`/resident/${id}`);
    else if (type === 'approved') navigate(`/approvedresident/${id}`);
    else navigate(`/waitlist/${id}`);
  };

  // Button style for resident links
  const residentButtonStyle = {
    ...commonStyles.components.button.secondary,
    margin: '0 0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
  };

  // Section style
  const sectionStyle = {
    marginBottom: '1.5rem',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
  };

  // Label style
  const labelStyle = {
    ...commonStyles.fonts.label,
    fontWeight: 700,
    marginRight: '0.5rem',
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
            Apartment {aptNumber}
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
            style={sectionStyle as React.CSSProperties}
            className="mb-4"
            whileHover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
          >
            <span style={labelStyle as React.CSSProperties}>Current Resident:</span>
            {current ? (
              <motion.button 
                style={residentButtonStyle as React.CSSProperties}
                whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToResident(current.resident_id, 'resident')}
              >
                {current.first_name} {current.last_name}
              </motion.button>
            ) : (
              <span style={commonStyles.fonts.body}>None</span>
            )}
          </motion.div>

          <motion.div 
            style={sectionStyle as React.CSSProperties}
            className="mb-4"
            whileHover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
          >
            <span style={labelStyle as React.CSSProperties}>Approved Resident:</span>
            {approved ? (
              <motion.button 
                style={residentButtonStyle as React.CSSProperties}
                whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToResident(approved.approved_id, 'approved')}
              >
                {approved.first_name} {approved.last_name}
              </motion.button>
            ) : (
              <span style={commonStyles.fonts.body}>None</span>
            )}
          </motion.div>

          <motion.div 
            style={sectionStyle as React.CSSProperties}
            whileHover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
          >
            <span style={labelStyle as React.CSSProperties}>Resident Waitlist:</span>
            {waitlist.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {waitlist.map((w: any) => (
                  <motion.button
                    key={w.waitlist_id}
                    style={residentButtonStyle as React.CSSProperties}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => goToResident(w.waitlist_id, 'waitlist')}
                  >
                    {w.first_name} {w.last_name}
                  </motion.button>
                ))}
              </div>
            ) : (
              <span style={commonStyles.fonts.body}>None</span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ApartmentDetailPage;

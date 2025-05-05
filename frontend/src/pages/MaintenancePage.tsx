import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

// Mock data for maintenance requests
const maintenanceRequests = [
  { id: 1, title: 'Broken Faucet', apartment: 'Apartment 2', status: 'Pending' },
  { id: 2, title: 'AC Not Working', apartment: 'Apartment 5', status: 'In Progress' },
  { id: 3, title: 'Leaking Roof', apartment: 'Apartment 1', status: 'Completed' },
  { id: 4, title: 'Electrical Issue', apartment: 'Apartment 7', status: 'Pending' },
];

const MaintenancePage: React.FC = () => {
  // Status badge style mapping
  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case 'Completed':
        return { ...commonStyles.components.badge.base, ...commonStyles.components.badge.success };
      case 'In Progress':
        return { ...commonStyles.components.badge.base, ...commonStyles.components.badge.info };
      default:
        return { ...commonStyles.components.badge.base, ...commonStyles.components.badge.warning };
    }
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
          className="flex justify-end mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to="/">
            <motion.button
              style={commonStyles.components.button.home}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              Home
            </motion.button>
          </Link>
        </motion.div>
        
        <motion.div 
          style={commonStyles.components.card.container}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h2 
            style={commonStyles.fonts.heading}
            className="mb-6"
          >
            Community Maintenance Requests
          </motion.h2>
          
          <div className="overflow-x-auto">
            <table style={commonStyles.components.table.container}>
              <thead>
                <tr>
                  <th style={{
                    ...commonStyles.components.table.headerCell,
                    ...commonStyles.components.table.header
                  }}>Request</th>
                  <th style={{
                    ...commonStyles.components.table.headerCell,
                    ...commonStyles.components.table.header
                  }}>Apartment</th>
                  <th style={{
                    ...commonStyles.components.table.headerCell,
                    ...commonStyles.components.table.header
                  }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRequests.map((request) => (
                  <motion.tr 
                    key={request.id} 
                    style={commonStyles.components.table.row}
                    whileHover={{
                      backgroundColor: "#f7fafc",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <td style={{
                      ...commonStyles.components.table.cell,
                      fontWeight: 500
                    }}>{request.title}</td>
                    <td style={commonStyles.components.table.cell}>{request.apartment}</td>
                    <td style={commonStyles.components.table.cell}>
                      <span style={getStatusBadgeStyle(request.status)}>
                        {request.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MaintenancePage;

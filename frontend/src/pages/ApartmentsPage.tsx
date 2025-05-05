// import React from 'react';
// import { Link } from 'react-router-dom';

// // Mock data for apartments
// const apartmentList = [
//   { id: 1, name: 'Apartment 1' },
//   { id: 2, name: 'Apartment 2' },
//   { id: 3, name: 'Apartment 3' },
//   { id: 4, name: 'Apartment 4' },
//   { id: 5, name: 'Apartment 5' },
//   { id: 6, name: 'Apartment 6' },
//   { id: 7, name: 'Apartment 7' },
//   { id: 8, name: 'Apartment 8' },
// ];

// const ApartmentsPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-end mb-8">
//           <Link 
//             to="/" 
//             className="bg-blue-600 py-3 px-8 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 text-white font-semibold border-2 border-blue-700 transform hover:-translate-y-1"
//           >
//             Home
//           </Link>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-200">
//           <h2 className="text-3xl font-bold mb-6 text-blue-800">Search Apartments</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {apartmentList.map((apartment) => (
//               <div key={apartment.id} className="p-4 border-2 border-blue-100 rounded-lg hover:border-blue-400 transition-all duration-200 bg-blue-50 hover:bg-blue-100">
//                 <Link 
//                   to={`/apartments/${apartment.id}`}
//                   className="flex items-center justify-between text-blue-700 hover:text-blue-900 font-medium text-lg"
//                 >
//                   <span>{apartment.name}</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApartmentsPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { commonStyles } from '../styles/commonStyles';

const ApartmentListPage = () => {
  const navigate = useNavigate();

  const handleClick = (aptNumber: number) => {
    navigate(`/apartment/${aptNumber}`);
  };

  const apartments = Array.from({ length: 100 }, (_, i) => i + 1);

  // Grid layout for apartments
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '1rem',
  };

  // Apartment item style
  const apartmentItemStyle = {
    ...commonStyles.components.button.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: '60px',
    width: '100%',
    padding: '0.5rem',
    fontWeight: 600,
    fontSize: '1rem',
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
            Search Apartments
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
          <div style={gridContainerStyle}>
            {apartments.map(num => (
              <motion.div
                key={num}
                style={apartmentItemStyle as React.CSSProperties}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f7fafc"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleClick(num)}
              >
                {num}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ApartmentListPage;

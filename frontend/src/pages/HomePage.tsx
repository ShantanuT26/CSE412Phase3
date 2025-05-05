import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  
  // Button styles as objects for consistency
  const buttonStyle = {
    fontFamily: "sans-serif",
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "#1a202c"
  };
  
  const welcomeStyle = {
    fontFamily: "sans-serif",
    fontWeight: 700,
    fontSize: "3.75rem",
    color: "#1a202c"
  };

  


  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <AnimatePresence>
        <motion.div
          className="flex flex-col items-center w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top section with buttons */}
          <motion.div 
            className="flex flex-col md:flex-row gap-12 w-full justify-center mb-32"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.button
              className="w-full max-w-sm rounded-full bg-white py-5 px-10 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              style={buttonStyle}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/apartments")}
            >
              View Apartments
            </motion.button>

            <motion.button
              className="w-full max-w-sm rounded-full bg-white py-5 px-10 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              style={buttonStyle}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/community-requests")}
            >
              View Community
              <br />
              Maintenance Requests
            </motion.button>
          </motion.div>

          {/* Welcome text */}
          <motion.h1
            className="text-6xl"
            style={welcomeStyle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Welcome!
          </motion.h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Welcome;

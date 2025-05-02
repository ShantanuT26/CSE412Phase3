import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for apartments
const apartmentList = [
  { id: 1, name: 'Apartment 1' },
  { id: 2, name: 'Apartment 2' },
  { id: 3, name: 'Apartment 3' },
  { id: 4, name: 'Apartment 4' },
  { id: 5, name: 'Apartment 5' },
  { id: 6, name: 'Apartment 6' },
  { id: 7, name: 'Apartment 7' },
  { id: 8, name: 'Apartment 8' },
];

const ApartmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8">
          <Link 
            to="/" 
            className="bg-blue-600 py-3 px-8 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 text-white font-semibold border-2 border-blue-700 transform hover:-translate-y-1"
          >
            Home
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-200">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Search Apartments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apartmentList.map((apartment) => (
              <div key={apartment.id} className="p-4 border-2 border-blue-100 rounded-lg hover:border-blue-400 transition-all duration-200 bg-blue-50 hover:bg-blue-100">
                <Link 
                  to={`/apartments/${apartment.id}`}
                  className="flex items-center justify-between text-blue-700 hover:text-blue-900 font-medium text-lg"
                >
                  <span>{apartment.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentsPage;

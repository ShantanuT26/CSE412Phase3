import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for maintenance requests
const maintenanceRequests = [
  { id: 1, title: 'Broken Faucet', apartment: 'Apartment 2', status: 'Pending' },
  { id: 2, title: 'AC Not Working', apartment: 'Apartment 5', status: 'In Progress' },
  { id: 3, title: 'Leaking Roof', apartment: 'Apartment 1', status: 'Completed' },
  { id: 4, title: 'Electrical Issue', apartment: 'Apartment 7', status: 'Pending' },
];

const MaintenancePage: React.FC = () => {
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
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Community Maintenance Requests</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">Request</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">Apartment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {maintenanceRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-6 py-5 whitespace-nowrap text-md font-medium text-blue-700">{request.title}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-md text-blue-700">{request.apartment}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-medium
                        ${request.status === 'Completed' ? 'bg-green-100 text-green-800 border border-green-300' : 
                          request.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 
                          'bg-yellow-100 text-yellow-800 border border-yellow-300'}`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;

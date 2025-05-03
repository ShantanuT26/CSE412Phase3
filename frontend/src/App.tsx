import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResidentPage from './pages/ResidentPage';
import ApprovedResidentPage from './pages/ApprovedResidentPage';
import WaitlistResidentPage from './pages/WaitlistResidentPage';
import ResidentRequestPage from './pages/ResidentRequestPage';
import ApartmentDetailPage from './pages/ApartmentDetailPage';
import CommunityRequestDetail from './pages/CommunityRequestDetail';
import CommunityRequestsPage from './pages/CommunityRequestsPage';
import StaffDetail from './pages/StaffDetail';
import StaffRequestsPage from './pages/StaffRequestsPage';
import './App.css'

// Import our pages
import HomePage from './pages/HomePage'
import ApartmentsPage from './pages/ApartmentsPage'
import MaintenancePage from './pages/MaintenancePage'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments" element={<ApartmentsPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/resident/:id" element={<ResidentPage />} />
          <Route path="/approvedresident/:id" element={<ApprovedResidentPage />} />
          <Route path="/waitlist/:id" element={<WaitlistResidentPage />} />
          <Route path="/resident-request/:id" element={<ResidentRequestPage />} />
          <Route path="/apartment/:aptNumber" element={<ApartmentDetailPage />} />
          <Route path="/community-requests" element={<CommunityRequestsPage />} />
          <Route path="/community-requests/:id" element={<CommunityRequestDetail />} />
          <Route path="/staff/:id" element={<StaffDetail />} />
          <Route path="/staff/:id/requests" element={<StaffRequestsPage />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App

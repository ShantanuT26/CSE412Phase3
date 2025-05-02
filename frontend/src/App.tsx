import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
        </Routes>
      </div>
    </Router>
  )
}

export default App

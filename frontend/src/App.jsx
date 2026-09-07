import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Kyc from './pages/Kyc';
import Beneficiaries from './pages/Beneficiaries';
import SendMoney from './pages/SendMoney';
import Transactions from './pages/Transactions';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function Shell({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-dot" />
          <span>NEXORA</span>
        </div>
        <nav className="nav-links">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/send" className={`nav-item ${location.pathname === '/send' ? 'active' : ''}`}>Send Money</Link>
          <Link to="/beneficiaries" className={`nav-item ${location.pathname === '/beneficiaries' ? 'active' : ''}`}>Beneficiaries</Link>
          <Link to="/kyc" className={`nav-item ${location.pathname === '/kyc' ? 'active' : ''}`}>KYC Portal</Link>
          <Link to="/transactions" className={`nav-item ${location.pathname === '/transactions' ? 'active' : ''}`}>History</Link>
        </nav>
        <div className="nav-footer">
          <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%' }}>Sign Out</button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="topbar">
          <div className="user-profile">
            <div className="avatar">N</div>
            <span>Nida (Verified)</span>
          </div>
        </header>
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/kyc" element={<ProtectedRoute><Kyc /></ProtectedRoute>} />
          <Route path="/beneficiaries" element={<ProtectedRoute><Beneficiaries /></ProtectedRoute>} />
          <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

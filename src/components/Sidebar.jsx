import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Hide sidebar on landing and auth pages
  const authPages = ['/', '/login', '/register', '/admin/login', '/admin/register', '/forgot-password'];
  if (!user || authPages.includes(location.pathname)) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p className="profile-role">{user.role === 'admin' ? 'Admin' : 'Citizen'}</p>
          <p className="profile-location">{user.location || 'Location not set'}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link 
          to="/dashboard" 
          className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <span className="icon">🏠</span>
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/petitions" 
          className={`sidebar-link ${isActive('/petitions') ? 'active' : ''}`}
        >
          <span className="icon">📝</span>
          <span>Petitions</span>
        </Link>
        
        <Link 
          to="/polls" 
          className={`sidebar-link ${isActive('/polls') ? 'active' : ''}`}
        >
          <span className="icon">📊</span>
          <span>Polls</span>
        </Link>
        
        <Link 
          to="/reports" 
          className={`sidebar-link ${isActive('/reports') ? 'active' : ''}`}
        >
          <span className="icon">📈</span>
          <span>Reports</span>
        </Link>

        <div className="sidebar-divider"></div>
        
        <Link 
          to="/profile" 
          className={`sidebar-link ${isActive('/profile') ? 'active' : ''}`}
        >
          <span className="icon">👤</span>
          <span>Profile</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={`sidebar-link ${isActive('/settings') ? 'active' : ''}`}
        >
          <span className="icon">⚙️</span>
          <span>Settings</span>
        </Link>
        
        <Link 
          to="/help" 
          className={`sidebar-link ${isActive('/help') ? 'active' : ''}`}
        >
          <span className="icon">❓</span>
          <span>Help & Support</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

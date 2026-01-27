import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <nav className="navbar">
        <Link to="/" className="nav-brand">CivicX Platform</Link>
        <div className="navv-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin/login">Admin</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-brand">CivicX Platform</Link>
      <div className="nav-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/petitions">Petitions</Link>
        <Link to="/polls">Polls</Link>
        <Link to="/reports">Reports</Link>
      </div>
      <div className="nav-user">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

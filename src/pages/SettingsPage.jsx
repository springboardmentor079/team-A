import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import axios from '../api/axios';
import './SettingsPage.css';

const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('password');
  const [message, setMessage] = useState({ type: '', text: '' });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to change password' 
      });
      
      // Auto-dismiss error after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setMessage({ type: 'success', text: `Theme changed to ${newTheme} mode` });
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences</p>
        </div>

        <div className="settings-content">
          <div className="settings-sidebar">
            <button 
              className={activeTab === 'password' ? 'sidebar-btn active' : 'sidebar-btn'}
              onClick={() => setActiveTab('password')}
            >
              <span className="icon">🔒</span>
              Password
            </button>
            <button 
              className={activeTab === 'appearance' ? 'sidebar-btn active' : 'sidebar-btn'}
              onClick={() => setActiveTab('appearance')}
            >
              <span className="icon">🎨</span>
              Appearance
            </button>
            <button 
              className={activeTab === 'preferences' ? 'sidebar-btn active' : 'sidebar-btn'}
              onClick={() => setActiveTab('preferences')}
            >
              <span className="icon">⚙️</span>
              Preferences
            </button>
          </div>

          <div className="settings-main">
            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            {activeTab === 'password' && (
              <div className="settings-section">
                <h2>Change Password</h2>
                <p className="section-desc">Ensure your account is using a strong password</p>
                
                <form onSubmit={handlePasswordChange}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password (min 6 characters)"
                      required
                      minLength="6"
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      required
                      minLength="6"
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h2>Appearance</h2>
                <p className="section-desc">Customize how the platform looks for you</p>
                
                <div className="theme-selector">
                  <div className="theme-option">
                    <div className="theme-preview light-preview">
                      <div className="preview-header"></div>
                      <div className="preview-content"></div>
                    </div>
                    <div className="theme-info">
                      <h3>Light Mode</h3>
                      <p>Clean and bright interface</p>
                    </div>
                    <button 
                      className={theme === 'light' ? 'theme-btn active' : 'theme-btn'}
                      onClick={() => handleThemeChange('light')}
                    >
                      {theme === 'light' ? '✓ Active' : 'Activate'}
                    </button>
                  </div>

                  <div className="theme-option">
                    <div className="theme-preview dark-preview">
                      <div className="preview-header"></div>
                      <div className="preview-content"></div>
                    </div>
                    <div className="theme-info">
                      <h3>Dark Mode</h3>
                      <p>Easy on the eyes in low light</p>
                    </div>
                    <button 
                      className={theme === 'dark' ? 'theme-btn active' : 'theme-btn'}
                      onClick={() => handleThemeChange('dark')}
                    >
                      {theme === 'dark' ? '✓ Active' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="settings-section">
                <h2>Preferences</h2>
                <p className="section-desc">Manage your platform preferences</p>
                
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Email Notifications</h3>
                    <p>Receive email updates about your petitions and polls</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Show Profile Publicly</h3>
                    <p>Allow others to see your profile information</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Activity Status</h3>
                    <p>Show when you're active on the platform</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

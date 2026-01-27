import { useState, useEffect } from 'react';
import axios from '../api/axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/dashboard/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>My Petitions</h3>
          <p className="stat-number">{stats?.stats.myPetitions || 0}</p>
        </div>
        <div className="stat-card">
          <h3>My Polls</h3>
          <p className="stat-number">{stats?.stats.myPolls || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Successful Petitions</h3>
          <p className="stat-number">{stats?.stats.successfulPetitions || 0}</p>
        </div>
      </div>

      <div className="recent-section">
        <h2>My Petitions</h2>
        <div className="list">
          {stats?.myPetitions && stats.myPetitions.length > 0 ? (
            stats.myPetitions.map(petition => (
              <div key={petition._id} className="list-item">
                <h4>{petition.title}</h4>
                <p>{petition.signatures.length}/{petition.targetSignatures} signatures • {petition.status}</p>
              </div>
            ))
          ) : (
            <p className="empty-message">No petitions created yet</p>
          )}
        </div>
      </div>

      <div className="recent-section">
        <h2>My Polls</h2>
        <div className="list">
          {stats?.myPolls && stats.myPolls.length > 0 ? (
            stats.myPolls.map(poll => (
              <div key={poll._id} className="list-item">
                <h4>{poll.question}</h4>
                <p>Status: {poll.status}</p>
              </div>
            ))
          ) : (
            <p className="empty-message">No polls created yet</p>
          )}
        </div>
      </div>

      <div className="recent-section">
        <h2>Successful Petitions</h2>
        <div className="list">
          {stats?.successfulPetitions && stats.successfulPetitions.length > 0 ? (
            stats.successfulPetitions.map(petition => (
              <div key={petition._id} className="list-item">
                <h4>{petition.title}</h4>
                <p>Created by: {petition.createdBy?.name || 'Unknown'} • Status: Achieved ✓</p>
              </div>
            ))
          ) : (
            <p className="empty-message">No achieved petitions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

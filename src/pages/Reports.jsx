import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './Reports.css';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get('/dashboard/analytics');
      setStats(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

  return (
    <div className="reports">
      <h1>Reports & Analysis</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Petitions</h3>
          <p className="stat-number">{stats?.totalPetitions || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Polls</h3>
          <p className="stat-number">{stats?.totalPolls || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Signed Petitions</h3>
          <p className="stat-number">{stats?.totalSignedPetitions || 0}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Petition Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.petitionStatusData || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {(stats?.petitionStatusData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Poll Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.pollStatusData || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {(stats?.pollStatusData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;

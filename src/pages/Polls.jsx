import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import './Polls.css';

const Polls = () => {
  const { user } = useContext(AuthContext);
  const [polls, setPolls] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    category: 'Transport',
    location: '',
    endDate: '',
    options: ['', '']
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchPolls();
  }, [searchTerm, categoryFilter, statusFilter, locationFilter, activeTab]);

  const fetchPolls = async () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (categoryFilter) params.append('category', categoryFilter);
    if (statusFilter) params.append('status', statusFilter);
    if (locationFilter) params.append('location', locationFilter);
    if (activeTab === 'my') params.append('createdBy', user._id);
    
    const { data } = await axios.get(`/polls?${params.toString()}`);
    setPolls(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/polls', formData);
      setShowForm(false);
      setFormData({ 
        question: '', 
        description: '', 
        category: 'Transport',
        location: '',
        endDate: '',
        options: ['', ''] 
      });
      fetchPolls();
    } catch (error) {
      console.error('Error creating poll:', error);
      alert(error.response?.data?.message || 'Error creating poll');
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      await axios.post(`/polls/${pollId}/vote`, { optionIndex });
      fetchPolls();
    } catch (error) {
      alert(error.response?.data?.message || 'Error voting');
    }
  };

  const addOption = () => {
    setFormData({...formData, options: [...formData.options, '']});
  };

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  };

  const categories = ['Transport', 'Education', 'Safety', 'Women Safety', 'Healthcare', 'Environment', 'Infrastructure', 'Employment', 'Housing', 'Other'];

  return (
    <div className="polls">
      <div className="header">
        <h1>Polls</h1>
        <button onClick={() => setShowForm(!showForm)}>Create Poll</button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Polls
        </button>
        <button 
          className={`tab ${activeTab === 'my' ? 'active' : ''}`}
          onClick={() => setActiveTab('my')}
        >
          My Polls
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search polls..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="📍 Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="search-input"
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {showForm && (
        <form className="poll-form" onSubmit={handleSubmit}>
          <input
            placeholder="Question"
            value={formData.question}
            onChange={(e) => setFormData({...formData, question: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
          <div>
            <label>End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          {formData.options.map((opt, idx) => (
            <input
              key={idx}
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...formData.options];
                newOpts[idx] = e.target.value;
                setFormData({...formData, options: newOpts});
              }}
              required
            />
          ))}
          <button type="button" onClick={addOption}>Add Option</button>
          <button type="submit">Create Poll</button>
        </form>
      )}

      <div className="polls-list">
        {polls.map(poll => {
          const expired = isExpired(poll.endDate);
          return (
            <div key={poll._id} className={`poll-card ${expired ? 'expired' : ''}`}>
              <div className="poll-header">
                <span className="category-badge">{poll.category}</span>
                <span className="location-badge">📍 {poll.location}</span>
              </div>
              <h3>{poll.question}</h3>
              <p>{poll.description}</p>
              <div className="poll-meta">
                <span className={`time-remaining ${expired ? 'expired' : ''}`}>
                  {getTimeRemaining(poll.endDate)}
                </span>
                <span className="status-badge">{poll.status}</span>
              </div>
              <div className="poll-options">
                {poll.options.map((option, idx) => (
                  <div key={idx} className="poll-option">
                    <button 
                      onClick={() => handleVote(poll._id, idx)}
                      disabled={expired}
                    >
                      {option.text}
                    </button>
                    <span>{option.votes.length} votes</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Polls;

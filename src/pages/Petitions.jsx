import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import './Petitions.css';

const CATEGORIES = [
  'Transport', 'Education', 'Safety', 'Women Safety', 
  'Healthcare', 'Environment', 'Infrastructure', 
  'Employment', 'Housing', 'Other'
];

const Petitions = () => {
  const { user } = useContext(AuthContext);
  const [petitions, setPetitions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showShareMenu, setShowShareMenu] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Transport',
    location: '',
    endDate: '',
    targetSignatures: 100
  });

  useEffect(() => {
    fetchPetitions();
  }, [searchTerm, filterCategory, filterStatus, filterLocation, activeTab]);

  const fetchPetitions = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterCategory !== 'All') params.append('category', filterCategory);
      if (filterStatus !== 'All') params.append('status', filterStatus);
      if (filterLocation) params.append('location', filterLocation);
      if (activeTab === 'my') params.append('createdBy', user._id);
      
      const { data } = await axios.get(`/petitions?${params.toString()}`);
      setPetitions(data);
    } catch (error) {
      console.error('Error fetching petitions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/petitions', formData);
      setFormData({
        title: '',
        description: '',
        category: 'Transport',
        location: '',
        endDate: '',
        targetSignatures: 100
      });
      setShowForm(false);
      fetchPetitions();
    } catch (error) {
      console.error('Error creating petition:', error);
    }
  };

  const handleSign = async (id) => {
    try {
      await axios.post(`/petitions/${id}/sign`);
      fetchPetitions();
    } catch (error) {
      alert(error.response?.data?.message || 'Error signing petition');
    }
  };

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getDaysRemaining = (endDate) => {
    const days = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleShare = (petition) => {
    setShowShareMenu(showShareMenu === petition._id ? null : petition._id);
  };

  const copyLink = (petition) => {
    const url = `${window.location.origin}/petitions/${petition._id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
    setShowShareMenu(null);
  };

  const shareToWhatsApp = (petition) => {
    const url = `${window.location.origin}/petitions/${petition._id}`;
    const text = `Check out this petition: ${petition.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareToTwitter = (petition) => {
    const url = `${window.location.origin}/petitions/${petition._id}`;
    const text = `Support this petition: ${petition.title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToFacebook = (petition) => {
    const url = `${window.location.origin}/petitions/${petition._id}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="petitions">
      <div className="header">
        <h1>Petitions</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Petition'}
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Petitions
        </button>
        <button 
          className={`tab ${activeTab === 'my' ? 'active' : ''}`}
          onClick={() => setActiveTab('my')}
        >
          My Petitions
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="🔍 Search petitions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <input
          type="text"
          placeholder="📍 Filter by location..."
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="achieved">Achieved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="petition-form">
          <h3>Create New Petition</h3>
          <input
            type="text"
            placeholder="Petition Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <div className="form-field">
            <label>End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="form-field">
            <label>Target Signatures</label>
            <input
              type="number"
              placeholder="Enter target number of signatures"
              value={formData.targetSignatures}
              onChange={(e) => setFormData({ ...formData, targetSignatures: e.target.value })}
              min="1"
              required
            />
          </div>
            required
          />
          <button type="submit">Create Petition</button>
        </form>
      )}

      <div className="petitions-list">
        {petitions.map((petition) => (
          <div key={petition._id} className="petition-card">
            <div className="petition-header">
              <h3>{petition.title}</h3>
              <span className={`category-badge ${petition.category.toLowerCase().replace(' ', '-')}`}>
                {petition.category}
              </span>
            </div>
            <p>{petition.description}</p>
            <div className="petition-meta">
              <span>📍 {petition.location}</span>
              <span>👤 By: {petition.createdBy?.name}</span>
            </div>
            <div className="petition-meta">
              <span>✍️ {petition.signatures?.length || 0} / {petition.targetSignatures} signatures</span>
              <span className={`status ${petition.status}`}>{petition.status}</span>
            </div>
            <div className="petition-meta">
              {isExpired(petition.endDate) ? (
                <span className="expired">⏰ Expired</span>
              ) : (
                <span className="days-remaining">
                  ⏰ {getDaysRemaining(petition.endDate)} days remaining
                </span>
              )}
              <span>📅 Ends: {new Date(petition.endDate).toLocaleDateString()}</span>
            </div>
            <div className="petition-actions">
              {petition.status === 'active' && !isExpired(petition.endDate) && (
                <button onClick={() => handleSign(petition._id)} className="sign-btn">Sign Petition</button>
              )}
              <div className="share-container">
                <button onClick={() => handleShare(petition)} className="share-btn">
                  🔗 Share
                </button>
                {showShareMenu === petition._id && (
                  <div className="share-menu">
                    <button onClick={() => copyLink(petition)} className="share-option">
                      📋 Copy Link
                    </button>
                    <button onClick={() => shareToWhatsApp(petition)} className="share-option whatsapp">
                      💬 WhatsApp
                    </button>
                    <button onClick={() => shareToTwitter(petition)} className="share-option twitter">
                      🐦 Twitter
                    </button>
                    <button onClick={() => shareToFacebook(petition)} className="share-option facebook">
                      📘 Facebook
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Petitions;

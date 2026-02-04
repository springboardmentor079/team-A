import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import { getCurrentLocation } from "../utils/geolocation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Polls.css";

const Polls = () => {
  const { user } = useContext(AuthContext);

  const [polls, setPolls] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    description: "",
    category: "Transport",
    location: "",
    endDate: "",
    options: ["", ""],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    "Transport",
    "Education",
    "Safety",
    "Women Safety",
    "Healthcare",
    "Environment",
    "Infrastructure",
    "Employment",
    "Housing",
    "Other",
  ];

  useEffect(() => {
    fetchPolls();
  }, [searchTerm, categoryFilter, statusFilter, locationFilter, activeTab]);

  /* -------------------- HELPERS -------------------- */

  const fetchPolls = async () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (categoryFilter) params.append("category", categoryFilter);
    if (statusFilter) params.append("status", statusFilter);
    if (locationFilter) params.append("location", locationFilter);
    if (activeTab === "my") params.append("createdBy", user?._id);

    const { data } = await axios.get(`/polls?${params.toString()}`);
    setPolls(data);
  };

  const handleGetLocation = async () => {
    setLoadingLocation(true);
    try {
      const location = await getCurrentLocation();
      setFormData({ ...formData, location });
    } catch (err) {
      console.log("Location access denied");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/polls", formData);
    setShowForm(false);
    setFormData({
      question: "",
      description: "",
      category: "Transport",
      location: "",
      endDate: "",
      options: ["", ""],
    });
    fetchPolls();
  };

  const handleVote = async (pollId, optionIndex) => {
    await axios.post(
      `/polls/${pollId}/vote`,
      { optionIndex },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchPolls(); // refresh results + graph
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const isExpired = (endDate) => new Date(endDate) < new Date();

  const getTimeRemaining = (endDate) => {
    const diff = new Date(endDate) - new Date();
    if (diff <= 0) return "Expired";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return days > 0 ? `${days} days left` : `${hours} hours left`;
  };

  const getUserVoteIndex = (poll) => {
    for (let i = 0; i < poll.options.length; i++) {
      if (poll.options[i].votes.some((v) => v.user === user?._id)) {
        return i;
      }
    }
    return null;
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="polls">
      <div className="header">
        <h1>Polls</h1>
        <button onClick={() => setShowForm(!showForm)}>Create Poll</button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Polls
        </button>
        <button
          className={`tab ${activeTab === "my" ? "active" : ""}`}
          onClick={() => setActiveTab("my")}
        >
          My Polls
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          className="search-input"
          placeholder="🔍 Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          className="search-input"
          placeholder="📍 Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Create Poll */}
      {showForm && (
        <form className="poll-form" onSubmit={handleSubmit}>
          <input
            placeholder="Question"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <button type="button" onClick={handleGetLocation}>
            📍 Current Location
          </button>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
          />

          {formData.options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const copy = [...formData.options];
                copy[i] = e.target.value;
                setFormData({ ...formData, options: copy });
              }}
              required
            />
          ))}

          <div className="poll-form-actions">
            <button type="button" onClick={addOption}>
              Add Option
            </button>
            <button type="submit">Create Poll</button>
          </div>
        </form>
      )}

      {/* Poll List */}
      <div className="polls-list">
        {polls.map((poll) => {
          const expired = isExpired(poll.endDate);
          const selectedIndex = getUserVoteIndex(poll);

          return (
            <div key={poll._id} className="poll-card">
              <div className="poll-header">
                <span className="category-badge">{poll.category}</span>
                <span className="location-badge">📍 {poll.location}</span>
              </div>

              <h3>{poll.question}</h3>
              <p>{poll.description}</p>

              <div className="poll-meta">
                <span className={`time-remaining ${expired ? "expired" : ""}`}>
                  {getTimeRemaining(poll.endDate)}
                </span>
                <span className="status-badge">{poll.status}</span>
              </div>

              {/* OPTIONS */}
              <div className="poll-options">
                {poll.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`poll-option ${
                      selectedIndex === idx ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`poll-${poll._id}`}
                      checked={selectedIndex === idx}
                      onChange={() => handleVote(poll._id, idx)}
                      disabled={expired}
                    />
                    <span>{opt.text}</span>
                    <span>{opt.votes.length} votes</span>
                  </label>
                ))}
              </div>

              {/* GRAPH */}
              <div style={{ marginTop: "1.5rem" }}>
                <h4>Poll Results</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={poll.options.map((o) => ({
                      name: o.text,
                      votes: o.votes.length,
                    }))}
                  >
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="votes"
                      fill="#667eea"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Polls;

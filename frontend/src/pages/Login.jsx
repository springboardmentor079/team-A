import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields");
    localStorage.setItem("user", email);
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card premium">

        <div
          className="auth-image"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1760872645824-49f21b002e61?w=600&auto=format&fit=crop&q=60')",
          }}
        >
          <div className="image-overlay">
            <h3>Civix</h3>
            <p>Your voice in governance</p>
          </div>
        </div>

        <div className="auth-form">
          <h2>Welcome to Civix</h2>
          <p className="subtitle">Digital Civic Engagement Platform</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Sign In</button>
          </form>

          <p className="switch">
            Don’t have an account? <Link to="/register">Register now</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;

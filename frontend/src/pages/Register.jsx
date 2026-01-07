import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    role: "citizen",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password)
      return alert("Fill all required fields");
    localStorage.setItem("user", form.email);
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
            <p>Participate. Petition. Progress.</p>
          </div>
        </div>

        <div className="auth-form">
          <h2>Create Account</h2>
          <p className="subtitle">Join Civix and raise your voice</p>

          <form onSubmit={handleRegister}>
            <input name="name" placeholder="Full Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />

            <div className="role-box">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="citizen"
                  checked={form.role === "citizen"}
                  onChange={handleChange}
                />
                Citizen
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="official"
                  onChange={handleChange}
                />
                Public Official
              </label>
            </div>

            <button type="submit">Create Account</button>
          </form>

          <p className="switch">
            Already registered? <Link to="/">Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;

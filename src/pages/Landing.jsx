import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <header className="hero">
        <div className="hero-content">
          <h1>CivicX Platform</h1>
          <p className="tagline">Empowering Citizens, Strengthening Democracy</p>
          <p className="subtitle">Your voice matters. Create petitions, participate in polls, and report community issues.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/admin/login" className="btn btn-secondary">Admin Login</Link>
          </div>
        </div>
      </header>

      <section className="features">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Create Petitions</h3>
            <p>Start petitions on issues that matter to you. Gather signatures from the community and make your voice heard by officials.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗳️</div>
            <h3>Participate in Polls</h3>
            <p>Vote on community polls and see real-time results. Help shape decisions that affect your neighborhood.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📢</div>
            <h3>Report Issues</h3>
            <p>Report local problems with photos and descriptions. Track the status of your reports and see them get resolved.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your petitions, polls, and reports from a unified dashboard. Stay updated on community engagement.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up with your email in seconds</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Engage</h3>
            <p>Create petitions, vote on polls, or report issues</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Make Impact</h3>
            <p>See your contributions create real change</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About CivicX</h2>
        <div className="about-content">
          <p>
            CivicX is a digital civic engagement platform designed to bridge the gap between citizens and their communities. 
            We believe that every voice deserves to be heard and every issue deserves attention.
          </p>
          <p>
            Our platform provides the tools you need to participate in local democracy, from creating and signing petitions 
            to voting on community polls and reporting issues that need attention. Together, we can build stronger, 
            more responsive communities.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of citizens making their communities better</p>
        <Link to="/register" className="btn btn-large">Join CivicX Today</Link>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 CivicX Platform. Empowering civic engagement.</p>
      </footer>
    </div>
  );
};

export default Landing;

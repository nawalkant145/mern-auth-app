import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🔐', title: 'JWT Auth', desc: 'Secure access & refresh token flow with httpOnly cookies' },
  { icon: '🛡️', title: 'Protected Routes', desc: 'Frontend & backend route guards keeping your data safe' },
  { icon: '⚡', title: 'Real-time Feedback', desc: 'Instant validation, toasts, and loading states throughout' },
  { icon: '🗄️', title: 'MongoDB Atlas', desc: 'Cloud database with Mongoose schemas and bcrypt hashing' },
  { icon: '♻️', title: 'Silent Refresh', desc: 'Auto token renewal via Axios interceptors — no re-login needed' },
  { icon: '📱', title: 'Fully Responsive', desc: 'Beautiful on every screen size from mobile to desktop' },
];

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing">
      {/* Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">✦ Production-Grade Auth System</div>
        <h1 className="hero-title">
          Secure Authentication<br />
          <span className="gradient-text">Built for Modern Apps</span>
        </h1>
        <p className="hero-subtitle">
          A full-stack MERN authentication system with JWT tokens, MongoDB, protected routes,
          and a premium UI — ready out of the box.
        </p>
        <div className="hero-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[['JWT', 'Token Auth'], ['bcrypt', 'Password Hashing'], ['MongoDB', 'Database'], ['100%', 'Responsive']].map(([val, label]) => (
            <div key={label} className="stat-card">
              <span className="stat-value">{val}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-subtitle">A complete authentication stack with no compromises</p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card glass-card">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box glass-card">
          <h2>Ready to get started?</h2>
          <p>Create your account in seconds — no credit card required.</p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

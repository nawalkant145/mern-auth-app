import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const strengthLevel = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthClass = ['', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong', 'strength-vstrong'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await signup(form.name.trim(), form.email, form.password);
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const strength = strengthLevel();

  return (
    <div className="auth-page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <span className="auth-logo">⬡</span>
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Join AuthVault in seconds</p>
          </div>

          {errors.general && (
            <div className="alert alert-error">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                autoComplete="name"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                autoComplete="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <div className="input-wrapper">
                <input
                  id="signup-password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password"
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {form.password && (
                <div className="strength-bar">
                  <div className={`strength-fill ${strengthClass[strength]}`} style={{ width: `${(strength / 5) * 100}%` }} />
                </div>
              )}
              {form.password && <span className={`strength-label ${strengthClass[strength]}`}>{strengthLabel[strength]}</span>}
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm">Confirm Password</label>
              <input
                id="signup-confirm"
                type="password"
                name="confirm"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={handleChange}
                className={errors.confirm ? 'input-error' : ''}
                autoComplete="new-password"
              />
              {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            </div>

            <button
              id="signup-submit"
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? <span className="btn-spinner" /> : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 👋');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <span className="auth-logo">⬡</span>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your AuthVault account</p>
          </div>

          {errors.general && (
            <div className="alert alert-error">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className="form-group">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
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
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? <span className="btn-spinner" /> : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

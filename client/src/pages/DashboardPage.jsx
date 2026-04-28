import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user, logout, updateName } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
  };

  const handleEditStart = () => {
    setNewName(user.name);
    setEditing(true);
  };

  const handleNameSave = async (e) => {
    e.preventDefault();
    if (!newName.trim() || newName.trim() === user.name) { setEditing(false); return; }
    setSaving(true);
    try {
      await updateName(newName.trim());
      toast.success('Name updated!');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="dashboard">
      <div className="blob blob-1" />
      <div className="blob blob-3" />

      <div className="dashboard-inner">
        {/* Welcome Banner */}
        <div className="welcome-banner glass-card">
          <div className="welcome-text">
            <h1 className="welcome-title">Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋</h1>
            <p className="welcome-sub">You're securely signed in to your AuthVault account</p>
          </div>
          <div className="welcome-badge">
            <span className="role-badge">{user?.role}</span>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Profile Card */}
          <div className="profile-card glass-card">
            <div className="avatar-ring">
              <div className="avatar">{initials}</div>
            </div>

            {editing ? (
              <form onSubmit={handleNameSave} className="edit-name-form">
                <input
                  id="edit-name-input"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="edit-name-input"
                  autoFocus
                  maxLength={50}
                />
                <div className="edit-actions">
                  <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
                    {saving ? <span className="btn-spinner" /> : 'Save'}
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="profile-name">{user?.name}</h2>
                <button className="edit-btn" onClick={handleEditStart} title="Edit name">✏️ Edit Name</button>
              </>
            )}

            <p className="profile-email">{user?.email}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-stack">
            <div className="stat-info-card glass-card">
              <span className="stat-icon">📅</span>
              <div>
                <p className="stat-info-label">Member Since</p>
                <p className="stat-info-value">{joinDate}</p>
              </div>
            </div>

            <div className="stat-info-card glass-card">
              <span className="stat-icon">🛡️</span>
              <div>
                <p className="stat-info-label">Account Role</p>
                <p className="stat-info-value" style={{ textTransform: 'capitalize' }}>{user?.role}</p>
              </div>
            </div>

            <div className="stat-info-card glass-card">
              <span className="stat-icon">🔑</span>
              <div>
                <p className="stat-info-label">Auth Method</p>
                <p className="stat-info-value">JWT + Refresh Token</p>
              </div>
            </div>

            <div className="stat-info-card glass-card">
              <span className="stat-icon">✅</span>
              <div>
                <p className="stat-info-label">Session Status</p>
                <p className="stat-info-value" style={{ color: 'var(--success)' }}>Active & Secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="security-card glass-card">
          <h3 className="security-title">🔒 Security Overview</h3>
          <div className="security-items">
            {[
              ['Password', 'Hashed with bcrypt (12 rounds)', true],
              ['Access Token', '15-minute expiry', true],
              ['Refresh Token', '7-day expiry, stored in httpOnly cookie', true],
              ['CORS', 'Restricted to trusted origin', true],
            ].map(([label, detail, ok]) => (
              <div key={label} className="security-item">
                <span className={`security-dot ${ok ? 'dot-green' : 'dot-red'}`} />
                <div>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="logout-row">
          <button id="dashboard-logout" className="btn btn-danger" onClick={handleLogout}>
            Sign Out →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

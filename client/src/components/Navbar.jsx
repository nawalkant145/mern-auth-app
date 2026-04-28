import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Track scroll for elevated navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#features', label: 'Features', isHash: true },
    ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    { to: '/#contact', label: 'Contact', isHash: true },
  ];

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.isHash) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(link.to.replace('/', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(link.to.replace('/', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Animated gradient border at bottom */}
      <div className="navbar-glow" />

      <div className="navbar-inner">
        {/* LEFT — Brand */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path d="M16 2L28.66 9.5V24.5L16 32L3.34 24.5V9.5L16 2Z" stroke="url(#logoGrad)" strokeWidth="2.5" fill="rgba(139,92,246,0.1)" />
              <path d="M16 8L22.93 12V20L16 24L9.07 20V12L16 8Z" fill="url(#logoGrad)" opacity="0.6" />
              <circle cx="16" cy="16" r="3" fill="url(#logoGrad)" />
            </svg>
          </div>
          <span className="brand-text">AuthVault</span>
        </Link>

        {/* CENTER — Nav Links */}
        <div className={`navbar-center ${menuOpen ? 'open' : ''}`}>
          <div className="nav-links-group">
            {navLinks.map((link) =>
              link.isHash ? (
                <button
                  key={link.to}
                  className="nav-link"
                  onClick={() => handleNavClick(link)}
                >
                  {link.label}
                </button>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link--active' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Mobile-only auth actions inside hamburger menu */}
          <div className="mobile-auth-section">
            {user ? (
              <>
                <Link to="/dashboard" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu-icon">📊</span> Dashboard
                </Link>
                <Link to="/dashboard" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu-icon">👤</span> My Profile
                </Link>
                <Link to="/dashboard" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu-icon">⚙️</span> Account Settings
                </Link>
                {user.role === 'admin' && (
                  <Link to="/dashboard" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
                    <span className="mobile-menu-icon">🛡️</span> Admin Panel
                  </Link>
                )}
                <div className="mobile-menu-divider" />
                <button className="mobile-menu-item mobile-menu-danger" onClick={handleLogout}>
                  <span className="mobile-menu-icon">🚪</span> Logout
                </button>
              </>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="btn btn-outline btn-full" onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-full" onClick={() => setMenuOpen(false)}>
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Auth Actions (Desktop) */}
        <div className="navbar-right">
          {user ? (
            <>
              {/* Notification Bell */}
              <button className="nav-icon-btn" aria-label="Notifications" title="Notifications">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="notif-dot" />
              </button>

              {/* User Avatar + Dropdown */}
              <div className="nav-profile" ref={dropdownRef}>
                <button
                  className="nav-avatar-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="nav-avatar-img" />
                  ) : (
                    <div className="nav-avatar-initials">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="nav-avatar-info">
                    <span className="nav-avatar-name">{user.name?.split(' ')[0]}</span>
                    <span className="nav-avatar-role">{user.role}</span>
                  </div>
                  <svg className={`nav-chevron ${dropdownOpen ? 'nav-chevron--open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className={`nav-dropdown ${dropdownOpen ? 'nav-dropdown--open' : ''}`}>
                  {/* User info header */}
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{getInitials(user.name)}</span>
                      )}
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-name">{user.name}</span>
                      <span className="dropdown-email">{user.email}</span>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                    Dashboard
                  </Link>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    My Profile
                  </Link>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    Account Settings
                  </Link>

                  {user.role === 'admin' && (
                    <>
                      <div className="dropdown-divider" />
                      <Link to="/dashboard" className="dropdown-item dropdown-item--admin" onClick={() => setDropdownOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        Admin Panel
                      </Link>
                    </>
                  )}

                  <div className="dropdown-divider" />

                  <button className="dropdown-item dropdown-item--danger" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="nav-auth-buttons">
              <Link to="/login" className="btn btn-ghost nav-login-btn">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary nav-signup-btn">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

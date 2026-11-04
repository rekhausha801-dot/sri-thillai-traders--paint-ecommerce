import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Paintbrush, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  LogOut
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/categories';
import { SERVICES } from '../data/services';
import '../styles/Navbar.css';

const Navbar = () => {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isProductsActive = location.pathname.startsWith('/products');
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className={`navbar header-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* Main Navbar - Strict Single Horizontal Line on Desktop */}
      <div className="container">
        <nav className="navbar-container">
          {/* 1. Brand Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-icon-box">
              <Paintbrush size={22} />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">Sri Thillai Traders</span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Menu */}
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item has-dropdown">
              <Link
                to="/products"
                className={`nav-link ${isProductsActive ? 'active' : ''}`}
              >
                <span>Products</span>
              </Link>

              <div className="dropdown-menu">
                <Link
                  to="/products?category=interior-paints"
                  className="dropdown-item"
                >
                  <span>Interior</span>
                </Link>
                <Link
                  to="/products?category=exterior-paints"
                  className="dropdown-item"
                >
                  <span>Exterior</span>
                </Link>
                <Link
                  to="/products?category=waterproofing"
                  className="dropdown-item"
                >
                  <span>Waterproofing</span>
                </Link>
                <Link
                  to="/products?category=wood-finishes"
                  className="dropdown-item"
                >
                  <span>Wood & Metal</span>
                </Link>
                <Link
                  to="/products?category=primers"
                  className="dropdown-item"
                >
                  <span>Primers & Undercoats</span>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact
              </NavLink>
            </li>

          </ul>

          {/* 3. Navbar Right Actions */}
          <div className="navbar-actions">

            {/* Direct Inline Search Bar */}
            <form className="nav-desktop-search-pill" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="nav-desktop-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search paints, colors, brands..."
                aria-label="Search products"
              />
              <button
                type="submit"
                className="nav-desktop-search-icon"
                aria-label="Search"
                title="Search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Mobile Search - Links to Products */}
            <button
              type="button"
              className="action-btn mobile-only-btn"
              onClick={() => navigate('/products')}
              aria-label="Open search"
              title="Search products"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="action-btn"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="action-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="action-btn"
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="action-badge">{totalItems}</span>
              )}
            </Link>

            {/* User / Profile (Positioned Last, Next to Cart) */}
            <div style={{ position: 'relative' }}>
              {isAuthenticated ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="action-btn"
                    title={user?.name || 'Account'}
                  >
                    <User size={19} />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="user-profile-popover"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        right: 0,
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        boxShadow: '0 12px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)',
                        width: '230px',
                        padding: '16px 18px',
                        zIndex: 1200,
                        textAlign: 'left',
                        fontFamily: 'inherit',
                      }}
                    >
                      {/* User Info Header */}
                      <div style={{ paddingBottom: '14px', borderBottom: '1px solid #E2E8F0' }}>
                        <h4
                          style={{
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            color: '#1E293B',
                            margin: '0 0 3px 0',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.25,
                            wordBreak: 'break-word',
                          }}
                        >
                          {user?.name || 'User'}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: '#64748B',
                            margin: 0,
                            fontWeight: 400,
                            lineHeight: 1.3,
                            wordBreak: 'break-all',
                          }}
                        >
                          {user?.email || ''}
                        </p>
                      </div>

                      {/* Orders & Checkout Link */}
                      <div style={{ paddingTop: '14px', paddingBottom: '6px' }}>
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          style={{
                            display: 'block',
                            padding: '8px 0',
                            fontSize: '0.98rem',
                            fontWeight: 600,
                            color: '#1E293B',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#1E293B')}
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/checkout"
                          onClick={() => setUserDropdownOpen(false)}
                          style={{
                            display: 'block',
                            padding: '8px 0',
                            fontSize: '0.98rem',
                            fontWeight: 600,
                            color: '#1E293B',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#1E293B')}
                        >
                          Orders & Checkout
                        </Link>

                        {/* Logout Option */}
                        <button
                          type="button"
                          onClick={handleLogout}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '8px 0',
                            marginTop: '4px',
                            background: 'transparent',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '0.98rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'opacity 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                          <LogOut size={16} strokeWidth={2.2} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="action-btn" title="Login / Register">
                  <User size={19} />
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle Mobile Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer">
          <div className="mobile-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="brand-icon-box" style={{ width: '34px', height: '34px' }}>
                <Paintbrush size={18} />
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.05rem' }}>
                Sri Thillai Traders
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-secondary)' }}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-drawer-body">
            <NavLink
              to="/"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            <div>
              <div className="mobile-nav-link" style={{ borderBottom: 'none', paddingBottom: '4px' }}>
                <span>Products</span>
              </div>
              <div className="mobile-sub-menu">
                <Link
                  to="/products?category=interior-paints"
                  className="mobile-sub-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Interior
                </Link>
                <Link
                  to="/products?category=exterior-paints"
                  className="mobile-sub-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Exterior
                </Link>
                <Link
                  to="/products?category=waterproofing"
                  className="mobile-sub-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Waterproofing
                </Link>
                <Link
                  to="/products?category=wood-finishes"
                  className="mobile-sub-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wood & Metal
                </Link>
                <Link
                  to="/products?category=primers"
                  className="mobile-sub-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Primers & Undercoats
                </Link>
                <Link
                  to="/products"
                  className="mobile-sub-link"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontWeight: 700, color: '#0D47A1' }}
                >
                  All Products &rarr;
                </Link>
              </div>
            </div>

            <div>
              <div className="mobile-nav-link" style={{ borderBottom: 'none', paddingBottom: '4px' }}>
                <span>Services</span>
              </div>
              <div className="mobile-sub-menu">
                <Link
                  to="/services"
                  className="mobile-sub-link"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontWeight: 700, color: '#2563EB' }}
                >
                  All Services
                </Link>
                {SERVICES.map((srv) => (
                  <Link
                    key={srv.id}
                    to={`/services?highlight=${srv.id}`}
                    className="mobile-sub-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {srv.title}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>About Us</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Contact Us</span>
            </NavLink>

            <Link
              to="/wishlist"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Wishlist</span>
              <span className="badge badge-gold">{wishlistCount}</span>
            </Link>

            <Link
              to="/cart"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Cart</span>
              <span className="badge badge-gold">{totalItems}</span>
            </Link>

            <div style={{ marginTop: '20px' }}>
              {isAuthenticated ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    Logged in as: {user?.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%' }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

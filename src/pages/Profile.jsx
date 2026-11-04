import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  Lock,
  LogOut,
  Edit2,
  Camera,
  ChevronRight,
  Headphones,
  Check,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import profileAvatarSample from '../assets/profile-avatar-sample.png';
import canRoyaleImg from '../assets/can-royal-luxury.png';
import canDuluxImg from '../assets/can-dulux-weathershield.png';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form state with default fallback matching user screenshot
  const [formData, setFormData] = useState({
    name: user?.name || 'Rekha',
    email: user?.email || 'rekha@gmail.com',
    phone: user?.phone || '+91 98765 43210',
    gender: 'Female',
    memberSince: 'Nov 2026',
  });

  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // My Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      isDefault: true,
      name: 'Rekha',
      phone: '+91 98765 43210',
      addressLine: '24, Thillai Traders, A.R.D.C. First Floor, Sengunthapuram, Main Road',
      city: 'Puducherry',
      state: 'Puducherry',
      pincode: '605001',
    },
    {
      id: 2,
      type: 'Work / Site',
      isDefault: false,
      name: 'Rekha (Project Office)',
      phone: '+91 98946 62020',
      addressLine: 'Plot 12, Industrial Estate, Mettupalayam',
      city: 'Puducherry',
      state: 'Puducherry',
      pincode: '605009',
    }
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    type: 'Home',
    name: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    isDefault: false,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  // Password submission handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match!');
      return;
    }

    // Success simulation
    setPasswordSuccess('Password updated successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setTimeout(() => setPasswordSuccess(''), 4000);
  };

  // Address submission handler
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      setAddresses(prev => prev.map(addr => addr.id === editingAddressId ? { ...addressFormData, id: editingAddressId } : addr));
    } else {
      const newAddr = {
        ...addressFormData,
        id: Date.now(),
        isDefault: addresses.length === 0 ? true : addressFormData.isDefault
      };
      setAddresses(prev => [newAddr, ...prev]);
    }
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setAddressFormData({
      type: 'Home',
      name: '',
      phone: '',
      addressLine: '',
      city: '',
      state: 'Tamil Nadu',
      pincode: '',
      isDefault: false,
    });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="profile-page-wrapper">
      
      {/* 2. MAIN GRID CONTAINER: SIDEBAR + CONTENT */}
      <div className="profile-main-container">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="profile-sidebar">
          {/* User Brief Card */}
          <div className="profile-sidebar-user">
            <div className="profile-sidebar-avatar-wrap">
              <img
                src={profileAvatarSample}
                alt={formData.name}
                className="profile-sidebar-avatar-img"
              />
              <button 
                type="button" 
                className="profile-avatar-edit-badge"
                title="Change Avatar"
                onClick={() => {
                  setActiveTab('profile');
                  setIsEditing(true);
                }}
              >
                <Edit2 size={13} />
              </button>
            </div>
            <h3 className="profile-sidebar-name">{formData.name}</h3>
            <p className="profile-sidebar-email">{formData.email}</p>
          </div>

          {/* Navigation Items */}
          <nav className="profile-sidebar-nav">
            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              <span>My Profile</span>
            </button>

            <Link
              to="/checkout"
              className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            >
              <Package size={18} />
              <span>My Orders</span>
            </Link>

            <Link
              to="/wishlist"
              className={`profile-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
            >
              <Heart size={18} />
              <span>My Wishlist</span>
            </Link>

            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={18} />
              <span>My Addresses</span>
            </button>

            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              <Lock size={18} />
              <span>Change Password</span>
            </button>

            <button
              type="button"
              className="profile-nav-item logout-item"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>

          {/* Bottom Card: "Bring Colour to Your World" */}
          <div className="profile-sidebar-promo-card">
            <h4 className="profile-promo-title">
              Bring Colour <br /> to Your World
            </h4>
            <Link to="/products" className="profile-promo-btn">
              <span>Explore Products</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        </aside>

        {/* ================= RIGHT MAIN PANELS ================= */}
        <main className="profile-content-area">
          
          {/* TAB 1: MY PROFILE */}
          {activeTab === 'profile' && (
            <>
              {/* PROFILE INFORMATION MAIN CARD */}
              <div className="profile-info-card">
                <div className="profile-card-header">
                  <div className="profile-ribbon-badge">
                    <User size={20} />
                    <span>Profile Information</span>
                  </div>

                  <button
                    type="button"
                    className="profile-edit-btn"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 size={15} />
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </button>
                </div>

                <div className="profile-card-body">
                  {/* Avatar Section */}
                  <div className="profile-main-avatar-column">
                    <div className="profile-main-avatar-frame">
                      <img
                        src={profileAvatarSample}
                        alt={formData.name}
                      />
                      <button 
                        type="button" 
                        className="profile-cam-btn" 
                        title="Upload New Photo"
                      >
                        <Camera size={15} />
                      </button>
                    </div>
                    <button 
                      type="button" 
                      className="profile-change-photo-btn"
                      onClick={() => alert('Photo upload dialog')}
                    >
                      Change Photo
                    </button>
                  </div>

                  {/* Data Table / Edit Form */}
                  <div className="profile-details-table">
                    {isEditing ? (
                      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="profile-form-group">
                          <label className="profile-form-label">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="profile-form-input"
                            required
                          />
                        </div>

                        <div className="profile-form-group">
                          <label className="profile-form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="profile-form-input"
                            required
                          />
                        </div>

                        <div className="profile-form-group">
                          <label className="profile-form-label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="profile-form-input"
                          />
                        </div>

                        <div className="profile-form-group">
                          <label className="profile-form-label">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="profile-form-select"
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="profile-form-actions">
                          <button
                            type="submit"
                            className="profile-save-btn"
                          >
                            <Check size={18} strokeWidth={2.5} />
                            <span>Save Changes</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="profile-cancel-btn"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="profile-info-row">
                          <span className="profile-info-label">Name</span>
                          <span className="profile-info-colon">:</span>
                          <span className="profile-info-val">{formData.name}</span>
                        </div>

                        <div className="profile-info-row">
                          <span className="profile-info-label">Email Address</span>
                          <span className="profile-info-colon">:</span>
                          <span className="profile-info-val">{formData.email}</span>
                        </div>

                        <div className="profile-info-row">
                          <span className="profile-info-label">Phone Number</span>
                          <span className="profile-info-colon">:</span>
                          <span className="profile-info-val">{formData.phone}</span>
                        </div>

                        <div className="profile-info-row">
                          <span className="profile-info-label">Gender</span>
                          <span className="profile-info-colon">:</span>
                          <span className="profile-info-val">{formData.gender}</span>
                        </div>

                        <div className="profile-info-row">
                          <span className="profile-info-label">Member Since</span>
                          <span className="profile-info-colon">:</span>
                          <span className="profile-info-val">{formData.memberSince}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* TWO COLUMNS: MY ORDERS & MY WISHLIST */}
              <div className="profile-two-col-grid">
                
                {/* Orders Tile */}
                <div className="profile-quick-card">
                  <div className="profile-quick-card-header">
                    <h3 className="profile-quick-card-title">
                      <Package size={18} />
                      <span>My Orders</span>
                    </h3>
                    <Link to="/checkout" className="profile-view-all-link">
                      <span>View All</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                  <div className="profile-quick-card-body">
                    <div className="profile-item-tile">
                      <img
                        src={canRoyaleImg}
                        alt="Royale Luxury Emulsion"
                        className="profile-item-can-img"
                      />
                      <div className="profile-item-info">
                        <h4 className="profile-item-name">Royale Luxury Emulsion</h4>
                        <p className="profile-item-price">₹2,499</p>
                        <span className="profile-delivered-pill">Delivered</span>
                        <p className="profile-item-meta">Order #STT1026 • Placed on Nov 02, 2026</p>
                      </div>
                      <Link to="/checkout" className="profile-arrow-circle-btn">
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Wishlist Tile */}
                <div className="profile-quick-card">
                  <div className="profile-quick-card-header">
                    <h3 className="profile-quick-card-title">
                      <Heart size={18} fill="#FFFFFF" />
                      <span>My Wishlist</span>
                    </h3>
                    <Link to="/wishlist" className="profile-view-all-link">
                      <span>View All</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                  <div className="profile-quick-card-body">
                    <div className="profile-item-tile">
                      <img
                        src={canDuluxImg}
                        alt="Dulux WeatherShield"
                        className="profile-item-can-img"
                      />
                      <div className="profile-item-info">
                        <h4 className="profile-item-name">Dulux WeatherShield</h4>
                        <p className="profile-item-price">₹3,199</p>
                      </div>
                      <button type="button" className="profile-heart-btn" title="Saved Item">
                        <Heart size={18} fill="#EF4444" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* THREE ACTION PILLS (Manage Addresses, Change Password, Need Help) */}
              <div className="profile-three-action-grid">
                
                <div 
                  className="profile-action-pill-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveTab('addresses')}
                >
                  <div className="profile-action-pill-left">
                    <div className="profile-pill-icon-wrap">
                      <MapPin size={22} />
                    </div>
                    <div className="profile-pill-texts">
                      <h4>Manage Addresses</h4>
                      <p>View & update shipping</p>
                    </div>
                  </div>
                  <div className="profile-pill-arrow">
                    <ChevronRight size={18} />
                  </div>
                </div>

                <div 
                  className="profile-action-pill-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveTab('password')}
                >
                  <div className="profile-action-pill-left">
                    <div className="profile-pill-icon-wrap">
                      <Lock size={22} />
                    </div>
                    <div className="profile-pill-texts">
                      <h4>Change Password</h4>
                      <p>Security & credentials</p>
                    </div>
                  </div>
                  <div className="profile-pill-arrow">
                    <ChevronRight size={18} />
                  </div>
                </div>

                <Link to="/contact" className="profile-action-pill-card">
                  <div className="profile-action-pill-left">
                    <div className="profile-pill-icon-wrap">
                      <Headphones size={22} />
                    </div>
                    <div className="profile-pill-texts">
                      <h4>Need Help?</h4>
                      <p>Contact Us 24/7</p>
                    </div>
                  </div>
                  <div className="profile-pill-arrow">
                    <ChevronRight size={18} />
                  </div>
                </Link>

              </div>
            </>
          )}

          {/* TAB 2: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <div className="profile-info-card profile-tab-full-height">
              <div className="profile-card-header">
                <div className="profile-ribbon-badge">
                  <Lock size={20} />
                  <span>Change Password</span>
                </div>
              </div>

              <div className="profile-card-body-wrapper" style={{ padding: '36px 40px' }}>
                <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0 0 24px 0', lineHeight: 1.6 }}>
                  Ensure your account is using a long, random password to stay secure. Your password should be at least 6 characters.
                </p>

                {passwordSuccess && (
                  <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#166534', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={18} />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {passwordError && (
                  <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', fontWeight: 600 }}>
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Current Password */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Current Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                        style={{ width: '100%', padding: '12px 42px 12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '0.95rem', outline: 'none' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        placeholder="Enter at least 6 characters"
                        style={{ width: '100%', padding: '12px 42px 12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '0.95rem', outline: 'none' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Confirm New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        placeholder="Re-type your new password"
                        style={{ width: '100%', padding: '12px 42px 12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '0.95rem', outline: 'none' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '14px', marginTop: '12px' }}>
                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(90deg, #051A36 0%, #03132B 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '12px 28px',
                        borderRadius: '30px',
                        fontWeight: 700,
                        fontSize: '0.98rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(5, 26, 54, 0.25)',
                      }}
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('profile')}
                      style={{
                        background: '#F1F5F9',
                        color: '#475569',
                        border: 'none',
                        padding: '12px 22px',
                        borderRadius: '30px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Back to Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: MY ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="profile-info-card profile-tab-full-height">
              <div className="profile-card-header">
                <div className="profile-ribbon-badge">
                  <MapPin size={20} />
                  <span>My Delivery Addresses</span>
                </div>

                {!isAddingAddress && (
                  <button
                    type="button"
                    className="profile-edit-btn"
                    onClick={() => {
                      setEditingAddressId(null);
                      setAddressFormData({
                        type: 'Home',
                        name: formData.name,
                        phone: formData.phone,
                        addressLine: '',
                        city: 'Puducherry',
                        state: 'Puducherry',
                        pincode: '605001',
                        isDefault: false,
                      });
                      setIsAddingAddress(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Address</span>
                  </button>
                )}
              </div>

              <div style={{ padding: '32px 36px' }}>
                {isAddingAddress ? (
                  <form onSubmit={handleAddressSubmit} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>
                      {editingAddressId ? 'Edit Address' : 'Add New Delivery Address'}
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Contact Name</label>
                        <input
                          type="text"
                          value={addressFormData.name}
                          onChange={(e) => setAddressFormData({ ...addressFormData, name: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Phone Number</label>
                        <input
                          type="text"
                          value={addressFormData.phone}
                          onChange={(e) => setAddressFormData({ ...addressFormData, phone: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Street / Door No / Area</label>
                      <input
                        type="text"
                        value={addressFormData.addressLine}
                        onChange={(e) => setAddressFormData({ ...addressFormData, addressLine: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>City</label>
                        <input
                          type="text"
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>State</label>
                        <input
                          type="text"
                          value={addressFormData.state}
                          onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Pincode</label>
                        <input
                          type="text"
                          value={addressFormData.pincode}
                          onChange={(e) => setAddressFormData({ ...addressFormData, pincode: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Address Type</label>
                      <select
                        value={addressFormData.type}
                        onChange={(e) => setAddressFormData({ ...addressFormData, type: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', background: '#FFFFFF' }}
                      >
                        <option value="Home">Home (All day delivery)</option>
                        <option value="Work / Site">Work / Painting Site (9 AM - 6 PM)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                      <button
                        type="submit"
                        style={{
                          background: '#051A36',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '12px 28px',
                          borderRadius: '30px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {editingAddressId ? 'Update Address' : 'Save Address'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        style={{
                          background: '#F1F5F9',
                          color: '#475569',
                          border: 'none',
                          padding: '12px 22px',
                          borderRadius: '30px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        style={{
                          background: '#FAFAFA',
                          border: addr.isDefault ? '2px solid #DDB35A' : '1px solid #E2E8F0',
                          borderRadius: '18px',
                          padding: '20px',
                          position: 'relative',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ background: '#051A36', color: '#F8D279', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px' }}>
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span style={{ color: '#166534', background: '#DCFCE7', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '10px' }}>
                              Default
                            </span>
                          )}
                        </div>

                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>{addr.name}</h4>
                        <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '0 0 10px' }}>{addr.phone}</p>
                        <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, margin: '0 0 16px' }}>
                          {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>

                        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setAddressFormData(addr);
                              setEditingAddressId(addr.id);
                              setIsAddingAddress(true);
                            }}
                            style={{ background: 'transparent', border: 'none', color: '#2563EB', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Edit2 size={13} />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default Profile;

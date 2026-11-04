import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Bell,
  Headphones,
  LogOut,
  Edit2,
  Camera,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import avatarCircle from '../assets/profile-user-avatar-circle.png';
import avatarMain from '../assets/profile-user-avatar-main.png';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form state with default fallback matching user screenshot
  const [formData, setFormData] = useState({
    name: user?.name || 'Rekha Rekha',
    email: user?.email || 'rekhausha801@gmail.com',
    phone: user?.phone || '+91 98765 43210',
    gender: 'Female',
    dob: '',
    joinedDate: '9/2/2026',
  });

  // My Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      isDefault: true,
      name: 'Rekha Rekha',
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    const newAddr = {
      id: Date.now(),
      ...addressFormData,
    };
    if (newAddr.isDefault) {
      setAddresses(addresses.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses([...addresses, newAddr]);
    }
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
    setIsAddingAddress(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="new-profile-page-wrapper">
      <div className="new-profile-layout-container">
        {/* ============================================================
            LEFT SIDEBAR
            ============================================================ */}
        <aside className="new-profile-sidebar">
          {/* User Identity Section */}
          <div className="new-profile-user-section">
            <div className="new-profile-avatar-circle-wrap">
              <img
                src={avatarCircle}
                alt={formData.name}
                className="new-profile-avatar-img"
              />
            </div>
            <h3 className="new-profile-user-name">{formData.name}</h3>
            <p className="new-profile-user-email">{formData.email}</p>
          </div>

          {/* Navigation List */}
          <nav className="new-profile-nav-list">
            <button
              type="button"
              className={`new-profile-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setIsEditing(false); }}
            >
              <User size={19} />
              <span>My Profile</span>
            </button>

            <button
              type="button"
              className={`new-profile-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={19} />
              <span>My Addresses</span>
            </button>

            <button
              type="button"
              className={`new-profile-nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={19} />
              <span>Notifications</span>
            </button>

            <button
              type="button"
              className={`new-profile-nav-btn ${activeTab === 'help' ? 'active' : ''}`}
              onClick={() => setActiveTab('help')}
            >
              <Headphones size={19} />
              <span>Help Center</span>
            </button>
          </nav>

          {/* Logout Button */}
          <button
            type="button"
            className="new-profile-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </aside>

        {/* ============================================================
            RIGHT MAIN CARD
            ============================================================ */}
        <main className="new-profile-main-card">
          {activeTab === 'profile' && (
            <>
              <h2 className="new-profile-card-title">My Profile</h2>
              <p className="new-profile-card-subtitle">
                Manage your personal information and account details.
              </p>

              {/* Inner Information Box (Matching User Reference Image) */}
              <div className="new-profile-inner-box">
                <div className="new-profile-inner-left">
                  {/* Big Circular Avatar with Camera Pill */}
                  <div className="new-profile-big-avatar-wrap">
                    <img
                      src={avatarMain}
                      alt={formData.name}
                      className="new-profile-big-avatar-img"
                    />
                    <label className="new-profile-cam-pill" title="Upload new photo">
                      <Camera size={16} />
                      <input type="file" accept="image/*" style={{ display: 'none' }} />
                    </label>
                  </div>

                  {/* Details Column */}
                  <div className="new-profile-details-column">
                    <div className="new-profile-name-row">
                      <h3 className="new-profile-display-name">{formData.name}</h3>
                      <span className="new-profile-verified-badge">
                        <CheckCircle2 size={13} />
                        Verified
                      </span>
                    </div>

                    <div className="new-profile-info-row-item">
                      <Mail size={16} />
                      <span>{formData.email}</span>
                    </div>

                    <div className="new-profile-info-row-item">
                      <Phone size={16} />
                      <span>{formData.phone}</span>
                    </div>

                    <div className="new-profile-info-row-item">
                      <Calendar size={16} />
                      {formData.dob ? (
                        <span>DOB: {formData.dob}</span>
                      ) : (
                        <button
                          type="button"
                          className="new-profile-dob-link"
                          onClick={() => setIsEditing(true)}
                          style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
                        >
                          + Add Date of Birth
                        </button>
                      )}
                    </div>

                    <div className="new-profile-info-row-item">
                      <User size={16} />
                      <span>Gender: {formData.gender}</span>
                    </div>

                    <div className="new-profile-info-row-item">
                      <Calendar size={16} />
                      <span>Joined on {formData.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button on Right */}
                <button
                  type="button"
                  className="new-profile-edit-btn-action"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 size={16} />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {/* Edit Mode Inline Form */}
              {isEditing && (
                <div className="new-profile-edit-form-wrap">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="new-profile-form-grid">
                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="new-profile-form-input"
                          required
                        />
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="new-profile-form-input"
                          required
                        />
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="new-profile-form-input"
                          required
                        />
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="new-profile-form-input"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="new-profile-form-input"
                        />
                      </div>
                    </div>

                    <div className="new-profile-form-actions">
                      <button type="submit" className="new-profile-save-submit-btn">
                        <Check size={16} />
                        <span>Save Changes</span>
                      </button>
                      <button
                        type="button"
                        className="new-profile-cancel-edit-btn"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}

          {/* ============================================================
              MY ADDRESSES TAB
              ============================================================ */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 className="new-profile-card-title">My Addresses</h2>
                  <p className="new-profile-card-subtitle" style={{ margin: 0 }}>
                    Manage your delivery addresses for seamless paint & supplies shipping.
                  </p>
                </div>
                {!isAddingAddress && (
                  <button
                    type="button"
                    className="new-profile-edit-btn-action"
                    onClick={() => setIsAddingAddress(true)}
                  >
                    <Plus size={16} />
                    <span>Add New Address</span>
                  </button>
                )}
              </div>

              {isAddingAddress ? (
                <div className="new-profile-inner-box" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px', color: '#0F172A' }}>
                    Add New Address
                  </h3>
                  <form onSubmit={handleAddAddressSubmit}>
                    <div className="new-profile-form-grid">
                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Address Type</label>
                        <select
                          className="new-profile-form-input"
                          value={addressFormData.type}
                          onChange={(e) => setAddressFormData({ ...addressFormData, type: e.target.value })}
                        >
                          <option value="Home">Home</option>
                          <option value="Work / Site">Work / Site</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Contact Person Name</label>
                        <input
                          type="text"
                          className="new-profile-form-input"
                          value={addressFormData.name}
                          onChange={(e) => setAddressFormData({ ...addressFormData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="new-profile-form-input"
                          value={addressFormData.phone}
                          onChange={(e) => setAddressFormData({ ...addressFormData, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="new-profile-form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="new-profile-form-label">Street Address / Landmark</label>
                        <input
                          type="text"
                          className="new-profile-form-input"
                          value={addressFormData.addressLine}
                          onChange={(e) => setAddressFormData({ ...addressFormData, addressLine: e.target.value })}
                          required
                        />
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">City</label>
                        <input
                          type="text"
                          className="new-profile-form-input"
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                          required
                        />
                      </div>

                      <div className="new-profile-form-group">
                        <label className="new-profile-form-label">Pincode</label>
                        <input
                          type="text"
                          className="new-profile-form-input"
                          value={addressFormData.pincode}
                          onChange={(e) => setAddressFormData({ ...addressFormData, pincode: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="new-profile-form-actions">
                      <button type="submit" className="new-profile-save-submit-btn">
                        Save Address
                      </button>
                      <button
                        type="button"
                        className="new-profile-cancel-edit-btn"
                        onClick={() => setIsAddingAddress(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      style={{
                        background: '#FCFAF6',
                        border: addr.isDefault ? '2px solid #C89953' : '1.5px solid #F1ECE1',
                        borderRadius: '16px',
                        padding: '24px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span
                            style={{
                              background: addr.isDefault ? '#C89953' : '#E2E8F0',
                              color: addr.isDefault ? '#FFFFFF' : '#475569',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              padding: '3px 10px',
                              borderRadius: '20px',
                            }}
                          >
                            {addr.type} {addr.isDefault && '• Default'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: '#0F172A', fontWeight: 700 }}>
                          {addr.name}
                        </h4>
                        <p style={{ margin: '0 0 4px', fontSize: '0.9rem', color: '#64748B' }}>
                          {addr.phone}
                        </p>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                          {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>

                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          style={{
                            marginTop: '16px',
                            background: '#FFFFFF',
                            border: '1.5px solid #CBD5E1',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#334155',
                            cursor: 'pointer',
                            alignSelf: 'flex-start',
                          }}
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================
              NOTIFICATIONS TAB
              ============================================================ */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="new-profile-card-title">Notifications</h2>
              <p className="new-profile-card-subtitle">
                Stay updated with your paint orders, delivery status, and exclusive offers.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#FCFAF6', border: '1.5px solid #F1ECE1', borderRadius: '14px', padding: '18px 22px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bell size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.98rem', fontWeight: 700, color: '#0F172A' }}>Welcome to Sri Thillai Traders!</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Your account was successfully registered and verified.</p>
                  </div>
                </div>

                <div style={{ background: '#FCFAF6', border: '1.5px solid #F1ECE1', borderRadius: '14px', padding: '18px 22px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.98rem', fontWeight: 700, color: '#0F172A' }}>Special Festive Paint Discount</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Get up to 20% off on all premium exterior & interior emulsions this week!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              HELP CENTER TAB
              ============================================================ */}
          {activeTab === 'help' && (
            <div>
              <h2 className="new-profile-card-title">Help Center</h2>
              <p className="new-profile-card-subtitle">
                Need assistance with your orders, paints, or consultation? We are here to help!
              </p>

              <div className="new-profile-inner-box" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', color: '#0F172A', fontWeight: 700 }}>Sri Thillai Traders Support</h3>
                <p style={{ margin: '0 0 20px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Our store experts are ready to guide you on paint quantities, color matching, and order tracking.
                </p>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0F172A', fontWeight: 600 }}>
                    <Phone size={18} style={{ color: '#C89953' }} />
                    <span>+91 98946 62020</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0F172A', fontWeight: 600 }}>
                    <Mail size={18} style={{ color: '#C89953' }} />
                    <span>support@srithillaitraders.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

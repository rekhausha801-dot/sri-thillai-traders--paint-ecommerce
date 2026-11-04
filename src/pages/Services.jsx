import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Wrench, 
  Calculator, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  Send,
  Home,
  ShieldCheck,
  Check
} from 'lucide-react';
import waterproofingImg from '../assets/waterproofing-service.jpg';
import interiorPaintingBannerImg from '../assets/f36926db-3e39-4c61-a19c-2baed06ed850.png';
import { SERVICES } from '../data/services';
import '../styles/Home.css';

const Services = () => {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('highlight');

  // Calculator State
  const [sqFt, setSqFt] = useState(1000);
  const [serviceType, setServiceType] = useState('interior');
  const [paintTier, setPaintTier] = useState('premium');
  const [prepNeeded, setPrepNeeded] = useState(true);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    selectedService: highlightedId || 'interior-painting',
    preferredDate: '',
    notes: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (highlightedId) {
      setFormData((prev) => ({ ...prev, selectedService: highlightedId }));
    }
  }, [highlightedId]);

  // Cost Estimation Calculation
  const calculateEstimate = () => {
    let ratePerSqFt = 12; // Base Interior

    if (serviceType === 'exterior') ratePerSqFt = 16;
    if (serviceType === 'waterproofing') ratePerSqFt = 35;

    // Multipliers for tier
    if (paintTier === 'luxury') ratePerSqFt *= 1.45;
    if (paintTier === 'economy') ratePerSqFt *= 0.85;

    // Surface prep cost
    const prepCost = prepNeeded ? sqFt * 4 : 0;
    const baseCost = Math.round(sqFt * ratePerSqFt);
    const totalEstimate = baseCost + prepCost;
    const paintNeededLitres = Math.ceil(sqFt / 65); // approx 65 sqft per litre for 2 coats

    return {
      baseCost,
      prepCost,
      totalEstimate,
      paintNeededLitres,
    };
  };

  const estimate = calculateEstimate();

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and contact phone number.');
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ maxWidth: '750px' }}>
          <div className="section-tag">
            <Wrench size={14} />
            <span>Master Painting & Waterproofing</span>
          </div>
          <h1 className="section-title">End-to-End Painting Services</h1>
          <p className="section-subtitle">
            Sri Thillai Traders brings authorized craftsmanship, high-grade computerized color tints, dustless sanding, and dedicated project supervision.
          </p>
        </div>

        {/* 3-Card Layout Matching Modern Home Expertise Cards: 1 Large Horizontal + 2 Vertical */}
        <div className="services-showcase-grid" style={{ marginBottom: '60px' }}>
          {/* CARD 1: Large Featured Card (Interior Painting) */}
          <div className="service-card-featured" style={{ border: highlightedId === 'srv-001' ? '2px solid #2563EB' : undefined }}>
            <div className="service-featured-content">
              <div className="service-badge-row">
                <div className="service-circle-icon">
                  <Home size={22} color="#2563EB" />
                </div>
              </div>

              <h3 className="service-featured-heading">
                Interior<br />Painting
              </h3>

              <p className="service-card-summary">
                Dustless, premium interior painting with long-lasting finish, enhancing the beauty and value of your space.
              </p>

              <ul className="service-check-list">
                <li>
                  <span className="service-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </span>
                  <span>Dust-free, mess-free painting</span>
                </li>
                <li>
                  <span className="service-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </span>
                  <span>Complete interior & decorative painting</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, selectedService: 'srv-001' }));
                  const el = document.getElementById('booking-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="service-featured-cta"
                style={{ cursor: 'pointer' }}
              >
                <span>Book Interior Service</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="service-featured-image-box">
              <img
                src={interiorPaintingBannerImg}
                alt="Interior Painting"
                className="service-featured-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* CARD 2: Vertical Card (Exterior Painting) */}
          <div className="service-card-vertical" style={{ border: highlightedId === 'srv-002' ? '2px solid #2563EB' : undefined }}>
            <div className="service-vertical-media">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Exterior Painting"
                className="service-vertical-img"
                loading="lazy"
              />
              <div className="service-vertical-floating-pill">
                <div className="service-circle-icon floating">
                  <Home size={20} color="#2563EB" />
                </div>
              </div>
            </div>

            <div className="service-vertical-body">
              <h3 className="service-vertical-heading">
                Exterior<br />Painting
              </h3>

              <p className="service-card-summary">
                Weather-resistant, long-lasting exterior painting that protects your property and enhances its curb appeal.
              </p>

              <ul className="service-check-list">
                <li>
                  <span className="service-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </span>
                  <span>High weather resistance & protection</span>
                </li>
                <li>
                  <span className="service-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </span>
                  <span>Premium exterior paints & advanced coating</span>
                </li>
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: 'auto' }}>
                <Link
                  to="/products?category=exterior-wall-paints"
                  className="service-text-link"
                >
                  <span>Explore service</span>
                  <ArrowRight size={15} />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, selectedService: 'srv-002' }));
                    const el = document.getElementById('booking-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>

          {/* CARD 3: Vertical Card (Waterproofing Service) */}
          <div className="service-card-vertical" style={{ border: highlightedId === 'srv-003' ? '2px solid #2563EB' : undefined }}>
            <div className="service-vertical-media">
              <img
                src={waterproofingImg}
                alt="Waterproofing Service"
                className="service-vertical-img"
                loading="lazy"
              />
              <div className="service-vertical-floating-pill">
                <div className="service-circle-icon floating">
                  <ShieldCheck size={20} color="#2563EB" />
                </div>
              </div>
            </div>

            <div className="service-vertical-body">
              <h3 className="service-vertical-heading">
                Waterproofing<br />Service
              </h3>

              <p className="service-card-summary">
                Leak protection, terrace & wall waterproofing with advanced solutions, keeping your home safe and dry, for the long term.
              </p>

              <ul className="service-check-list">
                <li>
                  <span className="service-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </span>
                  <span>Prevents leaks & water damage</span>
                </li>
                <li>
                  <span className="service-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </span>
                  <span>Long-lasting waterproofing solutions</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, selectedService: 'srv-003' }));
                  const el = document.getElementById('booking-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="service-text-link"
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              >
                <span>Book Waterproofing Service</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Cost Calculator Section */}
        <div
          id="calculator-section"
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--border-light)',
            padding: '40px',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '60px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div className="brand-icon-box" style={{ width: '36px', height: '36px' }}>
              <Calculator size={18} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Instant Painting Cost Estimator</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            Get an instant budget preview for materials and labor based on your home size.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }} className="calculator-grid">
            {/* Controls */}
            <div>
              {/* Area Slider */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label">Total Carpet Area</label>
                  <span style={{ fontWeight: 800, color: 'var(--gold-primary)', fontSize: '1.1rem' }}>
                    {sqFt.toLocaleString('en-IN')} sq. ft.
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={sqFt}
                  onChange={(e) => setSqFt(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>1 BHK (450 sq.ft)</span>
                  <span>2 BHK (950 sq.ft)</span>
                  <span>3 BHK (1400 sq.ft)</span>
                  <span>Villa (2500+ sq.ft)</span>
                </div>
              </div>

              {/* Service Type */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Type of Service</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { id: 'interior', label: 'Interior Painting' },
                    { id: 'exterior', label: 'Exterior Facade' },
                    { id: 'waterproofing', label: 'Waterproofing' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setServiceType(t.id)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        fontWeight: serviceType === t.id ? 700 : 500,
                        backgroundColor: serviceType === t.id ? 'var(--gold-light)' : 'var(--bg-secondary)',
                        border: serviceType === t.id ? '2px solid var(--gold-primary)' : '1px solid var(--border-light)',
                        color: serviceType === t.id ? 'var(--gold-primary)' : 'var(--text-primary)',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Tier */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Paint Quality Tier</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { id: 'economy', label: 'Economy Emulsion' },
                    { id: 'premium', label: 'Premium Washable' },
                    { id: 'luxury', label: 'Luxury Velvet Matte' },
                  ].map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setPaintTier(q.id)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        fontWeight: paintTier === q.id ? 700 : 500,
                        backgroundColor: paintTier === q.id ? 'var(--gold-light)' : 'var(--bg-secondary)',
                        border: paintTier === q.id ? '2px solid var(--gold-primary)' : '1px solid var(--border-light)',
                        color: paintTier === q.id ? 'var(--gold-primary)' : 'var(--text-primary)',
                      }}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prep Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={prepNeeded}
                  onChange={(e) => setPrepNeeded(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--gold-primary)' }}
                />
                <span>Include Wall Putty Repair & Primer Preparation (Recommended)</span>
              </label>
            </div>

            {/* Estimated Output Card */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1.5px solid var(--gold-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                  Itemized Cost Breakdown
                </span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  ₹{estimate.totalEstimate.toLocaleString('en-IN')}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Estimated total for material + authorized master painter application.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Base Paint & Coats:</span>
                    <strong>₹{estimate.baseCost.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Surface Putty & Sanding:</span>
                    <strong>₹{estimate.prepCost.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Approx. Paint Required:</span>
                    <strong>~{estimate.paintNeededLitres} Litres</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
                <a
                  href="#booking-section"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Confirm Free In-Person Site Inspection <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div
          id="booking-section"
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--border-light)',
            padding: '40px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div className="section-tag" style={{ margin: '0 auto 10px auto' }}>
                <Calendar size={14} />
                <span>Schedule An Expert</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Book Painting Service Consultation</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Our senior paint technician will visit your site with digital shade cards, laser measures, and damp meters.
              </p>
            </div>

            {bookingSuccess ? (
              <div
                style={{
                  background: 'var(--color-success-bg)',
                  border: '1.5px solid var(--color-success)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '30px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={44} color="var(--color-success)" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-success)' }}>
                  Booking Request Received!
                </h3>
                <p style={{ margin: '12px 0 20px 0', color: 'var(--text-primary)' }}>
                  Thank you, <strong>{formData.name}</strong>. Our supervisor will call you at <strong>{formData.phone}</strong> within 2 hours to confirm your site inspection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingSuccess(false);
                    setFormData({
                      name: '',
                      phone: '',
                      address: '',
                      selectedService: 'interior-painting',
                      preferredDate: '',
                      notes: '',
                    });
                  }}
                  className="btn btn-outline"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Selected Service</label>
                  <select
                    className="form-select"
                    value={formData.selectedService}
                    onChange={(e) => setFormData({ ...formData, selectedService: e.target.value })}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.priceStartingAt})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City / Town</label>
                    <input
                      type="text"
                      placeholder="e.g. Chidambaram / Cuddalore"
                      className="form-input"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Requirements or Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the project: room count, wall dampness, preferred paint brand..."
                    className="form-textarea"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <Send size={18} /> Schedule Free Painting Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .calculator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;

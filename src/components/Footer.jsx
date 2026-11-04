import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import footerPaintCan from '../assets/footer-paint-can-perfect.png';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-luxury">
      {/* Background Ambience & Gold Swirl Elements */}
      <div className="footer-glow-top-left" />
      <div className="footer-glow-top-right" />
      <div className="footer-gold-curve-top" />
      <div className="footer-gold-swirl-right" />

      {/* Main Content Area */}
      <div className="footer-luxury-container">
        <div className="footer-luxury-grid">
          
          {/* ================= COLUMN 1: BRAND INFO & TRUST PILLS ================= */}
          <div className="footer-col-brand">
            {/* Logo Row */}
            <Link to="/" className="footer-luxury-brand">
              <div className="footer-brand-house-logo">
                <svg width="48" height="46" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Roof Top / Eaves with Gold outline */}
                  <path d="M24 3L3 20H8.5V40H39.5V20H45L24 3Z" stroke="#E5B962" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(12, 45, 95, 0.6)"/>
                  {/* House Body Windows / Interior */}
                  <rect x="14" y="21" width="20" height="17" rx="2" fill="#1558B0" />
                  <path d="M24 8L10 20H15V37H33V20H38L24 8Z" fill="#2563EB" opacity="0.35" />
                  {/* Diagonal Paintbrush dipping */}
                  <path d="M17 32L30 19L36 25L23 38L17 32Z" fill="#FFFFFF" />
                  <rect x="16" y="30" width="5.5" height="8" rx="1.5" transform="rotate(-45 16 30)" fill="#E5B962" />
                  <path d="M29 17L34 12C35.2 10.8 37.2 10.8 38.4 12C39.6 13.2 39.6 15.2 38.4 16.4L33.4 21.4L29 17Z" fill="#0284C7" />
                </svg>
              </div>

              <div className="footer-brand-title-wrap">
                <h3 className="footer-luxury-name">
                  Sri Thillai <span className="brand-gold-text">Traders</span>
                </h3>
                <span className="footer-luxury-motto">PREMIUM PAINTS & COLOURS</span>
              </div>
            </Link>

            {/* About Text */}
            <p className="footer-luxury-about">
              We bring beautiful colours to your world with premium quality paints. Transform your home, office and commercial spaces with long-lasting, vibrant and eco-friendly paint solutions.
            </p>
          </div>

          {/* ================= COLUMN 2: PAINT CATEGORIES ================= */}
          <div className="footer-col-nav">
            <div className="footer-nav-col-header">
              <div className="footer-header-icon-hex">
                <Layers size={19} />
              </div>
              <div>
                <h4 className="footer-section-title">Paint Categories</h4>
                <span className="footer-section-subtitle">EXPLORE OUR COLLECTION</span>
              </div>
            </div>

            <ul className="footer-chevron-links">
              <li>
                <Link to="/products?category=interior-paints">
                  <span>Interior Wall Paints</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=exterior-paints">
                  <span>Exterior Wall Paints</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=wood-metal-finishes">
                  <span>Wood & Metal Paints</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=primers-undercoats">
                  <span>Primers & Undercoats</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=waterproofing">
                  <span>Waterproofing Products</span>
                </Link>
              </li>
              <li>
                <Link to="/products">
                  <span>Texture & Decorative Paints</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4: VISIT OUR STORE ================= */}
          <div className="footer-col-store">
            <div className="footer-nav-col-header">
              <div className="footer-header-icon-hex">
                <MapPin size={19} />
              </div>
              <div>
                <h4 className="footer-section-title">Visit Our Store</h4>
                <span className="footer-section-subtitle">GET IN TOUCH</span>
              </div>
            </div>

            <div className="footer-store-glass-card">
              <div className="footer-store-info-row">
                <div className="footer-store-round-icon">
                  <MapPin size={15} />
                </div>
                <div className="footer-store-info-text">
                  <span>24, Thillai Traders, A.R.D.C. First Floor, Sengunthapuram, Main Road, Puducherry - 605 001</span>
                </div>
              </div>

              <div className="footer-store-divider" />

              <div className="footer-store-info-row">
                <div className="footer-store-round-icon">
                  <Phone size={15} />
                </div>
                <div className="footer-store-info-text">
                  <a href="tel:+919894662020">+91 98946 62020</a>
                </div>
              </div>

              <div className="footer-store-divider" />

              <div className="footer-store-info-row">
                <div className="footer-store-round-icon">
                  <Mail size={15} />
                </div>
                <div className="footer-store-info-text">
                  <a href="mailto:support@thillaipaints.com">support@thillaipaints.com</a>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=24+Thillai+Traders+Sengunthapuram+Puducherry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-directions-gold-btn"
              >
                <MapPin size={16} />
                <span>Get Directions</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Decorative Golden Ambient Line Before Bottom Strip */}
      <div className="footer-gold-wave-bottom" />

      {/* ================= FOOTER BOTTOM STRIP ================= */}
      <div className="footer-luxury-bottom">
        <div className="footer-luxury-bottom-inner">
          <p className="footer-copyright-text">
            © 2026 Sri Thillai Traders. All rights reserved.
          </p>

          <div className="footer-policy-links">
            <Link to="/about">Privacy Policy</Link>
            <span className="footer-policy-pipe">|</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="footer-policy-pipe">|</span>
            <Link to="/contact">Contact Us</Link>
            <span className="footer-policy-pipe">|</span>
            <Link to="/wishlist">Wishlist</Link>
          </div>

          <div className="footer-social-circles">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0-.01-2.8 1.4 1.4 0 0 0 .01 2.8M7.86 18.5V10.13H5.07V18.5h2.79z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

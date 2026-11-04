const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// We have the 3 clean cropped cards:
// src/assets/service-card-clean-interior.png
// src/assets/service-card-clean-exterior.png
// src/assets/service-card-clean-waterproofing.png

// Now let's update ServicesSection.jsx to render:
// 1. Container with exact title "Painting Services for Every Space"
// 2. Exact 3 cards side by side in one row (horizontal line)
// 3. Perfect link navigation to interior, exterior, waterproofing!

const jsxContent = `import React from 'react';
import { Link } from 'react-router-dom';
import interiorCardImg from '../assets/service-card-clean-interior.png';
import exteriorCardImg from '../assets/service-card-clean-exterior.png';
import waterproofingCardImg from '../assets/service-card-clean-waterproofing.png';
import '../styles/Home.css';

const services = [
  {
    id: 'interior',
    title: 'Interior Painting',
    image: interiorCardImg,
    link: '/products?category=interior-wall-paints',
  },
  {
    id: 'exterior',
    title: 'Exterior Painting',
    image: exteriorCardImg,
    link: '/products?category=exterior-wall-paints',
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing Service',
    image: waterproofingCardImg,
    link: '/products?category=waterproofing',
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section" style={{ padding: '40px 0 60px 0', background: '#FFFFFF' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header Block */}
        <div className="services-header-block" style={{ marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1.5px solid rgba(37, 99, 235, 0.28)',
              color: '#1D4ED8',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '6px 16px',
              borderRadius: '999px',
              marginBottom: '12px',
              width: 'fit-content',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
            </span>
            <span>OUR EXPERTISE</span>
          </div>

          <h2
            style={{
              fontSize: '2.4rem',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              margin: '0',
              lineHeight: 1.15,
            }}
          >
            Painting Services for Every Space
          </h2>
        </div>

        {/* Exactly 3 Cards in 1 Horizontal Line / Row */}
        <div className="three-cards-horizontal-row">
          {services.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="three-card-exact-item"
            >
              <img
                src={item.image}
                alt={item.title}
                className="three-card-exact-img"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
`;

fs.writeFileSync('src/sections/ServicesSection.jsx', jsxContent, 'utf8');
console.log('Updated ServicesSection.jsx');

// Now let's append the CSS for .three-cards-horizontal-row
const cssToAdd = `
/* ==========================================================================
   EXACT 3 SERVICE CARDS IN 1 HORIZONTAL ROW (FROM USER REFERENCE)
   ========================================================================== */
.three-cards-horizontal-row {
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch !important;
  justify-content: space-between !important;
  gap: 24px !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.three-card-exact-item {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  display: block !important;
  text-decoration: none !important;
  border-radius: 22px !important;
  overflow: hidden !important;
  background: #FAF8F4 !important;
  border: 1px solid rgba(214, 173, 112, 0.45) !important;
  box-shadow: 0 10px 28px -4px rgba(23, 54, 93, 0.12), 0 4px 12px rgba(214, 173, 112, 0.1) !important;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease !important;
  cursor: pointer !important;
}

.three-card-exact-item:hover {
  transform: translateY(-8px) scale(1.015) !important;
  border-color: #D6AD70 !important;
  box-shadow: 0 20px 42px -6px rgba(23, 54, 93, 0.22), 0 8px 20px rgba(214, 173, 112, 0.25) !important;
}

.three-card-exact-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  image-rendering: -webkit-optimize-contrast !important;
  image-rendering: crisp-edges !important;
  transition: transform 0.45s ease !important;
}

.three-card-exact-item:hover .three-card-exact-img {
  transform: scale(1.02) !important;
}

@media (max-width: 900px) {
  .three-cards-horizontal-row {
    gap: 14px !important;
    overflow-x: auto !important;
    padding-bottom: 12px !important;
    -webkit-overflow-scrolling: touch !important;
  }
  .three-card-exact-item {
    min-width: 280px !important;
  }
}
`;

fs.appendFileSync('src/styles/Home.css', '\n' + cssToAdd, 'utf8');
console.log('Appended clean CSS to Home.css');


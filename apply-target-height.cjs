const fs = require('fs');

const css = `
/* ==========================================================================
   PERFECT PROPORTIONS: 370px HEIGHT (15-20% REDUCTION, ZERO EMPTY SPACE)
   ========================================================================== */
.premium-luxury-services-section {
  padding: 36px 0 52px 0 !important;
  background: #FFFFFF !important;
  width: 100% !important;
}

.premium-services-container {
  max-width: 1240px !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
  box-sizing: border-box !important;
}

.services-pill-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: rgba(37, 99, 235, 0.08) !important;
  border: 1.5px solid rgba(37, 99, 235, 0.28) !important;
  color: #1D4ED8 !important;
  font-size: 0.74rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  padding: 5px 15px !important;
  border-radius: 999px !important;
  margin-bottom: 10px !important;
  width: fit-content !important;
}

.services-main-heading {
  font-size: 2.3rem !important;
  font-weight: 900 !important;
  color: #0F172A !important;
  letter-spacing: -0.02em !important;
  margin: 0 0 26px 0 !important;
  line-height: 1.15 !important;
  text-align: left !important;
}

/* 3 Cards Horizontal Grid */
.luxury-service-cards-row {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 24px !important;
  width: 100% !important;
  align-items: stretch !important;
}

/* Target desktop card height: exactly 370px (15-20% reduced) */
.luxury-service-card {
  display: flex !important;
  flex-direction: column !important;
  height: 370px !important;
  border-radius: 20px !important;
  overflow: hidden !important;
  text-decoration: none !important;
  background: #FAF8F4 !important;
  border: 1px solid #D6AD70 !important;
  box-shadow: 0 8px 24px -4px rgba(23, 54, 93, 0.11), 0 3px 10px rgba(214, 173, 112, 0.11) !important;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease !important;
  position: relative !important;
}

.luxury-service-card:hover {
  transform: translateY(-6px) !important;
  border-color: #C89B52 !important;
  box-shadow: 0 18px 40px -5px rgba(23, 54, 93, 0.20), 0 6px 20px rgba(214, 173, 112, 0.22) !important;
}

/* Image Section - Crisp & Perfectly Sized */
.luxury-card-image-box {
  position: relative !important;
  width: 100% !important;
  height: 50% !important;
  overflow: hidden !important;
  background: #F1F5F9 !important;
}

.luxury-card-image {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center center !important;
  display: block !important;
  filter: none !important;
  opacity: 1 !important;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.luxury-service-card:hover .luxury-card-image {
  transform: scale(1.05) !important;
}

/* Content Panel - Balanced Spacing with Zero Excess Bottom Gap */
.luxury-card-content-panel {
  position: relative !important;
  flex: 1 !important;
  background: #FFFFFF !important;
  padding: 20px 22px 18px 22px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  border-top: 1px solid rgba(214, 173, 112, 0.30) !important;
}

/* Floating Rounded-Square Icon Box */
.luxury-floating-icon-box {
  position: absolute !important;
  top: -22px !important;
  left: 20px !important;
  width: 44px !important;
  height: 44px !important;
  border-radius: 12px !important;
  background: #FFFFFF !important;
  border: 1.5px solid #D6AD70 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 4px 14px rgba(23, 54, 93, 0.12) !important;
  z-index: 3 !important;
  transition: transform 0.3s ease, border-color 0.3s ease !important;
}

.luxury-floating-icon-box svg {
  width: 20px !important;
  height: 20px !important;
}

.luxury-service-card:hover .luxury-floating-icon-box {
  transform: translateY(-2px) scale(1.06) !important;
  border-color: #C89B52 !important;
}

/* Typography */
.luxury-card-text-group {
  margin-top: 6px !important;
}

.luxury-card-title {
  margin: 0 0 6px 0 !important;
  font-family: 'Playfair Display', Georgia, serif !important;
  font-size: 1.36rem !important;
  font-weight: 700 !important;
  line-height: 1.25 !important;
  letter-spacing: -0.01em !important;
  text-shadow: none !important;
}

.luxury-navy-text {
  color: #17365D !important;
}

.luxury-gold-text {
  color: #C89B52 !important;
}

.luxury-card-description {
  margin: 0 !important;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
  font-size: 0.86rem !important;
  line-height: 1.5 !important;
  color: #4F5D6B !important;
  font-weight: 500 !important;
  text-shadow: none !important;
}

/* Explore Service Button */
.luxury-card-btn-box {
  margin-top: 10px !important;
}

.luxury-pill-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 6px 18px !important;
  border-radius: 999px !important;
  background: #FFFFFF !important;
  border: 1px solid #D6AD70 !important;
  box-shadow: 0 2px 7px rgba(214, 173, 112, 0.14) !important;
  transition: all 0.3s ease !important;
}

.luxury-pill-btn-text {
  color: #17365D !important;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
}

.luxury-pill-btn-arrow {
  color: #C89B52 !important;
  font-size: 1rem !important;
  font-weight: 800 !important;
  transition: transform 0.3s ease !important;
}

.luxury-service-card:hover .luxury-pill-btn {
  background: #FAF8F4 !important;
  border-color: #C89B52 !important;
  box-shadow: 0 4px 12px rgba(200, 155, 82, 0.24) !important;
}

.luxury-service-card:hover .luxury-pill-btn-arrow {
  transform: translateX(4px) !important;
}

/* Responsive Rules: Tablet = 2 cards, Mobile = 1 card */
@media (max-width: 1024px) {
  .luxury-service-cards-row {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 20px !important;
  }
}

@media (max-width: 680px) {
  .luxury-service-cards-row {
    grid-template-columns: 1fr !important;
    gap: 18px !important;
  }
  .luxury-service-card {
    height: auto !important;
    min-height: 350px !important;
  }
}
`;

fs.appendFileSync('src/styles/Home.css', '\n' + css, 'utf8');
console.log('Appended 370px height CSS to Home.css!');


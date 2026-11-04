const fs = require('fs');

const css = `
/* ==========================================================================
   COMPACT & ELEGANT LUXURY SERVICE CARDS (REDUCED SIZE)
   ========================================================================== */
.premium-luxury-services-section {
  padding: 32px 0 48px 0 !important;
  background: #FFFFFF !important;
  width: 100% !important;
}

.premium-services-container {
  max-width: 1120px !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
  box-sizing: border-box !important;
}

.services-pill-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: rgba(37, 99, 235, 0.08) !important;
  border: 1.5px solid rgba(37, 99, 235, 0.28) !important;
  color: #1D4ED8 !important;
  font-size: 0.70rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  padding: 5px 14px !important;
  border-radius: 999px !important;
  margin-bottom: 10px !important;
  width: fit-content !important;
}

.services-main-heading {
  font-size: 2.1rem !important;
  font-weight: 800 !important;
  color: #0F172A !important;
  letter-spacing: -0.02em !important;
  margin: 0 0 24px 0 !important;
  line-height: 1.15 !important;
  text-align: left !important;
}

/* 3 Cards Horizontal Grid with Reduced Gap */
.luxury-service-cards-row {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 20px !important;
  width: 100% !important;
  align-items: stretch !important;
}

.luxury-service-card {
  display: flex !important;
  flex-direction: column !important;
  height: 385px !important;
  border-radius: 18px !important;
  overflow: hidden !important;
  text-decoration: none !important;
  background: #FAF8F4 !important;
  border: 1px solid #D6AD70 !important;
  box-shadow: 0 8px 22px -4px rgba(23, 54, 93, 0.10), 0 3px 10px rgba(214, 173, 112, 0.10) !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease !important;
  position: relative !important;
}

.luxury-service-card:hover {
  transform: translateY(-6px) !important;
  border-color: #C89B52 !important;
  box-shadow: 0 16px 36px -6px rgba(23, 54, 93, 0.18), 0 6px 18px rgba(214, 173, 112, 0.20) !important;
}

/* Compact Image Area */
.luxury-card-image-box {
  position: relative !important;
  width: 100% !important;
  height: 48% !important;
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
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.luxury-service-card:hover .luxury-card-image {
  transform: scale(1.04) !important;
}

/* Compact Content Panel */
.luxury-card-content-panel {
  position: relative !important;
  flex: 1 !important;
  background: #FFFFFF !important;
  padding: 20px 18px 16px 18px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  border-top: 1px solid rgba(214, 173, 112, 0.30) !important;
}

/* Slightly Smaller Floating Icon */
.luxury-floating-icon-box {
  position: absolute !important;
  top: -20px !important;
  left: 18px !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 12px !important;
  background: #FFFFFF !important;
  border: 1.2px solid #D6AD70 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 4px 14px rgba(23, 54, 93, 0.12) !important;
  z-index: 3 !important;
  transition: transform 0.25s ease, border-color 0.25s ease !important;
}

.luxury-floating-icon-box svg {
  width: 18px !important;
  height: 18px !important;
}

.luxury-service-card:hover .luxury-floating-icon-box {
  transform: translateY(-2px) scale(1.05) !important;
  border-color: #C89B52 !important;
}

/* Typography - Perfectly Scaled & Sharp */
.luxury-card-text-group {
  margin-top: 4px !important;
}

.luxury-card-title {
  margin: 0 0 6px 0 !important;
  font-family: 'Playfair Display', Georgia, serif !important;
  font-size: 1.28rem !important;
  font-weight: 700 !important;
  line-height: 1.22 !important;
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
  font-size: 0.82rem !important;
  line-height: 1.48 !important;
  color: #4F5D6B !important;
  font-weight: 500 !important;
  text-shadow: none !important;
}

/* Compact Button */
.luxury-card-btn-box {
  margin-top: 10px !important;
}

.luxury-pill-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 6px 16px !important;
  border-radius: 999px !important;
  background: #FFFFFF !important;
  border: 1px solid #D6AD70 !important;
  box-shadow: 0 2px 6px rgba(214, 173, 112, 0.12) !important;
  transition: all 0.25s ease !important;
}

.luxury-pill-btn-text {
  color: #17365D !important;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important;
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
}

.luxury-pill-btn-arrow {
  color: #C89B52 !important;
  font-size: 0.95rem !important;
  font-weight: 800 !important;
  transition: transform 0.25s ease !important;
}

.luxury-service-card:hover .luxury-pill-btn {
  background: #FAF8F4 !important;
  border-color: #C89B52 !important;
  box-shadow: 0 3px 10px rgba(200, 155, 82, 0.22) !important;
}

.luxury-service-card:hover .luxury-pill-btn-arrow {
  transform: translateX(4px) !important;
}

/* Responsive Rules: Tablet = 2 cards, Mobile = 1 card */
@media (max-width: 960px) {
  .luxury-service-cards-row {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 16px !important;
  }
}

@media (max-width: 640px) {
  .luxury-service-cards-row {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  .luxury-service-card {
    height: auto !important;
    min-height: 360px !important;
  }
}
`;

fs.appendFileSync('src/styles/Home.css', '\n' + css, 'utf8');
console.log('Appended reduced size CSS!');


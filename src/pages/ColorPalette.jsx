import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Check,
  Copy,
  ShoppingCart,
  Layers,
  Home,
  Paintbrush
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/ColorPalette.css';

export const COLOR_PALETTES = {
  'royal-blue': {
    id: 'royal-blue',
    name: 'Royal Blue Palette',
    subtitle: 'Deep Royal Blue • Serene Luxury Living',
    tagline: 'A majestic, soothing ocean blue bringing serene elegance and modern luxury to master living spaces.',
    heroColor: '#1E40AF',
    accentColor: '#2563EB',
    bgLight: '#EFF6FF',
    badgeText: 'ROYAL PALETTE',
    shadesCount: 42,
    filterFamily: 'Blues',
    mood: 'Tranquil, Luxurious & Focused',
    roomRecommendations: ['Master Bedrooms', 'Accent Feature Walls', 'Home Theatres & Executive Studies'],
    shades: [
      { name: 'Imperial Royal Blue', hex: '#1E40AF', code: 'STT-BL01', finish: 'Velvet Matte' },
      { name: 'Deep Sapphire Wave', hex: '#1D4ED8', code: 'STT-BL02', finish: 'Satin Sheen' },
      { name: 'Cerulean Sky', hex: '#2563EB', code: 'STT-BL03', finish: 'High Gloss' },
      { name: 'Cobalt Horizon', hex: '#3B82F6', code: 'STT-BL04', finish: 'Soft Sheen' },
      { name: 'Nordic Ocean Mist', hex: '#60A5FA', code: 'STT-BL05', finish: 'Eggshell' },
      { name: 'Breeze Whispers', hex: '#93C5FD', code: 'STT-BL06', finish: 'Ultra Matte' },
    ],
  },
  'sun-gold': {
    id: 'sun-gold',
    name: 'Sun-Gold Yellow Palette',
    subtitle: 'Radiant Sun-Gold • Warm Energy & Joy',
    tagline: 'A radiant, joyful golden yellow capturing warm sunlight to brighten welcoming foyers and facades.',
    heroColor: '#D97706',
    accentColor: '#F59E0B',
    bgLight: '#FFFBEB',
    badgeText: 'SUNSHINE PALETTE',
    shadesCount: 36,
    filterFamily: 'Yellows & Oranges',
    mood: 'Energetic, Warm & Welcoming',
    roomRecommendations: ['Dining Rooms', 'Kitchen Accents', 'Sunny Foyers & Entrance Facades'],
    shades: [
      { name: 'Radiant Sun Gold', hex: '#D97706', code: 'STT-YL01', finish: 'Velvet Matte' },
      { name: 'Golden Marigold', hex: '#F59E0B', code: 'STT-YL02', finish: 'Satin Sheen' },
      { name: 'Amber Sunrise', hex: '#B45309', code: 'STT-YL03', finish: 'High Gloss' },
      { name: 'Warm Tuscan Ochre', hex: '#FBBF24', code: 'STT-YL04', finish: 'Eggshell' },
      { name: 'Buttercup Radiance', hex: '#FCD34D', code: 'STT-YL05', finish: 'Soft Sheen' },
      { name: 'Vanilla Sunlight', hex: '#FDE68A', code: 'STT-YL06', finish: 'Ultra Matte' },
    ],
  },
  'emerald-jade': {
    id: 'emerald-jade',
    name: 'Emerald Jade Palette',
    subtitle: 'Lush Emerald Jade • Pure Forest Harmony',
    tagline: 'A rich, restorative jewel emerald inspired by lush botanical foliage to bring organic harmony.',
    heroColor: '#059669',
    accentColor: '#10B981',
    bgLight: '#ECFDF5',
    badgeText: 'BOTANICAL PALETTE',
    shadesCount: 28,
    filterFamily: 'Greens',
    mood: 'Restorative, Calming & Botanical',
    roomRecommendations: ['Living Rooms', 'Balcony Patios', 'Study Rooms & Indoor Gardens'],
    shades: [
      { name: 'Deep Emerald Jewel', hex: '#047857', code: 'STT-GR01', finish: 'Velvet Matte' },
      { name: 'Lush Botanical Jade', hex: '#059669', code: 'STT-GR02', finish: 'Satin Sheen' },
      { name: 'Forest Moss Glow', hex: '#10B981', code: 'STT-GR03', finish: 'High Gloss' },
      { name: 'Pine Needle Serene', hex: '#065F46', code: 'STT-GR04', finish: 'Soft Sheen' },
      { name: 'Sage Leaf Velvet', hex: '#34D399', code: 'STT-GR05', finish: 'Eggshell' },
      { name: 'Mint Meadow Whisper', hex: '#6EE7B7', code: 'STT-GR06', finish: 'Ultra Matte' },
    ],
  },
};

const ColorPalette = () => {
  const { slug } = useParams();
  const palette = COLOR_PALETTES[slug] || COLOR_PALETTES['royal-blue'];
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeShade, setActiveShade] = useState(palette.shades[0]);

  // Find products that match this color family or relevant paints
  const matchingProducts = PRODUCTS.filter(
    (p) => p.colorFamily === palette.filterFamily || p.isFeatured
  ).slice(0, 4);

  const handleCopyCode = (shade) => {
    navigator.clipboard.writeText(shade.hex);
    setCopiedCode(shade.code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="color-palette-page">
      {/* Hero Banner */}
      <section
        className="palette-hero-section"
        style={{ background: `linear-gradient(135deg, ${palette.heroColor}15 0%, ${palette.bgLight} 100%)` }}
      >
        <div className="palette-container">
          <div className="palette-breadcrumb">
            <Link to="/" className="palette-back-link">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <span className="palette-crumb-sep">/</span>
            <span className="palette-crumb-current">Color Palette</span>
            <span className="palette-crumb-sep">/</span>
            <span className="palette-crumb-current" style={{ color: palette.heroColor, fontWeight: 700 }}>
              {palette.name}
            </span>
          </div>

          <div className="palette-hero-grid">
            <div className="palette-hero-left">
              <div
                className="palette-hero-badge"
                style={{ backgroundColor: `${palette.heroColor}20`, color: palette.heroColor }}
              >
                <Sparkles size={14} />
                <span>{palette.badgeText} • {palette.shadesCount}+ SHADES</span>
              </div>

              <h1 className="palette-hero-title">
                {palette.name}
              </h1>

              <p className="palette-hero-tagline" style={{ color: palette.heroColor }}>
                {palette.subtitle}
              </p>

              <p className="palette-hero-desc">
                {palette.tagline}
              </p>

              <div className="palette-mood-box">
                <div className="palette-mood-item">
                  <span className="mood-label">Atmosphere & Mood</span>
                  <span className="mood-val">{palette.mood}</span>
                </div>
                <div className="palette-mood-item">
                  <span className="mood-label">Best Suited For</span>
                  <span className="mood-val">{palette.roomRecommendations.join(' • ')}</span>
                </div>
              </div>

              <div className="palette-hero-actions">
                <Link
                  to={`/products?category=all`}
                  className="palette-explore-btn"
                  style={{ backgroundColor: palette.heroColor }}
                >
                  <Paintbrush size={17} />
                  <span>Browse All Paints In This Color</span>
                </Link>
                <Link to="/cart" className="palette-view-cart-btn">
                  <ShoppingCart size={17} />
                  <span>View Cart</span>
                </Link>
              </div>
            </div>

            {/* Right: Live Interactive Color Stage Card */}
            <div className="palette-stage-col">
              <div
                className="palette-interactive-stage-card"
                style={{ backgroundColor: activeShade.hex }}
              >
                <div className="palette-stage-gloss-overlay" />
                <div className="palette-stage-info-pill">
                  <span className="stage-pill-name">{activeShade.name}</span>
                  <span className="stage-pill-hex">{activeShade.hex}</span>
                </div>
                <div className="palette-stage-footer-pill">
                  <span>Selected Finish: <strong>{activeShade.finish}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Matching Paint Products in this Color Family */}
      <section className="palette-products-section">
        <div className="palette-container">
          <div className="palette-section-head">
            <div className="palette-section-pill">
              <Home size={14} />
              <span>AVAILABLE PAINT BUCKETS</span>
            </div>
            <h2 className="palette-section-title">
              Formulated Paints for this <span style={{ color: palette.heroColor }}>Palette</span>
            </h2>
            <p className="palette-section-sub">
              Authorized emulsions and coats ready for high-grade computerized tinting.
            </p>
          </div>

          <div className="palette-products-grid">
            {matchingProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>


        </div>
      </section>
    </div>
  );
};

export default ColorPalette;

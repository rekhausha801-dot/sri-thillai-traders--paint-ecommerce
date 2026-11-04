import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Paintbrush } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import interiorPaintCanImg from '../assets/crisp-category-interior-paint-can.jpg';
import exteriorPaintCanImg from '../assets/crisp-category-exterior-paint-can.jpg';
import woodMetalPaintCanImg from '../assets/crisp-category-wood-metal-paint-can.jpg';
import '../styles/Home.css';

const categoryImages = {
  'interior-wall-paints': interiorPaintCanImg,
  'exterior-wall-paints': exteriorPaintCanImg,
  'wood-metal-paints': woodMetalPaintCanImg,
};

const CATEGORY_CUSTOM_DATA = {
  'interior-wall-paints': {
    brandBadge: 'ROYAL PALETTE',
    colorName: 'Royal Blue',
    paletteSlug: 'royal-blue',
    colorHex: '#0D47A1',
    themeBg: '#EFF6FF',
    themeBorder: '#DBEAFE',
    tagline: 'Deep Royal Blue • Serene Luxury Living',
    description: 'A majestic, soothing ocean blue bringing serene elegance and modern luxury to master living spaces.',
    itemCount: '250',
    roomImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    roomLabel: 'Royal Blue Living Room',
  },
  'exterior-wall-paints': {
    brandBadge: 'SUNSHINE PALETTE',
    colorName: 'Sun-Gold Yellow',
    paletteSlug: 'sun-gold',
    colorHex: '#D97706',
    themeBg: '#FFFBEB',
    themeBorder: '#FDE68A',
    tagline: 'Radiant Sun-Gold • Warm Energy & Joy',
    description: 'A radiant, joyful golden yellow capturing warm sunlight to brighten welcoming foyers and facades.',
    itemCount: '180',
    roomImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    roomLabel: 'Sun-Gold Villa Facade',
  },
  'wood-metal-paints': {
    brandBadge: 'BOTANICAL PALETTE',
    colorName: 'Emerald Jade',
    paletteSlug: 'emerald-jade',
    colorHex: '#059669',
    themeBg: '#ECFDF5',
    themeBorder: '#A7F3D0',
    tagline: 'Lush Emerald Jade • Pure Forest Harmony',
    description: 'A rich, restorative jewel emerald inspired by lush botanical foliage to bring organic harmony.',
    itemCount: '120',
    roomImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    roomLabel: 'Emerald Jade Interior',
  },
};

const ProductCategories = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="categories-section" style={{ padding: '48px 0 60px 0' }}>
      <div className="container">
        {/* Section Header Row */}
        <div className="cat-header-row" style={{ marginBottom: '28px' }}>
          <div className="cat-header-left">
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
                width: 'fit-content'
              }}
            >
              <Paintbrush size={14} color="#1D4ED8" />
              <span>CURATED COLOR PALETTES</span>
            </div>

            <h2 
              style={{
                fontSize: '2.4rem',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                margin: '0',
                lineHeight: 1.15
              }}
            >
              Browse Colors
            </h2>
          </div>
        </div>

        {/* 3 Clean Beautiful Cards Container */}
        <div 
          className="categories-showcase-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
            width: '100%',
            maxWidth: '1240px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}
        >
          {CATEGORIES.slice(0, 3).map((category) => {
            const cardImg = categoryImages[category.id] || category.image;
            const customInfo = CATEGORY_CUSTOM_DATA[category.id] || {
              brandBadge: 'CURATED COLOR',
              colorName: category.name,
              paletteSlug: category.slug,
              colorHex: '#0D47A1',
              themeBg: '#EFF6FF',
              themeBorder: '#DBEAFE',
              tagline: category.tagline,
              description: category.description,
              itemCount: category.itemCount || '150',
              roomImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
              roomLabel: 'Room Makeover',
            };

            const isHovered = hoveredId === category.id;

            return (
              <div 
                key={category.id} 
                className="category-showcase-card"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  border: isHovered ? `1px solid ${customInfo.colorHex}` : '1px solid #E2E8F0',
                  boxShadow: isHovered 
                    ? `0 16px 36px -6px ${customInfo.colorHex}30, 0 4px 12px rgba(15, 23, 42, 0.08)` 
                    : '0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* 100% FULL CARD HOVER COVER IMAGE: Covers the entire card on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    pointerEvents: isHovered ? 'auto' : 'none',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1)' : 'scale(1.05)',
                    transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src={customInfo.roomImage}
                    alt={customInfo.roomLabel}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                    }}
                  />

                  {/* Top-Left Floating Room Label Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      padding: '5px 12px',
                      borderRadius: '999px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: customInfo.colorHex,
                      border: `1px solid ${customInfo.themeBorder}`,
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    {customInfo.roomLabel}
                  </span>

                  {/* Bottom Explore Button on Hover Cover */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '24px 16px 16px 16px',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.65) 100%)',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Link
                      to={`/products?category=${category.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: customInfo.colorHex,
                        color: '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '8px 16px',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                      }}
                    >
                      <span>Explore {customInfo.colorName}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Normal Card Content (Visible by Default) */}
                {/* 1. Normal Image Box */}
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '165px',
                    overflow: 'hidden',
                    background: '#F8FAFC',
                  }}
                >
                  <img
                    src={cardImg}
                    alt={customInfo.colorName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                      filter: 'none',
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />

                  {/* Shades Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: customInfo.colorHex,
                      border: `1px solid ${customInfo.themeBorder}`,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    {customInfo.itemCount}+ Shades
                  </span>
                </div>

                {/* 2. Normal Card Content Below */}
                <div 
                  style={{
                    padding: '14px 16px 16px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                  }}
                >
                  {/* Brand Tagline Badge */}
                  <span
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      background: customInfo.themeBg,
                      color: customInfo.colorHex,
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      padding: '3px 9px',
                      borderRadius: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    {customInfo.brandBadge}
                  </span>

                  {/* Title */}
                  <h3 
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: customInfo.colorHex,
                      margin: '0 0 6px 0',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {customInfo.colorName}
                  </h3>

                  {/* Tagline */}
                  <p 
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#475569',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {customInfo.tagline}
                  </p>

                  {/* Description */}
                  <p 
                    style={{
                      fontSize: '0.78rem',
                      color: '#64748B',
                      lineHeight: '1.5',
                      margin: '0 0 12px 0',
                      flexGrow: 1,
                    }}
                  >
                    {customInfo.description}
                  </p>

                  {/* Browse Colors CTA Button */}
                  <Link
                    to={`/products?category=${category.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: customInfo.colorHex,
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      padding: '6px 14px',
                      borderRadius: '999px',
                      textDecoration: 'none',
                      width: 'fit-content',
                      boxShadow: `0 4px 14px ${customInfo.colorHex}40`,
                    }}
                  >
                    <span>Browse Colors</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;

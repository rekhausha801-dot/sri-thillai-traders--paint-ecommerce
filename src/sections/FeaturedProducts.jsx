import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import card1Img from '../assets/featured-hd-card-1.png';
import card2Img from '../assets/featured-hd-card-2.png';
import card3Img from '../assets/featured-hd-card-3.png';
import card4Img from '../assets/featured-hd-card-4.png';

import '../styles/Home.css';

const SHOWCASE_CARDS = [
  {
    id: 'super-luxury',
    title: 'Super Luxury',
    subtitle: 'Luxury finish for timeless elegance.',
    image: card1Img,
    link: '/products?category=interior-paints&tier=super-luxury',
  },
  {
    id: 'luxury',
    title: 'Luxury',
    subtitle: 'Premium emulsion for a sophisticated look.',
    image: card2Img,
    link: '/products?category=interior-paints&tier=luxury',
  },
  {
    id: 'premium',
    title: 'Premium',
    subtitle: 'Reliable protection for brighter walls.',
    image: card3Img,
    link: '/products?category=interior-paints&tier=premium',
  },
  {
    id: 'economy',
    title: 'Economy',
    subtitle: 'Budget-friendly beauty with durable finish.',
    image: card4Img,
    link: '/products?category=interior-paints&tier=economy',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-section" style={{ padding: "40px 0 16px 0", background: "#FFFFFF", width: "100%" }}>
      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* Section Header Row */}
        <div className="featured-header-showcase" style={{ marginBottom: "32px", textAlign: "left" }}>
          <div className="featured-header-info">
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
              <Sparkles size={14} color="#1D4ED8" />
              <span>FEATURED PRODUCTS</span>
            </div>

            <h2 
              style={{
                fontSize: '2.4rem',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                margin: '0 0 6px 0',
                lineHeight: 1.15
              }}
            >
              Premium Paints for Every Space
            </h2>
            <p
              style={{
                fontSize: '0.92rem',
                color: '#64748B',
                margin: '0',
                fontWeight: 500,
                lineHeight: 1.5
              }}
            >
              Explore top-tier paints designed for long-lasting protection and luxurious finishes.
            </p>
          </div>
        </div>

        {/* 4 Showcase Cards: FULL COVER & CRYSTAL CLEAR HD */}
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))", 
            gap: "20px", 
            width: "100%", 
            margin: "0 auto" 
          }}
        >
          {SHOWCASE_CARDS.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              style={{ 
                width: "100%", 
                display: "block", 
                borderRadius: "22px", 
                overflow: "hidden", 
                boxShadow: "0 12px 30px -4px rgba(15, 23, 42, 0.16)", 
                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)", 
                background: "#F8FAFC",
                position: "relative",
                aspectRatio: "494 / 704"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 22px 48px -6px rgba(15, 23, 42, 0.26)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 12px 30px -4px rgba(15, 23, 42, 0.16)";
              }}
            >
              <img
                src={card.image}
                alt={`${card.title} - ${card.subtitle}`}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  display: "block", 
                  objectFit: "cover", 
                  objectPosition: "center center",
                  borderRadius: "22px",
                  imageRendering: "-webkit-optimize-contrast"
                }}
                loading="eager"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

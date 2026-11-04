import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import cleanInterior from '../assets/service-clean-interior.jpg';
import cleanExterior from '../assets/service-clean-exterior.jpg';
import cleanWaterproofing from '../assets/service-clean-waterproofing.jpg';
import '../styles/Home.css';

const serviceCards = [
  {
    id: 'interior',
    title: 'Interior Paints',
    desc: 'Dustless, silky smooth luxury finish that transforms your living spaces.',
    btnText: 'Explore Paints',
    image: cleanInterior,
    link: '/products?category=interior-wall-paints',
  },
  {
    id: 'exterior',
    title: 'Exterior Paints',
    desc: 'All-weather UV protection & dirt-shedding tech for lasting curb appeal.',
    btnText: 'Explore Paints',
    image: cleanExterior,
    link: '/products?category=exterior-wall-paints',
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing Paints & Solutions',
    desc: 'Scientific leak detection, terrace & damp-proof protection for your home.',
    btnText: 'Explore Paints',
    image: cleanWaterproofing,
    link: '/products?category=waterproofing',
  },
];

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <section
      className="services-section"
      style={{
        padding: '36px 0 54px 0',
        background: '#FFFFFF',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 20px',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        {/* Header Block */}
        <div style={{ marginBottom: '26px', textAlign: 'left' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1.5px solid rgba(37, 99, 235, 0.28)',
              color: '#1D4ED8',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '5px 15px',
              borderRadius: '999px',
              marginBottom: '10px',
              width: 'fit-content',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
            </span>
            <span>OUR EXPERTISE</span>
          </div>

          <h2
            style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              margin: '0 0 6px 0',
              lineHeight: 1.15,
            }}
          >
            Paints for Every Space
          </h2>
          <p
            style={{
              fontSize: '0.92rem',
              color: '#64748B',
              margin: '0',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            Premium paint collections and protective solutions for interiors, exteriors, and waterproofing.
          </p>
        </div>

        {/* 3 Horizontal Cards in 1 Row with Clean Images, Text Badge & Button */}
        <div 
          className="services-exact-grid"
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
          {serviceCards.map((item) => {
            const isHovered = hoveredCard === item.id;

            return (
              <Link
                key={item.id}
                to={item.link}
                className="services-clean-card"
                style={{
                  position: 'relative',
                  display: 'block',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  boxShadow: isHovered
                    ? '0 28px 64px -8px rgba(15, 23, 42, 0.28), 0 12px 32px rgba(15, 23, 42, 0.16), 0 4px 10px rgba(0, 0, 0, 0.10)'
                    : '0 20px 48px -6px rgba(15, 23, 42, 0.20), 0 8px 24px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
                  border: isHovered ? '1px solid rgba(37, 99, 235, 0.4)' : '1px solid rgba(226, 232, 240, 0.8)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: '#FFFFFF',
                }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '390px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '24px',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Bottom Content Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 18px 18px 18px',
                    background: isHovered
                      ? 'linear-gradient(to top, rgba(10, 25, 47, 0.94) 0%, rgba(10, 25, 47, 0.65) 60%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(10, 25, 47, 0.60) 0%, rgba(10, 25, 47, 0.15) 50%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '8px',
                    zIndex: 2,
                    transition: 'all 0.35s ease',
                  }}
                >
                  {/* 2-line Text: Hidden normally, revealed smoothly on Button/Card Hover */}
                  <div
                    style={{
                      textAlign: 'left',
                      maxHeight: isHovered ? '130px' : '0px',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(16px)',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease, opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      pointerEvents: 'none',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: '#FFFFFF',
                        fontSize: '1.18rem',
                        fontWeight: 800,
                        lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        margin: '4px 0 0 0',
                        color: 'rgba(255, 255, 255, 0.92)',
                        fontSize: '0.80rem',
                        lineHeight: 1.35,
                        fontWeight: 500,
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Compact Dark Blue Pill Action Button (Always Visible at Bottom) */}
                  <div
                    style={{
                      marginTop: isHovered ? '4px' : '0px',
                      background: isHovered ? '#0A2540' : '#0B3B75',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '7px 16px',
                      borderRadius: '999px',
                      boxShadow: isHovered ? '0 8px 22px rgba(11, 59, 117, 0.45)' : '0 4px 14px rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <span>{item.btnText}</span>
                    <ArrowRight 
                      size={13} 
                      color="#FFFFFF" 
                      style={{
                        transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import latestProjectBlueVilla from '../assets/latest-project-blue-villa.jpg';
import latestProjectBrownVilla from '../assets/latest-project-brown-villa.jpg';
import '../styles/LatestProductShowcase.css';

const SHOWCASE_SLIDES = [
  {
    id: 'modern-luxury-villa',
    image: latestProjectBlueVilla,
    titlePrefix: 'Modern Luxury Villa',
    titleHighlight: 'Transformation',
    categoryLink: '/products?category=exterior-wall-paints',
  },
  {
    id: 'brown-villa',
    image: latestProjectBrownVilla,
    titlePrefix: 'Warm Earth Luxury Villa',
    titleHighlight: 'Makeover',
    categoryLink: '/products?category=exterior-wall-paints',
  },
];

const LatestProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto carousel timer: slides change every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = SHOWCASE_SLIDES[currentIndex];

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  return (
    <section 
      className="latest-showcase-section" 
      style={{ padding: "16px 0 54px 0", background: "#FFFFFF", width: "100%" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Section Header Matching Sri Thillai Pill Badge Theme */}
        <div className="showcase-header-block" style={{ marginBottom: "24px", textAlign: "left" }}>
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
              width: 'fit-content'
            }}
          >
            <Sparkles size={13} color="#1D4ED8" />
            <span>RECENT WORK</span>
          </div>

          <h2 
            style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              margin: '0 0 6px 0',
              lineHeight: 1.15
            }}
          >
            Latest Projects
          </h2>
          <p 
            style={{
              fontSize: '0.92rem',
              color: '#64748B',
              margin: 0,
              fontWeight: 500
            }}
          >
            Explore our recently transformed homes and commercial spaces.
          </p>
        </div>

        {/* Showcase Carousel Card Container */}
        <div className="showcase-carousel-wrapper" style={{ position: "relative", width: "100%", maxWidth: "960px", margin: "0 auto" }}>
          <Link 
            to={currentSlide.categoryLink} 
            className="apcolite-banner-card showcase-ref-card" 
            style={{ 
              position: "relative",
              textDecoration: "none", 
              display: "block", 
              width: "100%", 
              margin: "0 auto",
              borderRadius: "18px", 
              overflow: "hidden", 
              lineHeight: 0,
              boxShadow: "0 14px 34px -10px rgba(15, 23, 42, 0.22)",
              transition: "transform 0.35s ease, box-shadow 0.35s ease"
            }}
          >
            {/* Smooth Crossfade Slides */}
            {SHOWCASE_SLIDES.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.titlePrefix}
                className="showcase-card-img" 
                style={{ 
                  position: idx === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  width: "100%", 
                  height: "100%",
                  display: "block", 
                  objectFit: "cover",
                  objectPosition: "center center",
                  borderRadius: "20px",
                  imageRendering: "-webkit-optimize-contrast",
                  opacity: idx === currentIndex ? 1 : 0,
                  transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s ease",
                  transform: idx === currentIndex ? "scale(1)" : "scale(1.02)",
                  pointerEvents: idx === currentIndex ? "auto" : "none"
                }}
              />
            ))}

            {/* Bottom-Left Luxury Typography Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(11, 26, 44, 0.70) 50%, rgba(11, 26, 44, 0.94) 100%)",
                padding: "30px 24px 18px 24px",
                textAlign: "left",
                zIndex: 3
              }}
            >
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "1.55rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  transition: "all 0.3s ease"
                }}
              >
                {currentSlide.titlePrefix}{' '}
                <span style={{ color: "#F59E0B", fontStyle: "italic" }}>{currentSlide.titleHighlight}</span>
              </h3>

              <div style={{ marginTop: "8px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#E2E8F0",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
                  }}
                >
                  <span>View Project Details</span>
                  <ArrowRight size={15} color="#F59E0B" />
                </span>
              </div>
            </div>
          </Link>

          {/* Carousel Dots Indicators */}
          <div 
            style={{
              position: "absolute",
              bottom: "16px",
              right: "28px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 5
            }}
          >
            {SHOWCASE_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}`}
                style={{
                  width: dotIdx === currentIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: dotIdx === currentIndex ? "#F59E0B" : "rgba(255, 255, 255, 0.5)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProductShowcase;

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import livingBefore from '../assets/inspiration-before.jpg';
import livingAfter from '../assets/inspiration-after.jpg';
import exteriorBefore from '../assets/exterior-before.jpg';
import exteriorAfter from '../assets/exterior-after.jpg';
import bedroomBefore from '../assets/bedroom-before.jpg';
import bedroomAfter from '../assets/bedroom-after.jpg';
import '../styles/InspirationSection.css';

const inspirationProjects = [
  {
    id: 'living-room',
    title: 'Living Room Makeover',
    beforeImg: livingBefore,
    afterImg: livingAfter,
  },
  {
    id: 'exterior-facade',
    title: 'Luxury Villa Exterior',
    beforeImg: exteriorBefore,
    afterImg: exteriorAfter,
  },
  {
    id: 'master-bedroom',
    title: 'Master Bedroom Makeover',
    beforeImg: bedroomBefore,
    afterImg: bedroomAfter,
  },
];

const InspirationSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="inspiration-section" style={{ paddingTop: "16px", paddingBottom: "24px" }}>
      <div className="container">
        {/* Unified Pill Badge Header */}
        <div className="inspiration-header" style={{ marginBottom: '28px' }}>
          <div className="inspiration-title-col">
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
              <span>REAL MAKEOVERS</span>
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
              Inspiration
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
              See stunning real-life transformations with our premium paint makeovers.
            </p>
          </div>
        </div>

        {/* 3 Pure Full-Image Cards Grid */}
        <div className="inspiration-grid">
          {inspirationProjects.map((project) => {
            const isHovered = hoveredCard === project.id;

            return (
              <div
                key={project.id}
                className={`inspiration-card inspiration-card-full ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onTouchStart={() => setHoveredCard(isHovered ? null : project.id)}
              >
                {/* Full-bleed Image Media */}
                <div className="inspiration-card-media">
                  {/* Before Image (Default) */}
                  <img
                    src={project.beforeImg}
                    alt={`${project.title} - Before`}
                    className="inspiration-card-img inspiration-card-before"
                  />

                  {/* After Image (Revealed on Hover) */}
                  <img
                    src={project.afterImg}
                    alt={`${project.title} - After`}
                    className="inspiration-card-img inspiration-card-after"
                  />

                  {/* ONLY Before / After Badge */}
                  <div className={`inspiration-state-badge ${isHovered ? 'badge-after' : 'badge-before'}`}>
                    <span className="badge-dot" />
                    <span>{isHovered ? 'After' : 'Before'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;

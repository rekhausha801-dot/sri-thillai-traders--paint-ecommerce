import React, { useRef } from 'react';
import heroVideo from '../assets/gemini_generated_video_c5e672e1.mp4';
import '../styles/Home.css';

const HeroBanner = () => {
  const videoRef = useRef(null);

  return (
    <section className="hero-banner hero-video-banner" style={{ width: '100%', background: '#ffffff', overflow: 'hidden', padding: 0, margin: 0 }}>
      <div
        style={{
          width: '100%',
          height: '700px',
          position: 'relative',
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            transform: 'scale(1.15)',
            transformOrigin: 'center center',
          }}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />
      </div>
    </section>
  );
};

export default HeroBanner;

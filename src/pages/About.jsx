import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gem,
  Palette,
  ShieldCheck,
  Users,
  Eye,
  Target,
  PaintBucket,
  Handshake,
  Award,
  Sparkles,
} from "lucide-react";
import "../styles/About.css";

const features = [
  {
    icon: <Gem />,
    title: "Premium Quality Paints",
    desc: "Long-lasting beauty for your walls.",
    bg: "linear-gradient(145deg, #c4c4e8 0%, #aaaad8 100%)",
    borderColor: "rgba(130, 130, 190, 0.4)",
    textColor: "#1f1d46",
    descColor: "#353268",
    iconColor: "#1d1a4e",
  },
  {
    icon: <Palette />,
    title: "Wide Range of Colours",
    desc: "Find your perfect shade.",
    bg: "linear-gradient(145deg, #185878 0%, #0d3b53 100%)",
    borderColor: "rgba(245, 199, 109, 0.5)",
    textColor: "#ffffff",
    descColor: "rgba(255, 255, 255, 0.88)",
    iconColor: "#fce19a",
  },
  {
    icon: <ShieldCheck />,
    title: "Trusted Paint Products",
    desc: "Only the best for you.",
    bg: "linear-gradient(145deg, #a8c898 0%, #8cae7c 100%)",
    borderColor: "rgba(100, 140, 90, 0.4)",
    textColor: "#163412",
    descColor: "#264822",
    iconColor: "#143210",
  },
  {
    icon: <Users />,
    title: "Customer Satisfaction",
    desc: "Your happiness is our priority.",
    bg: "linear-gradient(145deg, #ede0d4 0%, #d8c2b0 100%)",
    borderColor: "rgba(190, 160, 140, 0.45)",
    textColor: "#3e2718",
    descColor: "#563b28",
    iconColor: "#3e2718",
  },
];

const collections = [
  {
    title: "Interior Paints",
    image: "/images/interior-paint.jpg",
    link: "/products?category=interior-wall-paints",
  },
  {
    title: "Exterior Paints",
    image: "/images/exterior-paint.jpg",
    link: "/products?category=exterior-wall-paints",
  },
  {
    title: "Wood Finishes",
    image: "/images/wood-finish.jpg",
    link: "/products?category=wood-finishes",
  },
  {
    title: "Waterproofing",
    image: "/images/waterproofing.jpg",
    link: "/products?category=waterproofing",
  },
];

function About() {
  return (
    <main className="about-page">

      {/* HERO SECTION WITH CREATIVE PAINT SPLASH BANNER AND TEXT OVERLAY */}
      <section className="about-hero-banner-creative">
        <div className="about-hero-creative-overlay">
          <div className="about-hero-creative-content">
            <p className="breadcrumb">
              Home / <span>About Us</span>
            </p>

            <h1>
              Transforming Spaces
              <br />
              <span>with Colours</span>
            </h1>

            <p className="hero-description">
              Bringing beauty, quality and endless inspiration
              to every wall of your home.
            </p>

            <Link to="/products" className="gold-button">
              Explore Our Collection
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="our-story">
        <div className="story-image">
          <img
            src="/images/our-story.jpg"
            alt="Premium painted living room"
          />
        </div>

        <div className="story-content">
          <span className="section-label">OUR STORY</span>

          <h2>
            A Passion for Colours,
            <br />
            A Commitment to <span>Quality</span>
          </h2>

          <div className="small-gold-line"></div>

          <p>
            At Sri Thillai Traders, we believe that colours
            have the power to transform ordinary spaces into
            extraordinary ones. As a trusted paint products
            destination, we are committed to offering premium
            quality paints, a wide variety of colours and an
            exceptional shopping experience.
          </p>

          <div className="small-gold-line bottom-line"></div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <div className="section-heading">
          <span></span>
          <h2>Why Choose Sri Thillai Traders</h2>
          <span></span>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <div
              className="feature-card"
              key={index}
              style={{
                background: item.bg,
                borderColor: item.borderColor,
                color: item.textColor,
                boxShadow: '0 8px 22px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div className="feature-icon" style={{ color: item.iconColor }}>
                {item.icon}
              </div>
              <h3 style={{ color: item.textColor }}>{item.title}</h3>
              <p style={{ color: item.descColor }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAINT COLLECTION */}
      <section className="collection-section">
        <div className="collection-intro">
          <span className="collection-label">
            Our Paint Collection
          </span>

          <h2>
            Colours for Every
            <br />
            <span>Space & Style</span>
          </h2>

          <p>
            Explore our premium range of paints for
            interiors, exteriors and more.
          </p>

          <Link to="/products" className="gold-button">
            Explore Products <ArrowRight size={18} />
          </Link>
        </div>

        <div className="collection-grid">
          {collections.map((item, index) => (
            <Link
              to={item.link || "/products"}
              className="collection-card"
              key={index}
            >
              <img src={item.image} alt={item.title} />
              <div className="collection-title">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VISION AND MISSION */}
      <section className="vision-section">
        <div className="vision-grid">

          <div className="vision-card vision-card-live">
            <img
              src="/images/vision-house-full.jpg"
              alt="Our Vision - Sri Thillai Traders"
              className="vision-card-bg-img"
            />
            <div className="vision-card-gradient-overlay"></div>
            <div className="vision-card-live-content">
              <Eye className="vision-icon-gold" />
              <div className="vision-text-block">
                <h3>Our Vision</h3>
                <p>
                  To inspire beautiful spaces through exceptional paint products and endless colour possibilities.
                </p>
              </div>
            </div>
          </div>

          <div className="vision-card mission-card vision-card-live">
            <img
              src="/images/mission-interior-full.jpg"
              alt="Our Mission - Sri Thillai Traders"
              className="vision-card-bg-img"
            />
            <div className="vision-card-gradient-overlay"></div>
            <div className="vision-card-live-content">
              <Target className="vision-icon-gold" />
              <div className="vision-text-block">
                <h3>Our Mission</h3>
                <p>
                  To provide quality paint products, attractive colour choices and a satisfying shopping experience for every customer.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* TRUST HIGHLIGHTS */}
        <div className="trust-grid">
          <div className="trust-item">
            <img src="/images/trust-can.png" alt="Quality Paint Products" style={{ width: 28, height: 36, objectFit: 'contain' }} />
            <span>Quality<br />Paint Products</span>
          </div>

          <div className="trust-item">
            <img src="/images/trust-fan.png" alt="Beautiful Colour Choices" style={{ width: 32, height: 32, objectFit: 'contain' }} />
            <span>Beautiful<br />Colour Choices</span>
          </div>

          <div className="trust-item">
            <Handshake style={{ width: 34, height: 34, color: '#f5c76d' }} />
            <span>Customer<br />Satisfaction</span>
          </div>

          <div className="trust-item">
            <ShieldCheck style={{ width: 34, height: 34, color: '#f5c76d' }} />
            <span>Trusted Shopping<br />Experience</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="about-cta">
        <div className="cta-content">
          <span className="cta-label">
            DISCOVER THE WORLD OF COLOURS
          </span>

          <h2>
            Bring Your <span>Walls to Life</span>
          </h2>

          <p>
            Discover beautiful colours and quality paints
            to transform your space.
          </p>

          <Link to="/products" className="gold-button">
            Shop Paints Now
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

    </main>
  );
}

export default About;

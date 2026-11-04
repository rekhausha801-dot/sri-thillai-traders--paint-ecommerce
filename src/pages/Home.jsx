import React from 'react';
import HeroBanner from '../sections/HeroBanner';
import ProductCategories from '../sections/ProductCategories';
import ServicesSection from '../sections/ServicesSection';
import FeaturedProducts from '../sections/FeaturedProducts';
import InspirationSection from '../sections/InspirationSection';
import LatestProductShowcase from '../sections/LatestProductShowcase';

const Home = () => {
  return (
    <div>
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Product Categories */}
      <ProductCategories />

      {/* 3. Services Section */}
      <ServicesSection />

      {/* 4. Featured Products */}
      <FeaturedProducts />

      {/* 5. Inspiration (Before / After Real Project Makeover) */}
      <InspirationSection />

      {/* 6. Latest Product Showcase (Apcolite ALL PROTEK SHYNE) */}
      <LatestProductShowcase />
    </div>
  );
};

export default Home;

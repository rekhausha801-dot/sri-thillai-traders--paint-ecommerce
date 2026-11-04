import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import showcaseRoyal from '../assets/showcase-royal.png';
import showcaseSilk from '../assets/showcase-silk.png';
import showcaseImpressions from '../assets/showcase-impressions.png';
import showcaseWeathershield from '../assets/showcase-weathershield.png';
import '../styles/ProductCard.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=700&q=80';

const SHOWCASE_MAP = {
  'prod-001': showcaseRoyal,
  'prod-002': showcaseSilk,
  'prod-003': showcaseImpressions,
  'prod-004': showcaseWeathershield,
};

const PRODUCT_THEMES = {
  'prod-001': {
    accent: '#0A2540',
    badgeBg: '#E0EEFD',
    badgeColor: '#1D4ED8',
    cardBg: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 42%, #F1F7FD 100%)',
    borderColor: '#DCEAFE',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'Rich Matt Finish' },
      { text: 'Long Lasting' },
      { text: 'Smooth Finish' },
    ],
    featuresPos: 'left',
  },
  'prod-002': {
    accent: '#0A2540',
    badgeBg: '#F3E8FF',
    badgeColor: '#7E22CE',
    cardBg: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 42%, #F6EEFD 100%)',
    borderColor: '#EDE9FE',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'Smooth Finish' },
      { text: 'Long Lasting' },
      { text: 'Rich Colours' },
    ],
    featuresPos: 'right',
  },
  'prod-003': {
    accent: '#0A2540',
    badgeBg: '#CCFBF1',
    badgeColor: '#0F766E',
    cardBg: 'linear-gradient(180deg, #F0FDF9 0%, #FFFFFF 42%, #E7FAF4 100%)',
    borderColor: '#CCFBF1',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'Rich Colours' },
      { text: 'Smooth Finish' },
      { text: 'Long Lasting' },
    ],
    featuresPos: 'right',
  },
  'prod-004': {
    accent: '#0A2540',
    badgeBg: '#E0F2FE',
    badgeColor: '#0284C7',
    cardBg: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 42%, #E2F2FE 100%)',
    borderColor: '#BAE6FD',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'Weather Resistant' },
      { text: 'Long Lasting' },
      { text: 'Water Repellent' },
    ],
    featuresPos: 'left',
  },
  'prod-005': {
    accent: '#0A2540',
    badgeBg: '#E0EEFD',
    badgeColor: '#1D4ED8',
    cardBg: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 42%, #F1F7FD 100%)',
    borderColor: '#DCEAFE',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'Superior Adhesion' },
      { text: 'Damp Resistant' },
      { text: 'Smooth Base' },
    ],
    featuresPos: 'left',
  },
  'prod-006': {
    accent: '#0A2540',
    badgeBg: '#FEF3C7',
    badgeColor: '#B45309',
    cardBg: 'linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 42%, #FEF3C7 100%)',
    borderColor: '#FDE68A',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'Vibrant Shades' },
      { text: 'Matte Finish' },
      { text: 'Economical' },
    ],
    featuresPos: 'right',
  },
  'prod-007': {
    accent: '#0A2540',
    badgeBg: '#D1FAE5',
    badgeColor: '#047857',
    cardBg: 'linear-gradient(180deg, #ECFDF5 0%, #FFFFFF 42%, #D1FAE5 100%)',
    borderColor: '#A7F3D0',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'Ultra Smooth' },
      { text: 'Crack Resistant' },
      { text: 'Water Repellent' },
    ],
    featuresPos: 'right',
  },
  'prod-008': {
    accent: '#0A2540',
    badgeBg: '#EEF2FF',
    badgeColor: '#4338CA',
    cardBg: 'linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 42%, #E0E7FF 100%)',
    borderColor: '#C7D2FE',
    btnBg: '#0A2540',
    shadowColor: 'rgba(10, 37, 64, 0.35)',
    features: [
      { text: 'All-Round Protect' },
      { text: 'Rich Sheen' },
      { text: 'Washable' },
    ],
    featuresPos: 'left',
  },
};

const DEFAULT_THEME = {
  accent: '#0A2540',
  badgeBg: '#E0EEFD',
  badgeColor: '#1D4ED8',
  cardBg: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 42%, #F1F7FD 100%)',
  borderColor: '#DCEAFE',
  btnBg: '#0A2540',
  shadowColor: 'rgba(10, 37, 64, 0.35)',
  features: [
    { text: 'Smooth Finish' },
    { text: 'Long Lasting' },
    { text: 'Rich Colours' },
  ],
  featuresPos: 'right',
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isAdded, setIsAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const theme = PRODUCT_THEMES[product.id] || DEFAULT_THEME;
  const showcaseImg = SHOWCASE_MAP[product.id];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultPack = product.defaultPackSize || product.packSize || '20L';
    addToCart(product, defaultPack, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const categoryTag = (product.categoryName || product.subtitle || 'Paint').toUpperCase();
  const specsText = [
    product.brand,
    product.finish || 'Matte',
    product.packSize || '20L',
  ].filter(Boolean).join(' • ');

  return (
    <div 
      className="product-card"
      style={{
        background: theme.cardBg,
        borderColor: theme.borderColor,
        '--card-theme-shadow': theme.shadowColor || 'rgba(15, 23, 42, 0.08)',
        '--card-theme-accent': theme.accent,
      }}
    >
      {/* 1. TOP HEADER: Category Pill & Round Wishlist Button */}
      <div className="product-card-top">
        <span 
          className="product-card-category-pill"
          style={{ 
            backgroundColor: theme.badgeBg, 
            color: theme.badgeColor 
          }}
        >
          {categoryTag}
        </span>

        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`product-card-wishlist-circle ${inWishlist ? 'active' : ''}`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            size={16}
            fill={inWishlist ? '#EF4444' : 'none'}
            color={inWishlist ? '#EF4444' : '#0A2540'}
            strokeWidth={2.4}
          />
        </button>
      </div>

      {/* 2. TITLE & SPECS */}
      <div className="product-card-title-group">
        <Link to={`/product/${product.id}`} className="product-card-title-link">
          <h3 className="product-card-name" title={product.name}>
            {product.name}
          </h3>
        </Link>
        <span className="product-card-specs">{specsText}</span>
      </div>

      {/* 3. CENTER IMAGE: Clean Isolated Product Paint Can */}
      <div className="product-card-image-box">
        <Link to={`/product/${product.id}`} className="product-card-thumbnail-link">
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            className="product-card-thumbnail"
            loading="lazy"
          />
        </Link>
      </div>

      {/* 4. BOTTOM FOOTER: Price & Theme-Colored Round Action Button */}
      <div className="product-card-footer">
        <div className="product-card-price-row">
          <span className="product-card-price-val">₹ {product.price?.toLocaleString('en-IN')}</span>
          <span className="product-card-price-unit"> / {product.packSize || '20L'}</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="product-card-action-btn"
          style={{
            backgroundColor: theme.btnBg,
            boxShadow: `0 6px 18px ${theme.shadowColor}`,
          }}
          aria-label="Add to Cart"
          title="Add to Cart"
        >
          <ShoppingCart size={17} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

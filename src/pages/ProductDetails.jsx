import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Star, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Check, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  PaintBucket,
  Droplets,
  Wind,
  Leaf,
  X,
  ThumbsUp,
  Upload,
  Camera,
  Trash2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

// Assets matching the user's reference design & visualizer
import pdpMainCan from '../assets/pdp-royal-shine-can.jpg';
import wholeHouseExterior from '../assets/featured-exterior-house.jpg';
import wholeHouseMask from '../assets/featured-exterior-house-mask.png';
import thumbWholeHouse from '../assets/thumb-whole-house.jpg';
import pdpRoomShowcase from '../assets/visualizer-living-room-hd.jpg';
import pdpRoomMask from '../assets/visualizer-living-room-mask-hd.png';
import thumbRoomVisualizer from '../assets/thumb-room-visualizer-hd.jpg';
import exteriorVillaShowcase from '../assets/service-clean-exterior.jpg';
import exteriorVillaMask from '../assets/service-clean-exterior-mask.png';
import thumbExteriorVilla from '../assets/thumb-clean-exterior.jpg';
import waterproofingShowcase from '../assets/service-clean-waterproofing.jpg';
import waterproofingMask from '../assets/service-clean-waterproofing-mask.png';
import thumbWaterproofing from '../assets/thumb-clean-waterproofing.jpg';
import refThumb1 from '../assets/pdp-ref-thumb-1.jpg';
import refThumb2 from '../assets/pdp-ref-thumb-2.jpg';
import refThumb3 from '../assets/pdp-ref-thumb-3.jpg';
import refThumb4 from '../assets/pdp-ref-thumb-4.jpg';

import { RotateCcw, Eye, SlidersHorizontal, Zap } from 'lucide-react';
import '../styles/ProductDetails.css';

const COLOR_SWATCHES = [
  { name: 'Pure White', hex: '#FFFFFF', border: true },
  { name: 'Warm Cream', hex: '#F5EBE1' },
  { name: 'Soft Sunshine', hex: '#FDE68A' },
  { name: 'Dusty Rose', hex: '#FCA5A5' },
  { name: 'Sky Blue', hex: '#BAE6FD' },
  { name: 'Sage Grey', hex: '#CBD5E1' },
  { name: 'Fresh Mint', hex: '#BBF7D0' },
  { name: 'Lavender Mist', hex: '#E9D5FF' },
  { name: 'Royal Sapphire', hex: '#3B82F6' },
  { name: 'Terracotta Earth', hex: '#E07A5F' },
  { name: 'Emerald Luxe', hex: '#10B981' },
  { name: 'Charcoal Slate', hex: '#475569' },
];

const FINISH_TYPES = [
  { id: 'matte', name: 'Matte', desc: 'Non-reflective velvet touch' },
  { id: 'satin', name: 'Satin', desc: 'Silky smooth with subtle glow' },
  { id: 'gloss', name: 'Gloss', desc: 'High-sheen brilliant sparkle' },
  { id: 'emulsion', name: 'Emulsion', desc: 'Luxury rich durable coat' },
];

const PACK_SIZE_TIERS = [
  { size: '1 L', price: 399 },
  { size: '4 L', price: 1299 },
  { size: '10 L', price: 2499 },
  { size: '20 L', price: 4499 },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackSize, setSelectedPackSize] = useState('10 L');
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0]);
  const [selectedFinish, setSelectedFinish] = useState('emulsion');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0); // 0: Bucket, 1: Room, 2: Palette, 3: Texture
  const [showBeforeAfter, setShowBeforeAfter] = useState(false); // false: after, true: before
  const [activeTab, setActiveTab] = useState('overview');
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Customer Upload House Photo Visualizer State
  const [customerHouseImage, setCustomerHouseImage] = useState(() => {
    try {
      return localStorage.getItem('paintpro_custom_house_img') || null;
    } catch {
      return null;
    }
  });

  const handleCustomerHouseUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        setCustomerHouseImage(result);
        try {
          localStorage.setItem('paintpro_custom_house_img', result);
        } catch (err) {
          console.error(err);
        }
        // Switch directly to the newly added uploaded customer house photo
        setActiveThumbIndex(4);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomerHouse = (e) => {
    e.stopPropagation();
    setCustomerHouseImage(null);
    try {
      localStorage.removeItem('paintpro_custom_house_img');
    } catch (err) {
      console.error(err);
    }
  };

  // Reviews State
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewImage, setNewReviewImage] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [activeReviewSlide, setActiveReviewSlide] = useState(0);

  // Initialize from localStorage or fallback
  const [userReviews, setUserReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('paintpro_pdp_user_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'rev-1',
        name: 'Janani E (Jeni)',
        date: '10/15/2026',
        rating: 5.0,
        title: 'premium chanin',
        comment: 'excellent',
        image: refThumb4,
        helpfulCount: 0,
      },
    ];
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewerName || !newReviewComment) return;

    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;

    const newRev = {
      id: `rev-${Date.now()}`,
      name: newReviewerName,
      date: formattedDate,
      rating: Number(newRating).toFixed(1),
      title: newReviewTitle || 'premium chanin',
      comment: newReviewComment,
      image: newReviewImage || refThumb4,
      helpfulCount: 0,
    };

    const updated = [newRev, ...userReviews];
    setUserReviews(updated);
    try {
      localStorage.setItem('paintpro_pdp_user_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setShowWriteReview(false);
    setReviewSubmitted(true);
    setNewReviewerName('');
    setNewReviewTitle('');
    setNewReviewCity('');
    setNewReviewComment('');
    setNewReviewImage(null);
    setTimeout(() => setReviewSubmitted(false), 4000);

    // Smoothly scroll down to the newly placed review card
    setTimeout(() => {
      const el = document.querySelector('.pdp-ref-reviews-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      let data = await productService.getProductById(id);
      if (!data) {
        // Fallback to primary product (Royal Shine / prod-001) if ID not found or general product route
        data = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0] || {
          id: id || 'prod-001',
          name: 'Royal Shine Premium Emulsion',
          brand: 'Asian Paints',
          price: 2850,
          originalPrice: 3250,
          image: pdpMainCan,
          category: 'interior-paints',
        };
      }
      setProduct(data);
      const allInCategory = await productService.getProducts({ category: data.category || 'interior-paints' });
      const filtered = allInCategory.filter((p) => p.id !== data.id).slice(0, 4);
      setRelatedProducts(filtered.length > 0 ? filtered : allInCategory.slice(0, 4));
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader message="Opening paint details..." />;
  }

  // Product can image dynamically loaded from current product
  const productCanImg = product?.image || pdpMainCan;

  // Vertical Gallery Thumbnails:
  // 1. Paint Bucket (Product Can)
  // 2. Interior Living Room Wall (Interactive Live Visualizer)
  // 3. Exterior Luxury Villa (Interactive Live Visualizer)
  // 4. Terrace & Waterproofing Surface (Interactive Live Visualizer)
  // 5. Customer's Uploaded House Photo (when uploaded - preserved alongside default photos)
  const defaultThumbnails = [
    { 
      id: 'bucket',
      thumb: productCanImg, 
      main: productCanImg, 
      label: 'Paint Bucket',
      alt: `${product?.name || 'Paint'} Bucket`,
      isVisualizer: false
    },
    { 
      id: 'house-wall',
      thumb: thumbRoomVisualizer, 
      main: pdpRoomShowcase, 
      mask: pdpRoomMask,
      label: 'Interior Wall Visualizer',
      alt: 'Interactive Interior Living Room Colour Visualizer',
      isVisualizer: true,
      isCustom: false
    },
    { 
      id: 'exterior-villa',
      thumb: thumbExteriorVilla, 
      main: exteriorVillaShowcase, 
      mask: exteriorVillaMask,
      label: 'Exterior Villa Visualizer',
      alt: 'Interactive Exterior Villa Facade Colour Visualizer',
      isVisualizer: true,
      isCustom: false
    },
    { 
      id: 'waterproofing-terrace',
      thumb: thumbWaterproofing, 
      main: waterproofingShowcase, 
      mask: waterproofingMask,
      label: 'Waterproofing & Terrace Visualizer',
      alt: 'Interactive Terrace & Waterproofing Surface Colour Visualizer',
      isVisualizer: true,
      isCustom: false
    },
  ];

  // If customer uploads their own house photo, it is ADDED as an extra thumbnail
  // without replacing or overwriting the default room/villa photos!
  const galleryThumbnails = customerHouseImage ? [
    ...defaultThumbnails,
    {
      id: 'customer-house',
      thumb: customerHouseImage,
      main: customerHouseImage,
      label: 'Your House Photo',
      alt: 'Customer House Wall Photo',
      isVisualizer: true,
      isCustom: true
    }
  ] : defaultThumbnails;

  const activeVisual = galleryThumbnails[activeThumbIndex] || galleryThumbnails[0];
  const isBucketActive = activeVisual.id === 'bucket';
  const isVisualizerActive = Boolean(activeVisual.isVisualizer);
  const isCustomHouseActive = Boolean(activeVisual.isCustom);

  // Active pricing calculation
  const packPriceMap = product?.packPrices || {};
  const currentTier = PACK_SIZE_TIERS.find((t) => t.size === selectedPackSize) || PACK_SIZE_TIERS[2];
  const currentPrice = packPriceMap[selectedPackSize] || (selectedPackSize === '20 L' || selectedPackSize === '20L' ? product?.price : currentTier.price) || product?.price || 2850;
  const originalPrice = product?.originalPrice ? (packPriceMap[selectedPackSize] ? Math.round(currentPrice * 1.25) : product.originalPrice) : Math.round(currentPrice * 1.25);
  const discountPercent = '22% OFF';

  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        price: currentPrice,
        originalPrice: originalPrice,
        packSize: selectedPackSize,
        selectedFinish,
        selectedColorName: selectedColor.name,
        selectedColorHex: selectedColor.hex,
      }, selectedPackSize, quantity);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        ...product,
        price: currentPrice,
        originalPrice: originalPrice,
        packSize: selectedPackSize,
        selectedFinish,
        selectedColorName: selectedColor.name,
        selectedColorHex: selectedColor.hex,
      }, selectedPackSize, quantity);
      navigate('/checkout');
    }
  };

  return (
    <div className="pdp-page">
      <div className="pdp-outer-wrapper">
        {/* 1. TOP BREADCRUMB */}
        <div className="pdp-top-header">
          <div className="pdp-breadcrumb">
            <Link to="/">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={13} color="#94A3B8" />
            <Link to={`/products?category=${product?.category || 'interior-paints'}`}>
              {product?.categoryName || 'Wall Paints'}
            </Link>
            <ChevronRight size={13} color="#94A3B8" />
            <span className="pdp-breadcrumb-active">{product?.name || 'Paint Details'}</span>
          </div>
        </div>

        {/* 2. TOP HERO ROW (GALLERY + PRODUCT SELECTION) */}
        <div className="pdp-hero-row">
          {/* Left: Gallery (Thumbnails + Main Stage) */}
          <div className="pdp-gallery-container">
            {/* Vertical Thumbnails */}
            <div className="pdp-vthumbs-column">
              {galleryThumbnails.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveThumbIndex(idx);
                    setShowBeforeAfter(false);
                  }}
                  className={`pdp-vthumb-item ${activeThumbIndex === idx ? 'active' : ''}`}
                  title={item.label}
                >
                  <img src={item.thumb} alt={item.alt} className="pdp-vthumb-img" />
                </button>
              ))}

              {/* Upload Customer's Own House Photo Button */}
              <label 
                className="pdp-vthumb-upload-btn" 
                title={customerHouseImage ? "Change your house photo" : "Upload your house photo & try colours"}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleCustomerHouseUpload} 
                  style={{ display: 'none' }} 
                />
                <Camera size={18} strokeWidth={2.2} />
                <span className="pdp-vthumb-upload-text">{customerHouseImage ? "Change" : "Upload"}</span>
              </label>
            </div>

            {/* Center: Main Stage Box with Live Colour Visualizer */}
            <div className="pdp-main-stage-box">
              {isVisualizerActive ? (
                /* LIVE COLOUR VISUALIZER FOR ROOMS & EXTERIORS (Supports Built-in & Customer House) */
                <div className="pdp-visualizer-viewport">
                  {/* Base Architecture / Room / Exterior Image */}
                  <img
                    src={activeVisual.main}
                    alt={activeVisual.alt}
                    className="pdp-main-stage-img"
                  />

                  {/* Customer Photo Indicator Badge */}
                  {isCustomHouseActive && (
                    <div className="pdp-custom-photo-badge">
                      <span>Your House Photo</span>
                      <button 
                        type="button" 
                        onClick={handleRemoveCustomerHouse} 
                        className="pdp-custom-photo-reset-btn"
                        title="Remove uploaded photo and restore sample room"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  {/* Wall recolour layer using precise alpha mask for full wall coverage */}
                  {!showBeforeAfter && (
                    <div 
                      className="pdp-wall-color-overlay"
                      style={isCustomHouseActive ? {
                        backgroundColor: selectedColor.hex,
                        mixBlendMode: 'multiply',
                        opacity: selectedColor.hex === '#FFFFFF' ? 0.35 : 0.82,
                      } : {
                        backgroundColor: selectedColor.hex,
                        WebkitMaskImage: `url(${activeVisual.mask})`,
                        maskImage: `url(${activeVisual.mask})`,
                        WebkitMaskSize: '100% 100%',
                        maskSize: '100% 100%',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        mixBlendMode: 'multiply',
                        opacity: selectedColor.hex === '#FFFFFF' ? 0.35 : 0.85,
                      }}
                    />
                  )}
                </div>
              ) : (
                /* Standard High Resolution Showcase for Bucket, Palette, Texture */
                <img
                  src={activeVisual.main}
                  alt={activeVisual.alt}
                  className={isBucketActive ? "pdp-main-stage-can-img" : "pdp-main-stage-img"}
                />
              )}
            </div>
          </div>

          {/* Right: Product Buy Info */}
          <div className="pdp-info-column">
            <div className="pdp-brand-seller-row">
              <span className="pdp-brand-tag">{product?.brand || 'Sri Thillai Traders'}</span>
              {product?.isBestSeller && <span className="pdp-best-seller-tag">Best Seller</span>}
            </div>

            <h1 className="pdp-main-title">
              {product?.name || 'Royal Shine Premium Emulsion'}
            </h1>

            <p className="pdp-tagline-text">
              {product?.description?.split('.')[0] ? `${product.description.split('.')[0]}.` : 'Luxury washable architectural wall coating for brilliant, long-lasting homes'}
            </p>

            <div className="pdp-rating-strip">
              <div className="pdp-stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#0D47A1" color="#0D47A1" />
                ))}
              </div>
              <span className="pdp-rating-score-bold">4.6</span>
              <span className="pdp-review-count-text">(124 Verified Reviews)</span>
            </div>

            <div className="pdp-price-headline">
              <span className="pdp-current-price">₹{currentPrice.toLocaleString('en-IN')}</span>
              <span className="pdp-original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
              <span className="pdp-discount-pill">{discountPercent}</span>
            </div>

            <p className="pdp-taxes-note">Inclusive of all taxes & free doorstep delivery</p>

            {/* Select Size Tiles */}
            <div className="pdp-option-group">
              <div className="pdp-option-title">Select Paint Size</div>
              <div className="pdp-size-tiles-grid">
                {PACK_SIZE_TIERS.map((tier) => (
                  <div
                    key={tier.size}
                    onClick={() => setSelectedPackSize(tier.size)}
                    className={`pdp-size-tile ${selectedPackSize === tier.size ? 'selected' : ''}`}
                  >
                    <span className="pdp-size-tile-label">{tier.size}</span>
                    <span className="pdp-size-tile-price">₹{tier.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>



            {/* Select Colour Swatches with Live HEX code & Visualizer Switch */}
            <div className="pdp-option-group">
              <div className="pdp-option-header-line">
                <span className="pdp-option-title">Select Wall Colour:</span>
                <span className="pdp-selected-color-name">
                  <span className="pdp-color-mini-preview" style={{ backgroundColor: selectedColor.hex }}></span>
                  {selectedColor.name} <code className="pdp-hex-tag">{selectedColor.hex}</code>
                </span>
              </div>
              
              <div className="pdp-colors-row">
                {COLOR_SWATCHES.map((swatch, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedColor(swatch);
                      setShowBeforeAfter(false);
                      // If user clicks a colour, switch directly to the room visualizer (index 1) so changes are immediately visible
                      if (!isVisualizerActive) {
                        setActiveThumbIndex(1);
                      }
                    }}
                    className={`pdp-color-circle ${selectedColor.name === swatch.name ? 'selected' : ''}`}
                    style={{ backgroundColor: swatch.hex }}
                    title={`${swatch.name} (${swatch.hex})`}
                    aria-label={swatch.name}
                  />
                ))}
                
                <label className="pdp-more-colors-btn" title="Choose custom color" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                  + More
                  <input
                    type="color"
                    value={selectedColor.hex}
                    onChange={(e) => {
                      setSelectedColor({ name: 'Custom Shade', hex: e.target.value });
                      setShowBeforeAfter(false);
                      if (!isVisualizerActive) {
                        setActiveThumbIndex(1);
                      }
                    }}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                  />
                </label>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="pdp-qty-row">
              <span className="pdp-qty-label">Quantity</span>
              <div className="pdp-qty-box">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="pdp-qty-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="pdp-qty-value">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="pdp-qty-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now Action Row */}
            <div className="pdp-cta-actions-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`pdp-add-to-cart-btn ${isAdded ? 'added' : ''}`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="pdp-buy-now-btn"
              >
                <Zap size={18} />
                <span>Buy Now</span>
              </button>

              <button
                type="button"
                onClick={() => product && toggleWishlist(product)}
                className="pdp-wishlist-toggle-btn"
                title="Save to Wishlist"
              >
                <Heart size={24} strokeWidth={2.2} fill={inWishlist ? '#0D47A1' : 'none'} color="#0D47A1" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. FOUR HIGHLIGHT PILLS BANNER (High Coverage, Washable, Low Odour, Eco Friendly) */}
        <div className="pdp-usp-strip">
          <div className="pdp-usp-item">
            <div className="pdp-usp-icon-wrap">
              <PaintBucket size={24} />
            </div>
            <div>
              <h4 className="pdp-usp-title">High Coverage</h4>
              <p className="pdp-usp-desc">Covers more area</p>
            </div>
          </div>

          <div className="pdp-usp-item">
            <div className="pdp-usp-icon-wrap">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="pdp-usp-title">Washable</h4>
              <p className="pdp-usp-desc">Easy to clean</p>
            </div>
          </div>

          <div className="pdp-usp-item">
            <div className="pdp-usp-icon-wrap">
              <Wind size={24} />
            </div>
            <div>
              <h4 className="pdp-usp-title">Low Odour</h4>
              <p className="pdp-usp-desc">Safe for your home</p>
            </div>
          </div>

          <div className="pdp-usp-item">
            <div className="pdp-usp-icon-wrap">
              <Leaf size={24} />
            </div>
            <div>
              <h4 className="pdp-usp-title">Eco Friendly</h4>
              <p className="pdp-usp-desc">Better for tomorrow</p>
            </div>
          </div>
        </div>

        {/* 4. TABS & OVERVIEW SECTION */}
        <div className="pdp-details-card">
          <div className="pdp-overview-grid">
              {/* Column 1: Description & Features */}
              <div>
                <h3 className="pdp-col-title">Product Description</h3>
                <p className="pdp-body-text">
                  {product?.description || 'A premium quality wall paint that gives your home a fresh and elegant look. With its smooth finish, excellent coverage and long-lasting colour, it keeps your walls beautiful for years.'}
                </p>

                <ul className="pdp-checklist">
                  <li className="pdp-checklist-item">
                    <Check size={16} color="#0052CC" strokeWidth={3} />
                    <span>Premium quality {product?.categoryName?.toLowerCase() || 'emulsion paint'}</span>
                  </li>
                  <li className="pdp-checklist-item">
                    <Check size={16} color="#0052CC" strokeWidth={3} />
                    <span>{product?.warranty || 'Long lasting vibrant colours'}</span>
                  </li>
                  <li className="pdp-checklist-item">
                    <Check size={16} color="#0052CC" strokeWidth={3} />
                    <span>{product?.finish ? `${product.finish} finish` : 'Smooth and elegant finish'}</span>
                  </li>
                  <li className="pdp-checklist-item">
                    <Check size={16} color="#0052CC" strokeWidth={3} />
                    <span>Low odour and eco-friendly</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Key Features with Icons */}
              <div>
                <h3 className="pdp-col-title">Key Features</h3>
                <div className="pdp-key-features-list">
                  <div className="pdp-kf-item">
                    <div className="pdp-kf-icon">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="pdp-kf-title">Finish</h4>
                      <p className="pdp-kf-value">{product?.finish || 'Smooth Matt Finish'}</p>
                    </div>
                  </div>

                  <div className="pdp-kf-item">
                    <div className="pdp-kf-icon">
                      <Layers size={18} />
                    </div>
                    <div>
                      <h4 className="pdp-kf-title">Coverage</h4>
                      <p className="pdp-kf-value">{product?.coverage || 'Up to 140 - 160 sq.ft/Litre'}</p>
                    </div>
                  </div>

                  <div className="pdp-kf-item">
                    <div className="pdp-kf-icon">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="pdp-kf-title">Drying Time</h4>
                      <p className="pdp-kf-value">Touch Dry: 1 Hour<br />Recoat: 4 Hours</p>
                    </div>
                  </div>

                  <div className="pdp-kf-item">
                    <div className="pdp-kf-icon">
                      <PaintBucket size={18} />
                    </div>
                    <div>
                      <h4 className="pdp-kf-title">Shelf Life</h4>
                      <p className="pdp-kf-value">2 Years (unopened)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Perfect for Every Space Banner */}
              <div className="pdp-promo-card">
                <img
                  src={pdpRoomShowcase}
                  alt="Perfect for Every Space"
                  className="pdp-promo-img"
                />
                <div className="pdp-promo-content">
                  <h4 className="pdp-promo-title">Perfect for Every Space</h4>
                  <p className="pdp-promo-desc">
                    Transform your home with beautiful and long-lasting colours. Royal Shine brings life to your walls.
                  </p>
                  <a 
  href="#top" 
  onClick={(e) => { 
    e.preventDefault(); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }} 
  className="pdp-promo-cta-btn"
>
                    Explore Colour Options
                    </a>
                </div>
              </div>
            </div>
        </div>

        {/* 5. CUSTOMER RATINGS & REVIEWS SECTION */}
        <div className="pdp-reviews-summary-grid">
              <div className="pdp-review-score-box">
                <div className="pdp-score-big">4.6</div>
                <div className="pdp-score-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#0D47A1" color="#0D47A1" />
                  ))}
                </div>
                <p className="pdp-score-count">Based on 124 verified customer reviews</p>
                <p className="pdp-recommend-tag">94% of customers recommend this paint</p>
              </div>

              {/* Rating Distribution Bars */}
              <div className="pdp-rating-bars-list">
                <div className="pdp-rating-bar-row">
                  <span className="pdp-bar-label">5 Star</span>
                  <div className="pdp-bar-track">
                    <div className="pdp-bar-fill" style={{ width: '74%' }} />
                  </div>
                  <span className="pdp-bar-count">92</span>
                </div>
                <div className="pdp-rating-bar-row">
                  <span className="pdp-bar-label">4 Star</span>
                  <div className="pdp-bar-track">
                    <div className="pdp-bar-fill" style={{ width: '18%' }} />
                  </div>
                  <span className="pdp-bar-count">22</span>
                </div>
                <div className="pdp-rating-bar-row">
                  <span className="pdp-bar-label">3 Star</span>
                  <div className="pdp-bar-track">
                    <div className="pdp-bar-fill" style={{ width: '5%' }} />
                  </div>
                  <span className="pdp-bar-count">6</span>
                </div>
                <div className="pdp-rating-bar-row">
                  <span className="pdp-bar-label">2 Star</span>
                  <div className="pdp-bar-track">
                    <div className="pdp-bar-fill" style={{ width: '2%' }} />
                  </div>
                  <span className="pdp-bar-count">3</span>
                </div>
                <div className="pdp-rating-bar-row">
                  <span className="pdp-bar-label">1 Star</span>
                  <div className="pdp-bar-track">
                    <div className="pdp-bar-fill" style={{ width: '1%' }} />
                  </div>
                  <span className="pdp-bar-count">1</span>
                </div>
              </div>

              {/* Write Review CTA Card */}
              <div className="pdp-write-review-cta">
                <h4>Have you used this paint?</h4>
                <p>Share your experience and photos with other homeowners & painters.</p>
                <button 
                  type="button" 
                  onClick={() => setShowWriteReview(true)}
                  className="pdp-write-review-btn"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Popup Modal Dialog for Write Review */}
            {showWriteReview && (
              <div 
                className="pdp-modal-backdrop" 
                onClick={(e) => {
                  if (e.target.classList.contains('pdp-modal-backdrop')) {
                    setShowWriteReview(false);
                  }
                }}
              >
                <div className="pdp-modal-dialog" role="dialog" aria-modal="true">
                  <div className="pdp-modal-header">
                    <div>
                      <h3 className="pdp-modal-title">Write a Review</h3>
                      <p className="pdp-modal-subtitle">Share your experience with {product?.name || 'this product'}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setShowWriteReview(false)} 
                      className="pdp-modal-close-btn"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="pdp-modal-form-body">
                    <div className="pdp-form-rating-select">
                      <span className="pdp-rating-picker-label">Overall Rating:</span>
                      <div className="pdp-star-picker">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="pdp-star-btn"
                          >
                            <Star 
                              size={26} 
                              fill={star <= newRating ? '#0D47A1' : 'none'} 
                              color={star <= newRating ? '#0D47A1' : '#CBD5E1'} 
                            />
                          </button>
                        ))}
                      </div>
                      <span className="pdp-rating-tier-hint">
                        {newRating === 5 && 'Outstanding Quality!'}
                        {newRating === 4 && 'Very Good'}
                        {newRating === 3 && 'Average'}
                        {newRating === 2 && 'Below Expectation'}
                        {newRating === 1 && 'Poor'}
                      </span>
                    </div>

                    <div className="pdp-form-fields-grid">
                      <div className="pdp-input-group">
                        <label className="pdp-form-label">Full Name *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Ramesh Sundaram" 
                          required 
                          value={newReviewerName}
                          onChange={(e) => setNewReviewerName(e.target.value)}
                          className="pdp-input-field"
                        />
                      </div>
                      <div className="pdp-input-group">
                        <label className="pdp-form-label">City / Town *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Chidambaram" 
                          required 
                          value={newReviewCity}
                          onChange={(e) => setNewReviewCity(e.target.value)}
                          className="pdp-input-field"
                        />
                      </div>
                    </div>

                    <div className="pdp-input-group" style={{ marginBottom: '16px' }}>
                      <label className="pdp-form-label">Review Title (Headline)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. premium chanin / Outstanding Coverage" 
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        className="pdp-input-field"
                      />
                    </div>

                    <div className="pdp-input-group" style={{ marginBottom: '16px' }}>
                      <label className="pdp-form-label">Your Review & Painting Experience *</label>
                      <textarea 
                        rows={3} 
                        placeholder="Tell other buyers about coverage, smooth wall sheen, ease of cleaning, or application with rollers..." 
                        required 
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="pdp-textarea-field"
                      />
                    </div>

                    <div className="pdp-input-group" style={{ marginBottom: '20px' }}>
                      <label className="pdp-form-label">Attach Photo (Optional)</label>
                      <label className="pdp-custom-file-upload-box">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => setNewReviewImage(ev.target.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                        <span className="pdp-file-btn-themed">
                          <Upload size={14} />
                          Browse File
                        </span>
                        <span className={`pdp-file-chosen-text ${newReviewImage ? 'has-file' : ''}`}>
                          {newReviewImage ? 'Photo attached' : 'No photo selected (JPG, PNG)'}
                        </span>
                      </label>

                      {newReviewImage && (
                        <div className="pdp-review-attached-preview-wrap">
                          <img src={newReviewImage} alt="Review attachment preview" className="pdp-review-attached-preview-img" />
                          <button 
                            type="button" 
                            onClick={() => setNewReviewImage(null)} 
                            className="pdp-review-remove-photo-btn"
                            title="Remove photo"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pdp-modal-actions-row">
                      <button 
                        type="button" 
                        onClick={() => setShowWriteReview(false)} 
                        className="btn btn-outline"
                        style={{ padding: '10px 20px' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="pdp-modal-submit-btn"
                      >
                        Submit Verified Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {reviewSubmitted && (
              <div className="pdp-review-success-alert">
                <Check size={18} />
                <span>Thank you! Your review has been submitted and verified.</span>
              </div>
            )}

        {/* What Customers Are Saying - Rendered as 4-card horizontal carousel */}
        {userReviews.length > 0 && (
          <div className="pdp-ref-reviews-section">
            <div className="pdp-ref-reviews-header-row">
              <h3 className="pdp-ref-reviews-heading">What Customers Are Saying</h3>
            </div>

            <div 
              className="pdp-ref-reviews-list" 
              id="pdpReviewsTrack"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth || 1;
                const activeIndex = Math.min(
                  userReviews.length - 1, 
                  Math.max(0, Math.round(scrollLeft / 300))
                );
                setActiveReviewSlide(activeIndex);
              }}
            >
              {userReviews.map((rev) => (
                <div key={rev.id} className="pdp-ref-comment-card">
                  <div className="pdp-ref-comment-header">
                    <div className="pdp-ref-user-badge">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="pdp-ref-user-fullname">{rev.name}</span>
                  </div>

                  <div className="pdp-ref-rating-dateline">
                    <span className="pdp-ref-score-tag">
                      {Number(rev.rating).toFixed(1)} ★
                    </span>
                    <span className="pdp-ref-dot-divider">•</span>
                    <span className="pdp-ref-post-date">Posted on {rev.date}</span>
                  </div>

                  <h4 className="pdp-ref-comment-title">{rev.title}</h4>
                  <p className="pdp-ref-comment-desc">{rev.comment}</p>

                  {rev.image && (
                    <div className="pdp-ref-thumb-wrapper">
                      <img src={rev.image} alt="User Review Attachment" className="pdp-ref-review-attached-img" />
                    </div>
                  )}

                  <div className="pdp-ref-helpful-row">
                    <button 
                      type="button" 
                      className="pdp-ref-helpful-btn"
                      onClick={() => {
                        setUserReviews(userReviews.map(r => r.id === rev.id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r));
                      }}
                    >
                      <ThumbsUp size={14} />
                      <span>Helpful ({rev.helpfulCount || 0})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Dots & Pill Indicator */}
            {userReviews.length > 1 && (
              <div className="pdp-carousel-dots-wrap">
                {Array.from({ length: Math.min(6, Math.max(userReviews.length, 4)) }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`pdp-carousel-dot ${activeReviewSlide === dotIdx ? 'active' : ''}`}
                    aria-label={`Slide ${dotIdx + 1}`}
                    onClick={() => {
                      const container = document.getElementById('pdpReviewsTrack');
                      if (container) {
                        container.scrollTo({ left: dotIdx * 300, behavior: 'smooth' });
                      }
                      setActiveReviewSlide(dotIdx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}



        {/* 5. SIMILAR PRODUCTS (ALREADY EXISTING SYSTEM) */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <div className="pdp-related-header">
              <h2 className="pdp-related-heading">
                Similar Paints in {product?.categoryName || 'Wall Paints'}
              </h2>
            </div>

            <div className="products-4col-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

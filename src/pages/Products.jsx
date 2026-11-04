import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  X,
  Search
} from 'lucide-react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import heroBannerImg from '../assets/paint-collection-hero.jpg';
import '../styles/Products.css';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Sort by: Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
];

// Filter constants matching reference design exactly
const FILTER_CATEGORIES = [
  { id: 'interior-paints', label: 'Interior Paints', count: 18 },
  { id: 'exterior-paints', label: 'Exterior Paints', count: 10 },
  { id: 'waterproofing', label: 'Waterproofing', count: 2 },
  { id: 'wood-finish', label: 'Wood Finish', count: 5 },
  { id: 'primers', label: 'Primers', count: 3 },
];

const FILTER_BRANDS = [
  { id: 'Asian Paints', label: 'Asian Paints', count: 13 },
  { id: 'Berger', label: 'Berger', count: 8 },
  { id: 'Nerolac', label: 'Nerolac', count: 7 },
  { id: 'Indigo', label: 'Indigo', count: 4 },
  { id: 'Dulux', label: 'Dulux', count: 5 },
  { id: 'Pidilite', label: 'Pidilite', count: 1 },
];

const FILTER_FINISHES = [
  { id: 'Matte', label: 'Matte', count: 15 },
  { id: 'Satin', label: 'Satin', count: 10 },
  { id: 'Gloss', label: 'Gloss', count: 7 },
  { id: 'Semi Gloss', label: 'Semi Gloss', count: 6 },
];

const FILTER_COLORS = [
  { id: 'Whites & Neutrals', label: 'Whites & Neutrals', color: '#F9FAFB', border: '#D1D5DB', count: 12 },
  { id: 'Yellows & Oranges', label: 'Yellows & Oranges', color: '#F59E0B', count: 6 },
  { id: 'Reds & Pinks', label: 'Reds & Pinks', color: '#EF4444', count: 5 },
  { id: 'Blues', label: 'Blues', color: '#3B82F6', count: 6 },
  { id: 'Greens', label: 'Greens', color: '#10B981', count: 5 },
  { id: 'Purples', label: 'Purples', color: '#8B5CF6', count: 4 },
  { id: 'Greys', label: 'Greys', color: '#6B7280', count: 4 },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Multi-select filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Filter sidebar toggle state: false = 4 cards per row, true = 3 cards per row + sidebar
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Accordion collapsed state inside sidebar
  const [accordionState, setAccordionState] = useState({
    categories: true,
    brands: true,
    finishes: true,
    colors: true,
  });

  // Controls state
  const [sortBy, setSortBy] = useState('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sortRef = useRef(null);

  // Close sort dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Products from service
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL params if present (with category slug mapping)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== 'all') {
      const SLUG_MAP = {
        'interior-wall-paints': 'interior-paints',
        'exterior-wall-paints': 'exterior-paints',
        'wood-metal-paints': 'wood-finish',
        'primers-undercoats': 'primers',
        'waterproofing-products': 'waterproofing',
        'waterproofing': 'waterproofing',
        'interior-paints': 'interior-paints',
        'exterior-paints': 'exterior-paints',
        'exterior': 'exterior-paints',
        'interior': 'interior-paints',
        'wood-finish': 'wood-finish',
        'primers': 'primers',
      };
      const mappedCat = SLUG_MAP[cat] || cat;
      setSelectedCategories([mappedCat]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // Fetch products based on multi-select filters and sort
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await productService.getProducts({
        categories: selectedCategories,
        brands: selectedBrands,
        finishes: selectedFinishes,
        colorFamilies: selectedColors,
        sort: sortBy,
        search: searchParams.get('search') || '',
      });
      setAllProducts(data);
      setCurrentPage(1);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategories, selectedBrands, selectedFinishes, selectedColors, sortBy, searchParams]);

  // Accordion toggle inside sidebar
  const toggleAccordion = (key) => {
    setAccordionState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter toggles
  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleFinish = (id) => {
    setSelectedFinishes((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // Clear All Filters
  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedFinishes([]);
    setSelectedColors([]);
    setSortBy('popular');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Total active filters count
  const totalActiveFilters = 
    selectedCategories.length + 
    selectedBrands.length + 
    selectedFinishes.length + 
    selectedColors.length;

  // Pagination calculations: exactly 2 rows per page (4 cols = 8 cards, 3 cols with sidebar = 6 cards)
  const productsPerPage = isFilterOpen ? 6 : 8;
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * productsPerPage;
  const displayedProducts = allProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="products-page-container">
      {/* 1. TOP HERO BANNER: Full-Width Full-Cover Banner */}
      <section className="products-hero-banner-full">
        <div className="products-hero-bg-wrapper">
          <img
            src={heroBannerImg}
            alt="Sri Thillai Traders Luxury Paint Collection"
            className="products-hero-full-img"
          />
          <div className="products-hero-gradient-overlay" />

          {/* Dynamic Splashing Paint Droplets & Glow Animation */}
          <div className="paint-splash-animation-overlay">
            <span className="paint-drop drop-1" />
            <span className="paint-drop drop-2" />
            <span className="paint-drop drop-3" />
            <span className="paint-drop drop-4" />
            <span className="paint-drop drop-5" />
            <span className="paint-drop drop-6" />
            <span className="paint-drop drop-7" />
            <span className="paint-burst-ring" />
          </div>
        </div>
        <div className="container products-hero-inner-container">
          <div className="products-hero-content">
            <h1 className="products-hero-title">
              Find your <span className="paint-highlight-text">paint.</span><br />
              One wall at a time.
            </h1>
            <p className="products-hero-subtitle">
              Explore our premium architectural coatings, luxury emulsions, and velvet enamels crafted to transform your living spaces.
            </p>
          </div>
        </div>
      </section>

      <div className="container" id="products-grid-anchor">
        {/* 2. CONTROLS BAR: FILTER TOGGLE + ACTIVE TAGS (LEFT) & SORT + VIEW SWITCHER (RIGHT) */}
        <div className="products-grid-controls-row">
          <div className="controls-left-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Filter Toggle Button: Click to open/close sidebar, changing between 4 cards and 3 cards */}
            <button
              type="button"
              className={`btn-filter-trigger ${isFilterOpen ? 'is-active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-expanded={isFilterOpen}
            >
              <SlidersHorizontal size={17} />
              <span>{isFilterOpen ? 'Hide Filters' : 'Filter Products'}</span>
              {totalActiveFilters > 0 && (
                <span className="filter-trigger-badge">{totalActiveFilters}</span>
              )}
            </button>

            {/* Active Search Query Tag */}
            {searchParams.get('search') && (
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: '#EFF6FF', 
                  border: '1px solid #BFDBFE', 
                  color: '#1D4ED8', 
                  padding: '6px 14px', 
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 600
                }}
              >
                <Search size={14} color="#1D4ED8" />
                <span>Search: "{searchParams.get('search')}"</span>
                <button
                  type="button"
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#1D4ED8'
                  }}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="controls-right-group">
            {/* Custom Sort Dropdown */}
            <div className="sort-select-wrapper" ref={sortRef}>
              <button
                type="button"
                className={`custom-sort-trigger ${isSortOpen ? 'is-open' : ''}`}
                onClick={() => setIsSortOpen(!isSortOpen)}
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <span className="custom-sort-label">
                  {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || 'Sort by: Popularity'}
                </span>
                <ChevronDown 
                  size={15} 
                  className={`custom-sort-arrow ${isSortOpen ? 'rotate' : ''}`} 
                />
              </button>

              {isSortOpen && (
                <div className="custom-sort-menu" role="listbox">
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = opt.value === sortBy;
                    return (
                      <div
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        className={`custom-sort-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsSortOpen(false);
                        }}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check size={14} className="custom-sort-check" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. MAIN LAYOUT: SIDEBAR (WHEN OPEN) + PRODUCT GRID */}
        <div className={`products-layout-container ${isFilterOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          {/* Mobile Overlay Backdrop when Filter Sidebar is Open */}
          {isFilterOpen && (
            <div 
              className="filter-mobile-overlay" 
              onClick={() => setIsFilterOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Left Column: Filter Sidebar Card (Appears when isFilterOpen is true) */}
          {isFilterOpen && (
            <aside className="filter-sidebar-card">
              <div className="filter-sidebar-header">
                <div className="filter-sidebar-title-group">
                  <SlidersHorizontal size={18} className="filter-header-icon" />
                  <h2 className="filter-sidebar-title">Filter Products</h2>
                </div>
                <button
                  type="button"
                  className="btn-sidebar-close"
                  onClick={() => setIsFilterOpen(false)}
                  title="Hide filters"
                  aria-label="Hide filters"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Accordion 1: Categories */}
              <div className="filter-accordion-section">
                <button
                  type="button"
                  className="filter-accordion-header"
                  onClick={() => toggleAccordion('categories')}
                >
                  <span>Categories</span>
                  {accordionState.categories ? (
                    <ChevronUp size={16} className="filter-accordion-arrow" />
                  ) : (
                    <ChevronDown size={16} className="filter-accordion-arrow" />
                  )}
                </button>

                {accordionState.categories && (
                  <div className="filter-options-list">
                    {FILTER_CATEGORIES.map((cat) => {
                      const isChecked = selectedCategories.includes(cat.id);
                      return (
                        <label
                          key={cat.id}
                          className="filter-checkbox-label"
                          onClick={() => toggleCategory(cat.id)}
                        >
                          <div className="filter-checkbox-left">
                            <span className={`filter-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </span>
                            <span>{cat.label}</span>
                          </div>
                          <span className="filter-option-count">({cat.count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 2: Brand */}
              <div className="filter-accordion-section">
                <button
                  type="button"
                  className="filter-accordion-header"
                  onClick={() => toggleAccordion('brands')}
                >
                  <span>Brand</span>
                  {accordionState.brands ? (
                    <ChevronUp size={16} className="filter-accordion-arrow" />
                  ) : (
                    <ChevronDown size={16} className="filter-accordion-arrow" />
                  )}
                </button>

                {accordionState.brands && (
                  <div className="filter-options-list">
                    {FILTER_BRANDS.map((brand) => {
                      const isChecked = selectedBrands.includes(brand.id);
                      return (
                        <label
                          key={brand.id}
                          className="filter-checkbox-label"
                          onClick={() => toggleBrand(brand.id)}
                        >
                          <div className="filter-checkbox-left">
                            <span className={`filter-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </span>
                            <span>{brand.label}</span>
                          </div>
                          <span className="filter-option-count">({brand.count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 3: Finish Type */}
              <div className="filter-accordion-section">
                <button
                  type="button"
                  className="filter-accordion-header"
                  onClick={() => toggleAccordion('finishes')}
                >
                  <span>Finish Type</span>
                  {accordionState.finishes ? (
                    <ChevronUp size={16} className="filter-accordion-arrow" />
                  ) : (
                    <ChevronDown size={16} className="filter-accordion-arrow" />
                  )}
                </button>

                {accordionState.finishes && (
                  <div className="filter-options-list">
                    {FILTER_FINISHES.map((finish) => {
                      const isChecked = selectedFinishes.includes(finish.id);
                      return (
                        <label
                          key={finish.id}
                          className="filter-checkbox-label"
                          onClick={() => toggleFinish(finish.id)}
                        >
                          <div className="filter-checkbox-left">
                            <span className={`filter-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </span>
                            <span>{finish.label}</span>
                          </div>
                          <span className="filter-option-count">({finish.count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 4: Colour Family */}
              <div className="filter-accordion-section">
                <button
                  type="button"
                  className="filter-accordion-header"
                  onClick={() => toggleAccordion('colors')}
                >
                  <span>Colour Family</span>
                  {accordionState.colors ? (
                    <ChevronUp size={16} className="filter-accordion-arrow" />
                  ) : (
                    <ChevronDown size={16} className="filter-accordion-arrow" />
                  )}
                </button>

                {accordionState.colors && (
                  <div className="filter-options-list">
                    {FILTER_COLORS.map((col) => {
                      const isChecked = selectedColors.includes(col.id);
                      return (
                        <label
                          key={col.id}
                          className="filter-checkbox-label"
                          onClick={() => toggleColor(col.id)}
                        >
                          <div className="filter-checkbox-left">
                            <span
                              className="color-swatch-circle"
                              style={{
                                backgroundColor: col.color,
                                border: col.border ? `1px solid ${col.border}` : 'none',
                                outline: isChecked ? '2px solid #B58744' : 'none',
                                outlineOffset: '2px',
                              }}
                            />
                            <span style={{ fontWeight: isChecked ? 700 : 400 }}>
                              {col.label}
                            </span>
                          </div>
                          <span className="filter-option-count">({col.count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Clear All Filters Button */}
              <button
                type="button"
                onClick={handleClearAll}
                className="btn-clear-filters"
              >
                Clear All
              </button>
            </aside>
          )}

          {/* Right Column (or Full Width): Product Cards Grid Area */}
          <main className="products-main-content">
            {loading ? (
              <Loader message="Loading genuine paint collection..." />
            ) : totalProducts === 0 ? (
              <div className="no-products-card">
                <h3 className="no-products-title">No paint products found</h3>
                <p className="no-products-desc">
                  Try adjusting or clearing your filter criteria to see all products.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="btn btn-primary"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* If viewMode is grid: 3 cards when filter is open, 4 cards when filter is closed! */
              <div className={isFilterOpen ? 'products-3col-grid' : 'products-4col-grid'}>
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

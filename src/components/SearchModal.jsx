import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import '../styles/SearchModal.css';

const POPULAR_SEARCHES = [
  'Royal Luxury',
  'Interior Paints',
  'Exterior Paints',
  'Waterproofing',
  'Asian Paints',
  'Berger Silk',
  'Distemper',
  'Primer',
];

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-focus input when modal opens & handle ESC key & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Focus input smoothly
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    // Prevent body background scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Live search filtering
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions({ products: [], categories: [] });
      return;
    }

    const term = searchTerm.toLowerCase();

    // Matching products
    const matchedProducts = PRODUCTS.filter((p) => {
      return (
        p.name?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term) ||
        p.categoryName?.toLowerCase().includes(term) ||
        p.subtitle?.toLowerCase().includes(term) ||
        p.finish?.toLowerCase().includes(term)
      );
    }).slice(0, 6);

    // Matching categories
    const matchedCategories = CATEGORIES.filter((c) =>
      c.name?.toLowerCase().includes(term)
    ).slice(0, 4);

    setSuggestions({
      products: matchedProducts,
      categories: matchedCategories,
    });
  }, [searchTerm]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const handleSelectCategory = (categorySlug) => {
    navigate(`/products?category=${categorySlug}`);
    onClose();
  };

  const handleChipClick = (query) => {
    setSearchTerm(query);
  };

  return (
    <div
      className="search-modal-backdrop"
      onClick={(e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div className="search-modal-container" ref={containerRef}>
        {/* Search Input Bar */}
        <form className="search-modal-header" onSubmit={handleSubmit}>
          <div className="search-modal-search-icon">
            <Search size={20} />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search paints, colors, brands, categories..."
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-modal-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search text"
            >
              <X size={15} />
            </button>
          )}
          <button
            type="button"
            className="search-modal-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            <span>Close</span>
            <span className="search-modal-esc-key">ESC</span>
          </button>
        </form>

        {/* Search Body Content - Only displayed when user types search query */}
        {searchTerm.trim() && (
          <div className="search-modal-body">
            {/* Category pills if any matched */}
            {suggestions.categories.length > 0 && (
              <div>
                <div className="search-modal-section-title">
                  <Tag size={13} />
                  <span>Matching Categories</span>
                </div>
                <div className="search-modal-chips-wrap">
                  {suggestions.categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className="search-modal-chip"
                      onClick={() => handleSelectCategory(cat.slug)}
                    >
                      <Tag size={12} color="#0284C7" />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product items */}
            {suggestions.products.length > 0 ? (
              <div>
                <div className="search-modal-section-title">
                  <Search size={13} />
                  <span>Matching Products</span>
                </div>
                <div className="search-modal-products-list">
                  {suggestions.products.map((item) => (
                    <div
                      key={item.id}
                      className="search-modal-product-item"
                      onClick={() => handleSelectProduct(item.id)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="search-modal-product-img"
                      />
                      <div className="search-modal-product-info">
                        <p className="search-modal-product-name">{item.name}</p>
                        <p className="search-modal-product-meta">
                          <span className="search-modal-product-brand">{item.brand}</span>
                          <span>•</span>
                          <span>{item.categoryName}</span>
                          {item.packSize && (
                            <>
                              <span>•</span>
                              <span>{item.packSize}</span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="search-modal-product-price">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </div>
                      <ArrowRight size={16} className="search-modal-product-arrow" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="search-modal-empty">
                <div className="search-modal-empty-icon">
                  <Search size={22} />
                </div>
                <h4 className="search-modal-empty-title">
                  No results found for "{searchTerm}"
                </h4>
                <p className="search-modal-empty-desc">
                  Try checking your spelling or search for popular terms.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Search Footer */}
        {searchTerm.trim() && (
          <div className="search-modal-footer">
            <span className="search-modal-count-text">
              {suggestions.products.length} product{suggestions.products.length === 1 ? '' : 's'} shown
            </span>
            <button
              type="button"
              className="search-modal-view-all-btn"
              onClick={handleSubmit}
            >
              <span>View all results</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

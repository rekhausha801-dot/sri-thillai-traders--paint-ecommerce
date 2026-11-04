import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';

const SearchBar = ({ onClose, placeholder = 'Search paints, primers, waterproofers, tools...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase();

    // Matching products
    const matchedProducts = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.categoryName.toLowerCase().includes(term)
    ).slice(0, 5);

    // Matching categories
    const matchedCategories = CATEGORIES.filter((c) =>
      c.name.toLowerCase().includes(term)
    ).slice(0, 3);

    setSuggestions({
      products: matchedProducts,
      categories: matchedCategories,
    });
  }, [searchTerm]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsFocused(false);
      if (onClose) onClose();
    }
  };

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
    setIsFocused(false);
    if (onClose) onClose();
  };

  const handleSelectCategory = (categorySlug) => {
    navigate(`/products?category=${categorySlug}`);
    setIsFocused(false);
    if (onClose) onClose();
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '540px',
      }}
    >
      <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '11px 44px 11px 42px',
            borderRadius: '9999px',
            border: isFocused ? '1.5px solid #C89953' : '1.5px solid var(--border-light)',
            backgroundColor: '#FFFFFF',
            fontSize: '0.92rem',
            fontFamily: 'inherit',
            color: '#1C2025',
            outline: 'none',
            boxShadow: isFocused ? '0 0 0 3px rgba(200, 153, 83, 0.15)' : 'none',
            transition: 'all 0.2s ease',
          }}
        />
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8E98A4',
            pointerEvents: 'none',
          }}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSuggestions([]);
            }}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#8E98A4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}
      </form>

      {/* Live Suggestions Dropdown */}
      {isFocused && (suggestions.products?.length > 0 || suggestions.categories?.length > 0) && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            boxShadow: '0 12px 30px rgba(35, 25, 10, 0.1)',
            padding: '10px 0',
            zIndex: 1100,
            maxHeight: '380px',
            overflowY: 'auto',
          }}
        >
          {suggestions.categories?.length > 0 && (
            <div style={{ padding: '6px 16px', borderBottom: '1px solid var(--border-light)' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#C89953',
                  letterSpacing: '1px',
                  marginBottom: '6px',
                }}
              >
                Categories
              </div>
              {suggestions.categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: '#1C2025',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F3EA')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Tag size={14} color="#C89953" />
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          )}

          {suggestions.products?.length > 0 && (
            <div style={{ padding: '6px 16px' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#C89953',
                  letterSpacing: '1px',
                  marginBottom: '6px',
                  marginTop: '4px',
                }}
              >
                Products
              </div>
              {suggestions.products.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F3EA')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#1C2025',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#58616B' }}>
                      {item.brand} • <strong style={{ color: '#1C2025' }}>₹{item.price}</strong>
                    </p>
                  </div>
                  <ArrowRight size={14} color="#8E98A4" />
                </div>
              ))}
            </div>
          )}

          <div
            onClick={handleSearchSubmit}
            style={{
              padding: '10px 16px',
              borderTop: '1px solid var(--border-light)',
              marginTop: '4px',
              cursor: 'pointer',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#C89953',
              textAlign: 'center',
              background: 'var(--bg-secondary)',
            }}
          >
            View all results for "{searchTerm}" →
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

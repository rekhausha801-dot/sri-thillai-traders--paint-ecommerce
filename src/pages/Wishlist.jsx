import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', padding: '80px 20px', minHeight: '75vh' }}>
        <div
          className="container"
          style={{
            maxWidth: '560px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '50px 30px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'var(--gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: 'var(--gold-primary)',
            }}
          >
            <Heart size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.95rem' }}>
            Save luxury paint shades, waterproofing materials, and tools you love to review them later.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Explore Paints & Coatings <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '40px 0 80px 0', minHeight: '75vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '4px' }}>
              My Saved Paints
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved in your wishlist
            </p>
          </div>
          <button
            type="button"
            onClick={clearWishlist}
            style={{ 
              fontSize: '0.85rem', 
              color: '#D32F2F', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              background: '#FEE2E2',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={15} /> Clear All
          </button>
        </div>

        {/* Wishlist Grid with Exact Same ProductCard */}
        <div className="products-4col-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

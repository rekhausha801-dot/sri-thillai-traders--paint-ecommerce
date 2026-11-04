import React from 'react';
import { Link } from 'react-router-dom';
import { Paintbrush, ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        padding: '100px 20px',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-light)',
          padding: '60px 36px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--gold-light)',
            color: 'var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
          }}
        >
          <Paintbrush size={38} />
        </div>

        <h1
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--gold-primary)',
            marginBottom: '12px',
          }}
        >
          404
        </h1>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>
          This Wall Hasn't Been Painted Yet!
        </h2>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.96rem',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}
        >
          The page or product link you clicked does not exist or may have been relocated in our store catalog.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Return to Homepage
          </Link>
          <Link to="/products" className="btn btn-outline">
            <Search size={18} /> Browse Paints Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

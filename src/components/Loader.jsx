import React from 'react';

const Loader = ({ message = 'Loading paints & finishes...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      gap: '16px',
      minHeight: '260px'
    }}>
      <div style={{
        width: '46px',
        height: '46px',
        border: '3.5px solid #F1E8D9',
        borderTop: '3.5px solid #C89953',
        borderRadius: '50%',
        animation: 'spinLoader 0.85s linear infinite'
      }} />
      <p style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#58616B'
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spinLoader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  Tag, 
  FileText, 
  Lock, 
  ShieldCheck 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    totalItems, 
    subtotal, 
    estimatedTax, 
    shippingFee, 
    grandTotal, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'THILLAI10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountApplied(discount);
      setCouponMessage({ success: true, text: 'Coupon THILLAI10 applied! You saved 10%.' });
    } else if (couponCode.trim().toUpperCase() === 'FIRSTPAINT') {
      const discount = 250;
      setDiscountApplied(discount);
      setCouponMessage({ success: true, text: 'Coupon FIRSTPAINT applied! Flat ₹250 saved.' });
    } else {
      setDiscountApplied(0);
      setCouponMessage({ success: false, text: 'Invalid coupon code. Try THILLAI10' });
    }
  };

  const finalTotal = Math.max(0, grandTotal - discountApplied);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-main-container">
          <div
            style={{
              maxWidth: '560px',
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '60px 30px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              margin: '40px auto',
            }}
          >
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                color: '#2563EB',
              }}
            >
              <ShoppingCart size={34} />
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '8px', color: '#0F172A' }}>
              Your Paint Cart is Empty
            </h2>
            <p style={{ color: '#64748B', marginBottom: '28px', fontSize: '0.96rem' }}>
              Looks like you haven't added any interior paints, exterior coats, or primers yet.
            </p>
            <Link to="/products" className="summary-checkout-btn" style={{ maxWidth: '300px', margin: '0 auto', textDecoration: 'none' }}>
              <span>Browse Paints Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-main-container">
        {/* Header Bar matching reference */}
        <div className="cart-page-header">
          <div className="cart-title-row">
            <div className="cart-title-icon-box">
              <ShoppingCart size={26} strokeWidth={2.4} />
            </div>
            <div>
              <h1 className="cart-page-title">Shopping Cart</h1>
              <p className="cart-page-subtitle">
                Review your paint buckets, accessories and pack sizes ({totalItems} items)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="cart-clear-all-btn"
            title="Clear all cart items"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        </div>

        {/* 2-Column Exact Layout: Items list on Left, Order Summary on Right */}
        <div className="cart-layout-grid-exact">
          {/* Left: Cart Items */}
          <div className="cart-items-column">
            {cartItems.map((item) => {
              const brandText = item.product.brandBadge || item.product.brand || 'ASIAN PAINTS';
              const packText = item.packSize ? `Pack: ${item.packSize}` : 'Pack: 4 L';
              const lineTotal = item.price * item.quantity;

              return (
                <div key={item.cartItemId} className="cart-item-card-exact">
                  {/* Product Visual Container */}
                  <div className="cart-item-img-box">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-item-img"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="cart-item-info-col">
                    <span className="cart-item-brand-pill">
                      {brandText}
                    </span>

                    <Link to={`/product/${item.product.id}`} className="cart-item-title-link">
                      <h3 className="cart-item-title">{item.product.name}</h3>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', margin: '4px 0 8px 0' }}>
                      <span className="cart-item-pack-pill">
                        {packText}
                      </span>
                      {(item.selectedColorName || item.product?.selectedColorName) && (
                        <span 
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '14px',
                            padding: '3px 10px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: '#334155'
                          }}
                        >
                          <span 
                            style={{
                              display: 'inline-block',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: item.selectedColorHex || item.product?.selectedColorHex || '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                          />
                          <span>{item.selectedColorName || item.product?.selectedColorName}</span>
                        </span>
                      )}
                      {(item.selectedFinish || item.product?.selectedFinish) && (
                        <span
                          style={{
                            background: '#F1F5F9',
                            color: '#475569',
                            borderRadius: '14px',
                            padding: '3px 10px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textTransform: 'capitalize'
                          }}
                        >
                          {item.selectedFinish || item.product?.selectedFinish}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector with round plus/minus */}
                    <div className="cart-item-qty-stepper">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="qty-step-btn"
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="qty-step-value">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="qty-step-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Right side: Delete bin icon + Total and Unit Price */}
                  <div className="cart-item-right-col">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="cart-item-trash-btn"
                      title="Remove item"
                    >
                      <Trash2 size={17} />
                    </button>

                    <div className="cart-item-price-block">
                      <div className="cart-item-total-price">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="cart-item-unit-price">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Order Summary Card */}
          <aside className="order-summary-card-exact">
            <div className="order-summary-title-row">
              <FileText size={22} color="#1D4ED8" />
              <h2 className="order-summary-title">Order Summary</h2>
            </div>

            <div className="order-summary-rows">
              <div className="summary-data-row">
                <span className="summary-row-label">Items Subtotal:</span>
                <span className="summary-row-val">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-data-row">
                <span className="summary-row-label">Estimated GST (18%):</span>
                <span className="summary-row-val">₹{estimatedTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-data-row">
                <span className="summary-row-label">Delivery Handling:</span>
                <span className={shippingFee === 0 ? 'summary-val-free' : 'summary-row-val'}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>

              {discountApplied > 0 && (
                <div className="summary-data-row" style={{ color: '#16a34a', fontWeight: 700 }}>
                  <span>Coupon Discount:</span>
                  <span>-₹{discountApplied.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Promo Code Input Box */}
            <form onSubmit={handleApplyCoupon} className="summary-coupon-form">
              <div className="summary-coupon-input-wrap">
                <Tag size={16} className="coupon-tag-icon" />
                <input
                  type="text"
                  placeholder="COUPON (E.G. THILLAI10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="summary-coupon-input"
                />
              </div>
              <button type="submit" className="summary-coupon-btn">
                Apply
              </button>
            </form>

            {couponMessage && (
              <p className={`coupon-status-msg ${couponMessage.success ? 'success' : 'error'}`}>
                {couponMessage.text}
              </p>
            )}

            {/* Total Payable Light-Blue Box */}
            <div className="summary-payable-box">
              <span className="payable-label">Total Payable:</span>
              <span className="payable-amount">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="summary-checkout-btn"
            >
              <Lock size={18} />
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Trust Footer */}
            <div className="summary-trust-badge">
              <ShieldCheck size={18} />
              <span>100% Genuine Paints & Safe Payments</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  User, 
  Phone, 
  ShoppingBag, 
  Lock, 
  ChevronDown,
  Building,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Banknote,
  QrCode,
  CreditCard,
  Globe,
  Tag,
  Calendar,
  Package,
  Plus,
  Check,
  Edit2,
  Eye,
  FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Checkout.css';

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    fullName: 'Ramesh Kumar',
    phone: '9876543210',
    street: '12/4 East Car Street, Near Natarajar Temple',
    city: 'Chidambaram',
    state: 'Tamil Nadu',
    pincode: '608001',
    isDefault: true
  }
];

const Checkout = () => {
  const { cartItems: globalCartItems, subtotal: globalSubtotal, estimatedTax: globalEstimatedTax, shippingFee: globalShippingFee, grandTotal: globalGrandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Buy Now destination item passed from PDP, or normal Cart items
  const buyNowItem = location.state?.buyNowItem || null;
  const isDirectBuyNow = !!buyNowItem;

  // Active items for this checkout session
  const activeItems = useMemo(() => {
    if (buyNowItem) return [buyNowItem];
    return globalCartItems;
  }, [buyNowItem, globalCartItems]);

  // Price calculations
  const itemsSubtotal = useMemo(() => {
    return activeItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [activeItems]);

  // Coupon support
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((itemsSubtotal * appliedCoupon.value) / 100);
    }
    return appliedCoupon.value;
  }, [appliedCoupon, itemsSubtotal]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'THILLAI10' || code === 'WELCOME10') {
      setAppliedCoupon({ code, type: 'percent', value: 10, label: '10% Flat Discount' });
    } else if (code === 'PAINT500') {
      setAppliedCoupon({ code, type: 'flat', value: 500, label: '₹500 Flat Discount' });
    } else {
      setCouponError('Invalid coupon code. Try THILLAI10');
    }
  };

  const deliveryCharge = useMemo(() => {
    if (itemsSubtotal > 3000) return 0;
    return 150;
  }, [itemsSubtotal]);

  const gstAmount = useMemo(() => {
    const taxable = Math.max(0, itemsSubtotal - couponDiscount);
    return Math.round(taxable * 0.18);
  }, [itemsSubtotal, couponDiscount]);

  const finalOrderTotal = useMemo(() => {
    return Math.max(0, itemsSubtotal - couponDiscount + gstAmount + deliveryCharge);
  }, [itemsSubtotal, couponDiscount, gstAmount, deliveryCharge]);

  // Saved addresses list with initial sample address
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('panit_saved_addresses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return DEFAULT_ADDRESSES;
  });

  // Selected address ID
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    return savedAddresses[0]?.id || 'addr-1';
  });

  // Address modal drawer state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Address Form State
  const [addressForm, setAddressForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: 'Chidambaram',
    state: 'Tamil Nadu',
    pincode: '608001',
  });

  // Payment method: upi | card | netbanking | cod
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  // 3-Step Wizard: 1: Cart/Item Review, 2: Address Selection, 3: Payment & Summary
  const [currentStep, setCurrentStep] = useState(1);

  // Open modal to add new address
  const handleAddNewAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      fullName: user?.name || '',
      phone: user?.phone || '',
      street: '',
      city: 'Chidambaram',
      state: 'Tamil Nadu',
      pincode: '608001',
    });
    setIsAddressModalOpen(true);
  };

  // Open modal to edit existing address
  const handleEditAddress = (addr, e) => {
    e.stopPropagation();
    setEditingAddressId(addr.id);
    setAddressForm({
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    });
    setIsAddressModalOpen(true);
  };

  // Save address from modal
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.phone || !addressForm.street || !addressForm.pincode) {
      alert('Please fill out all required fields.');
      return;
    }

    let updatedList;
    if (editingAddressId) {
      updatedList = savedAddresses.map(addr => 
        addr.id === editingAddressId ? { ...addr, ...addressForm } : addr
      );
    } else {
      const newAddress = {
        id: 'addr-' + Date.now(),
        ...addressForm,
      };
      updatedList = [...savedAddresses, newAddress];
      setSelectedAddressId(newAddress.id);
    }

    setSavedAddresses(updatedList);
    localStorage.setItem('panit_saved_addresses', JSON.stringify(updatedList));
    setIsAddressModalOpen(false);
  };

  const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0] || addressForm;

  // Processing Order Loader Screen (shown between clicking Place Order and Order Confirmed)
  if (isPlacingOrder) {
    return (
      <div className="order-loader-screen-wrapper">
        <div className="order-loader-card">
          <div className="order-loader-spinner-wrap">
            <div className="order-loader-spinner" />
            <div className="order-loader-center-icon">
              <ShoppingBag size={24} color="#0B57D0" />
            </div>
          </div>
          <h2 className="order-loader-title">Confirming Your Order...</h2>
          <p className="order-loader-desc">Please wait while we secure your payment and confirm your delivery details.</p>
          <div className="order-loader-progress-bar">
            <div className="order-loader-progress-fill" />
          </div>
        </div>
      </div>
    );
  }

  // 4. Order Confirmation Page (matching user reference screenshot)
  if (orderComplete) {
    return (
      <div className="order-confirmed-screen-wrapper">
        <div className="order-confirmed-modal-card">
          
          {/* Clean Tick Circle without outer dots/rays */}
          <div className="order-confirmed-badge-wrap">
            <div className="order-confirmed-gold-circle">
              <Check size={40} color="#FFFFFF" strokeWidth={3.5} />
            </div>
          </div>

          {/* Heading matching image */}
          <h1 className="order-confirmed-headline">
            Order Confirmed!
          </h1>
          <p className="order-confirmed-subline">
            Thank you for choosing <strong>Sri Thillai Traders</strong>.
          </p>

          {/* Details Pill Box (Order Number | Order Placed On) */}
          <div className="order-confirmed-pill-box">
            <div className="order-pill-col">
              <div className="order-pill-icon-wrap">
                <FileText size={20} color="#0B57D0" />
              </div>
              <div className="order-pill-text">
                <span className="order-pill-label">Order Number</span>
                <span className="order-pill-value">{orderComplete.orderNumber || orderComplete.orderId}</span>
              </div>
            </div>

            <div className="order-pill-divider" />

            <div className="order-pill-col">
              <div className="order-pill-icon-wrap">
                <Calendar size={20} color="#0B57D0" />
              </div>
              <div className="order-pill-text">
                <span className="order-pill-label">Order Placed On</span>
                <span className="order-pill-value">{orderComplete.formattedPlacedDate || orderComplete.estimatedDeliveryDate}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons matching image */}
          <div className="order-confirmed-actions-row">
            <Link to="/products" className="order-confirmed-continue-btn">
              <ShoppingBag size={18} />
              <span>Continue Shopping</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowOrderDetailsModal(true)}
              className="order-confirmed-details-btn"
            >
              <Eye size={18} />
              <span>View Order Details</span>
            </button>
          </div>
        </div>

        {/* Modal for View Order Details */}
        {showOrderDetailsModal && (
          <div className="address-modal-overlay" onClick={() => setShowOrderDetailsModal(false)}>
            <div className="address-modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
              <div className="address-modal-header">
                <h3 className="address-modal-title">Order Summary & Items</h3>
                <button
                  type="button"
                  className="address-modal-close"
                  onClick={() => setShowOrderDetailsModal(false)}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', background: '#F8FAFC', padding: '12px 16px', borderRadius: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Payment Method</span>
                    <p style={{ margin: '2px 0 0 0', fontWeight: 700, color: '#0F172A' }}>{orderComplete.paymentMethod}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Estimated Delivery</span>
                    <p style={{ margin: '2px 0 0 0', fontWeight: 700, color: '#16A34A' }}>{orderComplete.estimatedDeliveryDate}</p>
                  </div>
                </div>

                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#1E293B' }}>Ordered Items ({orderComplete.items.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {orderComplete.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '10px 14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={item.product?.image} alt={item.product?.name} style={{ width: '46px', height: '46px', objectFit: 'contain' }} />
                        <div>
                          <p style={{ fontWeight: 700, color: '#0F172A', margin: 0, fontSize: '0.9rem' }}>{item.product?.name}</p>
                          <p style={{ color: '#64748B', margin: 0, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span>Size: {item.packSize}</span>
                            {(item.selectedColorName || item.product?.selectedColorName) && (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                • Color: 
                                <span 
                                  style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: item.selectedColorHex || item.product?.selectedColorHex || '#FFFFFF',
                                    border: '1px solid #CBD5E1'
                                  }}
                                />
                                <span>{item.selectedColorName || item.product?.selectedColorName}</span>
                              </span>
                            )}
                            <span>• Qty: {item.quantity}</span>
                          </p>
                        </div>
                      </div>
                      <strong style={{ color: '#0F172A' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}.00</strong>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#F0F7FF', padding: '14px 18px', borderRadius: '12px', border: '1px solid #BFDBFE', marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: '#0B57D0' }}>Delivery Address</h4>
                  <p style={{ margin: '0 0 2px 0', fontWeight: 700, color: '#0F172A' }}>{orderComplete.address.fullName} ({orderComplete.address.phone})</p>
                  <p style={{ margin: 0, color: '#475569', fontSize: '0.86rem' }}>
                    {orderComplete.address.street}, {orderComplete.address.city}, {orderComplete.address.state} - {orderComplete.address.pincode}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid #E2E8F0', paddingTop: '14px' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Total Amount Paid</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B57D0' }}>₹{orderComplete.total.toLocaleString('en-IN')}.00</span>
                </div>
              </div>

              <div className="address-modal-footer">
                <button
                  type="button"
                  className="address-modal-cancel-btn"
                  onClick={() => setShowOrderDetailsModal(false)}
                >
                  Close
                </button>
                <Link to="/products" className="address-modal-save-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If both Cart and Buy Now are empty
  if (activeItems.length === 0) {
    return (
      <div className="checkout-page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="container"
          style={{
            maxWidth: '520px',
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid #E2E8F0',
            padding: '50px 36px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: '#EFF6FF',
              color: '#0056D2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
            }}
          >
            <ShoppingBag size={34} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            No Items to Checkout
          </h2>
          <p style={{ color: '#64748B', marginBottom: '26px', fontSize: '0.92rem' }}>
            Please select a paint product using <strong>Buy Now</strong> or add items to your cart before proceeding.
          </p>
          <Link to="/products" className="btn btn-primary" style={{ background: '#0056D2', borderRadius: '12px', padding: '12px 26px' }}>
            Explore Products Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!selectedAddress.fullName || !selectedAddress.phone || !selectedAddress.street || !selectedAddress.pincode) {
      alert('Please select or enter your delivery address.');
      setCurrentStep(2);
      return;
    }

    setIsPlacingOrder(true);

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const estDeliveryStr = deliveryDate.toLocaleDateString('en-IN', options);

    let paymentMethodName = paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Pay Online (UPI / Card / Net Banking)';

    setTimeout(() => {
      const now = new Date();
      const datePart = now.getFullYear().toString() + 
        String(now.getMonth() + 1).padStart(2, '0') + 
        String(now.getDate()).padStart(2, '0');
      const randomPart = Math.floor(100000 + Math.random() * 900000);
      const generatedOrderNumber = `#STT${datePart}${randomPart}`;

      const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedPlacedDate = `${now.toLocaleDateString('en-GB', dateOptions)}, ${now.toLocaleTimeString('en-US', timeOptions)}`;

      const placed = {
        orderId: generatedOrderNumber,
        orderNumber: generatedOrderNumber,
        formattedPlacedDate: formattedPlacedDate,
        items: activeItems,
        subtotal: itemsSubtotal,
        discount: couponDiscount,
        tax: gstAmount,
        shipping: deliveryCharge,
        total: finalOrderTotal,
        address: selectedAddress,
        paymentMethod: paymentMethodName,
        estimatedDeliveryDate: estDeliveryStr,
        date: now.toISOString(),
      };
      setOrderComplete(placed);
      if (!isDirectBuyNow) {
        clearCart();
      }
      setIsPlacingOrder(false);
    }, 1200);
  };

  return (
    <div className="checkout-page-wrapper">
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Step Progress Stepper Bar (matching image 2) */}
        <div className="lux-stepper-container">
          <div className="lux-stepper-track">
            {/* Step 1: Cart */}
            <div 
              className={`lux-step-node ${currentStep >= 1 ? 'active' : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              <div className="lux-step-circle">
                <ShoppingBag size={18} />
              </div>
              <span className="lux-step-label">Cart</span>
            </div>

            <div className={`lux-step-line ${currentStep >= 2 ? 'filled' : ''}`} />

            {/* Step 2: Address */}
            <div 
              className={`lux-step-node ${currentStep >= 2 ? 'active' : ''}`}
              onClick={() => {
                if (activeItems.length > 0) setCurrentStep(2);
              }}
            >
              <div className="lux-step-circle">
                <MapPin size={18} />
              </div>
              <span className="lux-step-label">Address</span>
            </div>

            <div className={`lux-step-line ${currentStep >= 3 ? 'filled' : ''}`} />

            {/* Step 3: Payment */}
            <div 
              className={`lux-step-node ${currentStep >= 3 ? 'active' : ''}`}
              onClick={() => {
                if (selectedAddress.fullName) setCurrentStep(3);
              }}
            >
              <div className="lux-step-circle">
                <CreditCard size={18} />
              </div>
              <span className="lux-step-label">Payment</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: MY CART / REVIEW YOUR ITEMS AND PROCEED TO CHECKOUT (Image 1) */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
              <div>
                <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', margin: '0 0 4px 0', fontFamily: 'Outfit, sans-serif' }}>
                  My Cart
                </h1>
                <p style={{ color: '#0B57D0', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
                  REVIEW YOUR ITEMS AND PROCEED TO CHECKOUT
                </p>
              </div>
              <div style={{ border: '1px solid #E5E7EB', borderRadius: '20px', padding: '6px 16px', background: '#FFFFFF', fontSize: '0.86rem', fontWeight: 600, color: '#4B5563' }}>
                {activeItems.length} Items
              </div>
            </div>

            <div className="checkout-main-grid">
              {/* Left Side: Product Card matching Image 1 */}
              <div className="lux-cart-items-column" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {activeItems.map((item) => (
                  <div key={item.cartItemId} className="lux-cart-item-card">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="lux-cart-item-img"
                    />

                    <div className="lux-cart-item-info">
                      <div className="lux-cart-brand-tag">{item.product?.brand || 'SRI THILLAI TRADERS'}</div>
                      <div className="lux-cart-item-title-row">
                        <h3 className="lux-cart-item-name">{item.product?.name}</h3>
                        <div className="lux-cart-price-box">
                          {item.product?.originalPrice && (
                            <span className="lux-cart-old-price">
                              ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}.00
                            </span>
                          )}
                          <span className="lux-cart-cur-price">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}.00
                          </span>
                          <span className="lux-cart-discount-tag">10% OFF</span>
                        </div>
                      </div>

                      <div style={{ color: '#D97706', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px', margin: '2px 0 6px 0' }}>
                        ★ <span style={{ color: '#6B7280' }}>(4.8 reviews)</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ color: '#4B5563', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                          <span>Size: <strong>{item.packSize}</strong></span>
                          {(item.selectedColorName || item.product?.selectedColorName) && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              Color: 
                              <span 
                                style={{
                                  display: 'inline-block',
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '50%',
                                  backgroundColor: item.selectedColorHex || item.product?.selectedColorHex || '#FFFFFF',
                                  border: '1px solid #CBD5E1',
                                  verticalAlign: 'middle',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                }}
                              />
                              <strong>{item.selectedColorName || item.product?.selectedColorName}</strong>
                            </span>
                          )}
                          {(item.selectedFinish || item.product?.selectedFinish) && (
                            <span>Finish: <strong style={{ textTransform: 'capitalize' }}>{item.selectedFinish || item.product?.selectedFinish}</strong></span>
                          )}
                        </div>
                        <div className="lux-qty-pill">
                          Qty: <strong>{item.quantity}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px', fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ● Delivered by Tomorrow
                        </span>
                        <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          📦 Free Shipping
                        </span>
                      </div>

                      <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '10px', paddingTop: '8px', display: 'flex', gap: '16px' }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/product/${item.product?.id}`)}
                          style={{ background: 'none', border: 'none', color: '#1F2937', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                        <span style={{ color: '#E5E7EB' }}>|</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (isDirectBuyNow) navigate(-1);
                            else clearCart();
                          }}
                          style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {isDirectBuyNow && (
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="lux-cancel-buynow-btn"
                  >
                    Cancel Buy Now
                  </button>
                )}

                {/* Trust Badges matching Image 1 */}
                <div className="lux-trust-row">
                  <div className="lux-trust-item">
                    <ShieldCheck size={22} color="#0B57D0" />
                    <div>
                      <strong>100% Genuine Paint</strong>
                      <p>Authorized Dealer Pack</p>
                    </div>
                  </div>
                  <div className="lux-trust-item">
                    <Package size={22} color="#0B57D0" />
                    <div>
                      <strong>Insured Transit</strong>
                      <p>Safe Doorstep Delivery</p>
                    </div>
                  </div>
                  <div className="lux-trust-item">
                    <Lock size={22} color="#0B57D0" />
                    <div>
                      <strong>Secure Checkout</strong>
                      <p>100% Protected Payment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Order Summary Card matching Image 1 */}
              <div className="lux-summary-card">
                <h2 className="lux-summary-title">Order Summary</h2>
                <div className="lux-diamond-divider">◆</div>

                <div className="lux-summary-rows">
                  <div className="lux-summary-row">
                    <span>Subtotal</span>
                    <span>₹{(itemsSubtotal + 1000).toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="lux-summary-row highlight-green">
                    <span>Product Discount</span>
                    <span>-₹1,000.00</span>
                  </div>
                  <div className="lux-summary-row">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="lux-summary-row">
                    <span>Shipping Fee</span>
                    <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}.00`}</span>
                  </div>
                  <div className="lux-summary-row">
                    <span>GST (18%)</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}.00</span>
                  </div>
                </div>

                <div className="lux-grand-total-row">
                  <span>Grand Total</span>
                  <span className="lux-grand-total-val">₹{finalOrderTotal.toLocaleString('en-IN')}.00</span>
                </div>

                <div className="lux-savings-banner">
                  <span className="lux-savings-dot">●</span>
                  <span>You Saved ₹{(1000 + couponDiscount).toLocaleString('en-IN')}.00 Today!</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="lux-gold-proceed-btn"
                >
                  <Lock size={16} />
                  <span>PROCEED TO CHECKOUT</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SELECT DELIVERY ADDRESS (Image 2) */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div>
            <div className="checkout-main-grid">
              {/* Left Side: Address Selection */}
              <div className="lux-cart-items-column">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    Select Delivery Address
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddNewAddress}
                    className="add-address-action-btn"
                  >
                    + ADD NEW ADDRESS
                  </button>
                </div>

                {savedAddresses.length === 0 ? (
                  <div className="lux-no-address-box">
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      No Saved Addresses Found
                    </h3>
                    <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '18px' }}>
                      Add a delivery address to complete your order checkout.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddNewAddress}
                      className="lux-gold-proceed-btn"
                      style={{ maxWidth: '240px', margin: '0 auto' }}
                    >
                      + ADD NEW ADDRESS
                    </button>
                  </div>
                ) : (
                  <div className="checkout-address-cards-list">
                    {savedAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          className={`checkout-address-item-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedAddressId(addr.id)}
                        >
                          <div className="address-item-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div className={`address-radio-circle ${isSelected ? 'checked' : ''}`}>
                                {isSelected && <div className="address-radio-dot" />}
                              </div>
                              <span className="address-user-name">{addr.fullName}</span>
                              {addr.isDefault && <span className="address-default-badge">DEFAULT</span>}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleEditAddress(addr, e)}
                              className="address-edit-btn"
                            >
                              <Edit2 size={14} />
                              <span>Edit</span>
                            </button>
                          </div>

                          <div className="address-item-body">
                            <p className="address-item-street">
                              {addr.street}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                            </p>
                            <p className="address-item-phone">
                              <span>Phone:</span> {addr.phone}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="address-item-selected-footer">
                              <span className="selected-tag">
                                <Check size={14} /> Deliver to this Address
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="address-modal-cancel-btn"
                  >
                    ← Back to Cart
                  </button>
                </div>
              </div>

              {/* Right Side: Price Details matching Image 2 */}
              <div className="lux-summary-card">
                <h2 className="lux-summary-title" style={{ fontSize: '1.15rem' }}>
                  Price Details ({activeItems.length} Items)
                </h2>

                <div className="lux-summary-rows" style={{ marginTop: '16px' }}>
                  <div className="lux-summary-row">
                    <span>Product Price</span>
                    <span>₹{(itemsSubtotal + 1000).toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="lux-summary-row highlight-green">
                    <span>Discounts</span>
                    <span>-₹1,000.00</span>
                  </div>
                  <div className="lux-summary-row">
                    <span>GST</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="lux-summary-row">
                    <span>Delivery Charges</span>
                    <span className="highlight-green">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}.00`}</span>
                  </div>
                </div>

                <div className="lux-grand-total-row" style={{ marginTop: '22px' }}>
                  <span>Order Total</span>
                  <span className="lux-grand-total-val">₹{finalOrderTotal.toLocaleString('en-IN')}.00</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="lux-gold-proceed-btn"
                  style={{ marginTop: '20px' }}
                >
                  <span>Continue to Payment →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: PAYMENT PAGE & DELIVERY ADDRESS CONFIRMATION (Image 3) */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <form onSubmit={handlePlaceOrder}>
            <div className="checkout-main-grid">
              {/* Left Column: Product mini card + Delivery Address Card + Select Payment Method */}
              <div className="lux-cart-items-column" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Product Mini Preview (matching Image 3 top) */}
                <div className="checkout-card" style={{ padding: '16px 20px' }}>
                  {activeItems.map((item) => (
                    <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#F8FAFC', borderRadius: '10px', padding: '4px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
                          {item.product?.name}
                        </h4>
                        <p style={{ margin: '0 0 6px 0', color: '#16A34A', fontSize: '0.82rem', fontWeight: 600 }}>
                          ✓ All issue easy returns
                        </p>
                        <p style={{ margin: 0, color: '#6B7280', fontSize: '0.82rem' }}>
                          Size: {item.packSize} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address Card with Full Card Background matching user request */}
                <div 
                  className="checkout-card"
                  style={{
                    background: '#F0F7FF',
                    border: '1.5px solid #BFDBFE',
                    borderBottom: '3.5px solid #0B57D0',
                    borderRadius: '18px',
                    padding: '24px',
                    boxShadow: '0 4px 18px rgba(11, 87, 208, 0.07)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <MapPin size={22} color="#0B57D0" />
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                      Delivery Address
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#DBEAFE', color: '#0B57D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>
                          {selectedAddress.fullName}
                        </span>
                        <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                          Home
                        </span>
                      </div>
                      <p style={{ color: '#1E293B', margin: '0 0 6px 0', fontSize: '0.92rem', fontWeight: 700 }}>
                        {selectedAddress.phone}
                      </p>
                      <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '480px' }}>
                        {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Select Payment Method (matching user screenshot) */}
                <div className="lux-payment-method-card">
                  <div className="lux-payment-method-header">
                    <CreditCard size={20} color="#0B57D0" />
                    <h3 className="lux-payment-method-title">
                      Select Payment Method
                    </h3>
                  </div>

                  <div className="lux-payment-options-list">
                    {/* Option 1: Cash on Delivery */}
                    <div 
                      className={`lux-payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="lux-payment-icon-circle">
                        <Banknote size={20} color="#0B57D0" />
                      </div>

                      <div className="lux-payment-info-col">
                        <div className="lux-payment-title-row">
                          <span className="lux-payment-opt-name">Cash on Delivery</span>
                          <span className="lux-payment-cod-tag">COD</span>
                        </div>
                        <p className="lux-payment-opt-desc">
                          Pay in cash when your order is delivered
                        </p>
                      </div>

                      <div className={`lux-payment-check-circle ${paymentMethod === 'cod' ? 'checked' : ''}`}>
                        {paymentMethod === 'cod' && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                      </div>
                    </div>

                    {/* Option 2: Pay Online */}
                    <div 
                      className={`lux-payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('online')}
                    >
                      <div className="lux-payment-icon-circle">
                        <CreditCard size={20} color="#0B57D0" />
                      </div>

                      <div className="lux-payment-info-col">
                        <div className="lux-payment-title-row">
                          <span className="lux-payment-opt-name">Pay Online</span>
                        </div>
                        <p className="lux-payment-opt-desc">
                          UPI, Cards, Net Banking
                        </p>
                      </div>

                      <div className={`lux-payment-check-circle ${paymentMethod === 'online' ? 'checked' : ''}`}>
                        {paymentMethod === 'online' && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Order Summary with Apply Coupon link (matching Image 3 right) */}
              <div className="lux-summary-card">
                <div className="lux-summary-rows">
                  <div className="lux-summary-row highlight-green">
                    <span>Product Discount</span>
                    <span>-₹1,000.00</span>
                  </div>

                  <div className="lux-summary-row" style={{ alignItems: 'center' }}>
                    <span>Coupon Discount</span>
                    <button
                      type="button"
                      onClick={() => {
                        const code = prompt('Enter coupon code (e.g. THILLAI10):');
                        if (code) {
                          setCouponCode(code);
                          if (code.toUpperCase() === 'THILLAI10') {
                            setAppliedCoupon({ code, type: 'percent', value: 10, label: '10% Discount' });
                          } else {
                            alert('Invalid coupon code. Try THILLAI10');
                          }
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: '#EC4899', fontWeight: 700, cursor: 'pointer', fontSize: '0.86rem' }}
                    >
                      {appliedCoupon ? `✓ -₹${couponDiscount}.00` : 'Apply Coupon'}
                    </button>
                  </div>

                  <div className="lux-summary-row">
                    <span>GST</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}.00</span>
                  </div>

                  <div className="lux-summary-row">
                    <span>Delivery Charges</span>
                    <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}.00`}</span>
                  </div>
                </div>

                <div className="lux-grand-total-row" style={{ marginTop: '28px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                  <span>Order Total</span>
                  <span className="lux-grand-total-val" style={{ fontSize: '1.7rem' }}>
                    ₹{finalOrderTotal.toLocaleString('en-IN')}.00
                  </span>
                </div>

                <div className="lux-savings-banner" style={{ marginTop: '14px' }}>
                  <span className="lux-savings-dot">✓</span>
                  <span>You are saving ₹{(1000 + couponDiscount).toLocaleString('en-IN')}.00 on this order</span>
                </div>

                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="lux-gold-proceed-btn"
                  style={{ marginTop: '24px' }}
                >
                  {isPlacingOrder ? (
                    'Processing Order...'
                  ) : (
                    <span>Place Order (₹{finalOrderTotal.toLocaleString('en-IN')}.00) →</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>

      {/* Add / Edit Address Modal Drawer */}
      {isAddressModalOpen && (
        <div className="address-modal-overlay" onClick={() => setIsAddressModalOpen(false)}>
          <div className="address-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="address-modal-header">
              <h3 className="address-modal-title">
                {editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}
              </h3>
              <button
                type="button"
                className="address-modal-close"
                onClick={() => setIsAddressModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="address-modal-form">
              <div className="checkout-form-grid-2">
                <div className="checkout-field-group">
                  <label className="checkout-label">Full Name *</label>
                  <div className="checkout-input-container">
                    <User size={18} className="checkout-input-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="checkout-input"
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="checkout-field-group">
                  <label className="checkout-label">Phone Number *</label>
                  <div className="checkout-input-container">
                    <Phone size={18} className="checkout-input-icon" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      className="checkout-input"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-field-group">
                <label className="checkout-label">Street Address / House / Flat No. *</label>
                <div className="checkout-input-container">
                  <MapPin size={18} className="checkout-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12/4 East Car Street"
                    className="checkout-input"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  />
                </div>
              </div>

              <div className="checkout-form-grid-3">
                <div className="checkout-field-group">
                  <label className="checkout-label">City *</label>
                  <div className="checkout-input-container">
                    <Building size={18} className="checkout-input-icon" />
                    <input
                      type="text"
                      required
                      placeholder="Chidambaram"
                      className="checkout-input"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="checkout-field-group">
                  <label className="checkout-label">State *</label>
                  <div className="checkout-input-container" style={{ position: 'relative' }}>
                    <MapPin size={18} className="checkout-input-icon" />
                    <select
                      className="checkout-select"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                    </select>
                    <ChevronDown size={16} color="#64748B" style={{ pointerEvents: 'none', marginLeft: '6px' }} />
                  </div>
                </div>

                <div className="checkout-field-group">
                  <label className="checkout-label">Pincode *</label>
                  <div className="checkout-input-container">
                    <MapPin size={18} className="checkout-input-icon" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="608001"
                      className="checkout-input"
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="address-modal-footer">
                <button
                  type="button"
                  className="address-modal-cancel-btn"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="address-modal-save-btn"
                >
                  {editingAddressId ? 'Save Changes' : 'Save Address and Deliver Here'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

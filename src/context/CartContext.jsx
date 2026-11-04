import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'thillai_cart_items';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage synchronized
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cartItems]);

  // Add item with specified pack size and quantity
  const addToCart = (product, packSize = null, quantity = 1) => {
    const selectedSize = packSize || product.defaultPackSize || product.packSizes?.[0] || '1 L';
    const unitPrice = product.packPrices?.[selectedSize] || product.price;
    const selectedColorName = product.selectedColorName || null;
    const selectedColorHex = product.selectedColorHex || null;
    const selectedFinish = product.selectedFinish || null;
    const cartItemId = `${product.id}-${selectedSize}${selectedColorHex ? `-${selectedColorHex.replace('#', '')}` : ''}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            product,
            packSize: selectedSize,
            selectedColorName,
            selectedColorHex,
            selectedFinish,
            price: unitPrice,
            originalPrice: product.originalPrice ? Math.round(unitPrice * 1.2) : null,
            quantity: quantity,
          },
        ];
      }
    });
  };

  // Remove single line item
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Update quantity (min 1)
  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Derived computations
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const estimatedTax = Math.round(subtotal * 0.18); // 18% GST on paints
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + estimatedTax + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        estimatedTax,
        shippingFee,
        grandTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;

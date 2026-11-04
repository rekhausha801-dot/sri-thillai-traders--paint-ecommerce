import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ColorPalette from './pages/ColorPalette';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Styles
import './styles/global.css';

// Automatically scroll to top on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ScrollToTop />
            {/* 1. Navbar */}
            <Navbar />

            {/* Main Application Routes */}
            <main style={{ flex: 1 }}>
              <Routes>
                {/* 2. Homepage: HeroBanner -> ProductCategories -> ServicesSection -> FeaturedProducts */}
                <Route path="/" element={<Home />} />

                {/* Products & Details */}
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* Color Palette Details & Swatches Page */}
                <Route path="/colors/:slug" element={<ColorPalette />} />

                {/* Painting Services & Cost Estimation */}
                <Route path="/services" element={<Services />} />

                {/* About Us */}
                <Route path="/about" element={<About />} />

                {/* Contact Us */}
                <Route path="/contact" element={<Contact />} />

                {/* Cart & Wishlist */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Checkout */}
                <Route path="/checkout" element={<Checkout />} />

                {/* Profile & Account Management */}
                <Route path="/profile" element={<Profile />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

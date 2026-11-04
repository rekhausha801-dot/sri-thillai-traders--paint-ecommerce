import api from './api';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';

/**
 * Product Service
 * Handles data fetching with fallback to local mock data
 * Prepared for live REST backend integration via Axios
 */
export const productService = {
  // Fetch all products with optional filters
  async getProducts(params = {}) {
    try {
      let items = [...PRODUCTS];

      // Multi-category filter or single category
      if (params.categories && Array.isArray(params.categories) && params.categories.length > 0) {
        items = items.filter((p) =>
          params.categories.includes(p.category) || params.categories.includes(p.categoryName)
        );
      } else if (params.category && params.category !== 'all') {
        const catQuery = params.category.toLowerCase();
        items = items.filter(
          (p) =>
            p.category.toLowerCase() === catQuery ||
            p.categoryName.toLowerCase() === catQuery ||
            p.category.toLowerCase().includes(catQuery)
        );
      }

      // Multi-brand filter or single brand
      if (params.brands && Array.isArray(params.brands) && params.brands.length > 0) {
        items = items.filter((p) => params.brands.includes(p.brand));
      } else if (params.brand && params.brand !== 'all' && params.brand !== 'All Brands') {
        items = items.filter(
          (p) => p.brand.toLowerCase() === params.brand.toLowerCase()
        );
      }

      // Finish type filter
      if (params.finishes && Array.isArray(params.finishes) && params.finishes.length > 0) {
        items = items.filter((p) => params.finishes.includes(p.finish));
      }

      // Color family filter
      if (params.colorFamilies && Array.isArray(params.colorFamilies) && params.colorFamilies.length > 0) {
        items = items.filter((p) => params.colorFamilies.includes(p.colorFamily));
      }

      // Search query filter
      if (params.search) {
        const query = params.search.toLowerCase();
        items = items.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            (p.categoryName && p.categoryName.toLowerCase().includes(query)) ||
            (p.subtitle && p.subtitle.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
      }

      // Sorting
      if (params.sort) {
        if (params.sort === 'price-low') {
          items.sort((a, b) => a.price - b.price);
        } else if (params.sort === 'price-high') {
          items.sort((a, b) => b.price - a.price);
        } else if (params.sort === 'rating') {
          items.sort((a, b) => b.rating - a.rating);
        } else if (params.sort === 'newest') {
          items.sort((a, b) => b.id.localeCompare(a.id));
        }
      }

      return items;
    } catch (error) {
      console.warn('API error, falling back to local products', error);
      return PRODUCTS;
    }
  },

  // Fetch single product by ID
  async getProductById(id) {
    try {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    } catch (error) {
      const product = PRODUCTS.find((p) => p.id === id);
      return product || null;
    }
  },

  // Fetch featured products for homepage
  async getFeaturedProducts() {
    try {
      return PRODUCTS.filter((p) => p.isFeatured);
    } catch {
      return PRODUCTS.filter((p) => p.isFeatured);
    }
  },

  // Fetch all categories
  async getCategories() {
    try {
      return CATEGORIES;
    } catch {
      return CATEGORIES;
    }
  }
};

export default productService;

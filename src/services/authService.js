import api from './api';

const TOKEN_KEY = 'thillai_auth_token';
const USER_KEY = 'thillai_user';

export const authService = {
  // Login user
  async login(email, password) {
    try {
      // In production:
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;

      // Mock authentication
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }

      const mockUser = {
        id: 'usr_8921',
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Valued Customer',
        email: email,
        phone: '+91 98765 43210',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

      return { user: mockUser, token: mockToken };
    } catch (error) {
      throw error;
    }
  },

  // Register user
  async register({ name, email, phone, password }) {
    try {
      // In production:
      // const response = await api.post('/auth/register', { name, email, phone, password });
      // const { token, user } = response.data;

      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required.');
      }

      const newUser = {
        id: 'usr_' + Math.floor(Math.random() * 10000),
        name,
        email,
        phone: phone || '+91 98765 43210',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));

      return { user: newUser, token: mockToken };
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get currently logged-in user
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Check if token exists
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

export default authService;

export const CATEGORIES = [
  {
    id: 'interior-wall-paints',
    name: 'Interior Wall Paints',
    slug: 'interior-wall-paints',
    tagline: 'Beautiful walls, brighter living',
    description: 'Premium interior paints with rich colours, smooth finish and long-lasting beauty.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    itemCount: 42,
    icon: 'Home',
    palette: ['#E8D8C3', '#C2C5A5', '#8E9A86', '#7B9BA6'],
    popularBrands: ['Asian Paints', 'Dulux', 'Berger', 'Nerolac']
  },
  {
    id: 'exterior-wall-paints',
    name: 'Exterior Wall Paints',
    slug: 'exterior-wall-paints',
    tagline: 'Stronger protection, lasting beauty',
    description: 'Weather-resistant paints that protect your home and keep it looking fresh for years.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    itemCount: 36,
    icon: 'Building',
    palette: ['#F5E8D3', '#E07A5F', '#8D99AE', '#4A90E2'],
    popularBrands: ['Asian Paints Apex', 'Berger WeatherCoat', 'Dulux Weathershield']
  },
  {
    id: 'wood-metal-paints',
    name: 'Wood & Metal Paints',
    slug: 'wood-metal-paints',
    tagline: 'Durable finish for lasting strength',
    description: 'Specialized paints for wood and metal surfaces, with excellent protection and rich finish.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    itemCount: 28,
    icon: 'Layers',
    palette: ['#8B4513', '#2B2D42', '#A8DADC', '#2E5A44'],
    popularBrands: ['Asian Paints Apcolite', 'Dulux Gloss', 'MRF Vapocure']
  },
  {
    id: 'primers-undercoats',
    name: 'Primers & Undercoats',
    slug: 'primers-undercoats',
    tagline: 'Flawless base for perfect color',
    description: 'High-adhesion alkali-resistant primers ensuring uniform substrate bonding and true color brilliance.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    icon: 'Paintbrush',
    palette: ['#FFFFFF', '#F1F5F9', '#E2E8F0', '#CBD5E1'],
    popularBrands: ['Decoprime', 'Berger BP Primer', 'Dulux Promise']
  },
  {
    id: 'waterproofing-products',
    name: 'Waterproofing Products',
    slug: 'waterproofing-products',
    tagline: 'Complete defence against leaks & damp',
    description: 'Advanced elastomeric barrier coatings protecting roofs, walls, and foundations from moisture seepage.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    itemCount: 31,
    icon: 'ShieldCheck',
    palette: ['#1E3A8A', '#2563EB', '#60A5FA', '#93C5FD'],
    popularBrands: ['Dr. Fixit', 'Asian Paints SmartCare', 'Fosroc']
  },
  {
    id: 'texture-decorative-paints',
    name: 'Texture & Decorative Paints',
    slug: 'texture-decorative-paints',
    tagline: 'Designer textures & metallic elegance',
    description: 'Luxurious designer wall textures creating artistic statement accent walls with royal metallic luster.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    itemCount: 19,
    icon: 'Sparkles',
    palette: ['#D4AF37', '#C5A059', '#8C7853', '#5E4B3C'],
    popularBrands: ['Asian Paints Royale Play', 'Berger Silk Glamor']
  },
  {
    id: 'construction-chemicals',
    name: 'Construction Chemicals',
    slug: 'construction-chemicals',
    tagline: 'Structural repair & advanced bonding',
    description: 'High-strength repair mortars, latex bonding agents, and plasticizers for concrete durability.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    itemCount: 24,
    icon: 'Wrench',
    palette: ['#374151', '#4B5563', '#6B7280', '#9CA3AF'],
    popularBrands: ['Roff', 'Dr. Fixit', 'Sika', 'Fosroc']
  },
  {
    id: 'adhesives-sealants',
    name: 'Adhesives & Sealants',
    slug: 'adhesives-sealants',
    tagline: 'Maximum bonding strength & joint seal',
    description: 'Marine-grade waterproof adhesives, neutral silicone joint fillers, and epoxy bonding pastes.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
    icon: 'Package',
    palette: ['#D97706', '#B45309', '#92400E', '#78350F'],
    popularBrands: ['Fevicol Marine', 'Araldite', 'Dow Corning', 'Pidilite']
  },
  {
    id: 'painting-tools-accessories',
    name: 'Painting Tools & Accessories',
    slug: 'painting-tools-accessories',
    tagline: 'Professional tools for master finishes',
    description: 'Ergonomic microfiber roller sets, precision sash brushes, masking films, and scraper kits.',
    image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80',
    itemCount: 35,
    icon: 'Tool',
    palette: ['#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA'],
    popularBrands: ['Asian Paints TruCare', 'Stanley', 'Harris', 'Wagner']
  }
];

export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id || c.slug === id);

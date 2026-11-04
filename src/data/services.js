export const SERVICES = [
  {
    id: 'interior-painting',
    slug: 'interior-painting',
    title: 'Interior Painting',
    shortDesc: 'Dustless, premium interior painting with laser measurements, furniture masking, and luxury wall finishes.',
    fullDesc: 'Revamp your home interior with our signature dustless sanding technology, protective floor masking, and flawless dual-coat application using odorless, zero-VOC luxury paints.',
    icon: 'Home',
    turnaround: '3 - 5 Days',
    priceStartingAt: '₹12 / sq.ft',
    features: [
      'Dust-free mechanical sanding',
      'Complete furniture & floor masking protection',
      'Two coats of premium washable paint',
      'Free post-paint deep cleaning & sanitization'
    ],
    image: '/src/assets/f36926db-3e39-4c61-a19c-2baed06ed850.png'
  },
  {
    id: 'exterior-painting',
    slug: 'exterior-painting',
    title: 'Exterior Painting',
    shortDesc: 'Heavy-duty weather protection, algae-resistant facade coating with scaffolding and structural crack filling.',
    fullDesc: 'End-to-end exterior elevation painting engineered to withstand monsoon rains, tropical sun, and dust. Includes high-pressure water blasting and crack sealing.',
    icon: 'Building2',
    turnaround: '5 - 8 Days',
    priceStartingAt: '₹16 / sq.ft',
    features: [
      'High-pressure surface water jet wash',
      'Structural crack bridging & primer coat',
      'UV & algae resistant exterior shield',
      'Up to 10 years manufacturer backed warranty'
    ],
    image: '/src/assets/766a6e79-974c-46a6-98b6-81d5145e8f8b.png'
  },
  {
    id: 'waterproofing-service',
    slug: 'waterproofing-service',
    title: 'Waterproofing Service',
    shortDesc: 'Leak detection, terrace elastomeric coating, bathroom dampness rectification & crystalline waterproofing.',
    fullDesc: 'Defend your building from dampness, seepage, and structural degradation with Dr. Fixit & SmartCare certified multi-layer waterproofing methods.',
    icon: 'ShieldCheck',
    turnaround: '2 - 4 Days',
    priceStartingAt: '₹35 / sq.ft',
    features: [
      'Thermal moisture meter leak diagnosis',
      'Heavy-duty elastomeric terrace membrane',
      'Internal wall damp injection treatment',
      'Zero-leak guarantee certificate'
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'professional-painter-booking',
    slug: 'professional-painter-booking',
    title: 'Professional Painter Booking',
    shortDesc: 'Hire certified, background-checked master painters on a per-day or contract basis for quick projects.',
    fullDesc: 'Directly book trained and verified painters for quick room makeovers, touch-up jobs, decorative accents, or commercial painting with strict quality supervision.',
    icon: 'UserCheck',
    turnaround: 'Available Next Day',
    priceStartingAt: '₹950 / day per painter',
    features: [
      '100% verified & background checked craftsmen',
      'Expertise in spray painting & texture rollers',
      'Punctual, disciplined & clean work ethic',
      'Dedicated project manager oversight'
    ],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'painting-cost-estimation',
    slug: 'painting-cost-estimation',
    title: 'Painting Cost Estimation',
    shortDesc: 'Free in-person site inspection, digital laser measurement, and itemized transparent budget estimation.',
    fullDesc: 'Get a comprehensive room-by-room painting quotation with exact square footage, recommended paint products, coats, and timeline with no hidden costs.',
    icon: 'Calculator',
    turnaround: 'Within 2 Hours',
    priceStartingAt: '100% Free Consultation',
    features: [
      'Digital laser dimension measurement',
      'Personalized shade cards & color preview',
      'Detailed itemized bill of materials (BOM)',
      'Multiple budget tier options (Economy, Premium, Luxury)'
    ],
    image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80'
  }
];

export const getServiceById = (id) => SERVICES.find(s => s.id === id || s.slug === id);

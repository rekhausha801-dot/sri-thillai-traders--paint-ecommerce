const sharp = require('sharp');
const fs = require('fs');

async function makeEconomyHD() {
  const width = 988;
  const height = 1408;

  // Render high-precision SVG matching the exact fonts and vector geometry
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Warm Studio Wall Gradient: Elegant ochre amber to deep warm chestnut -->
      <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#9A4817"/>
        <stop offset="30%" stop-color="#7C350D"/>
        <stop offset="70%" stop-color="#5B2406"/>
        <stop offset="100%" stop-color="#3B1403"/>
      </linearGradient>

      <!-- Floor Gradient -->
      <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#451A03"/>
        <stop offset="50%" stop-color="#2B1002"/>
        <stop offset="100%" stop-color="#180800"/>
      </linearGradient>

      <!-- Pedestal Gradient -->
      <linearGradient id="podiumTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#A8521B"/>
        <stop offset="100%" stop-color="#6B2907"/>
      </linearGradient>

      <!-- Button Gradient -->
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#C25E1A"/>
        <stop offset="100%" stop-color="#9A420A"/>
      </linearGradient>

      <!-- Soft glow and shadows -->
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="12" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
      <filter id="btnShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.45"/>
      </filter>
    </defs>

    <!-- 1. Background Wall -->
    <rect width="${width}" height="1060" fill="url(#wallGrad)"/>

    <!-- 2. Right Vertical Wall Slats / Paneling (Identical to Card 2 Luxury and Card 3 Premium) -->
    <g opacity="0.22">
      <rect x="840" y="0" width="20" height="1060" fill="#000"/>
      <rect x="875" y="0" width="20" height="1060" fill="#000"/>
      <rect x="910" y="0" width="20" height="1060" fill="#000"/>
      <rect x="945" y="0" width="20" height="1060" fill="#000"/>
      <rect x="980" y="0" width="8" height="1060" fill="#000"/>
    </g>

    <!-- 3. Modern Hanging Cone Pendant Lamp on Right (Identical to Card 1, 2) -->
    <line x1="890" y1="0" x2="890" y2="150" stroke="#1C0E05" stroke-width="4"/>
    <path d="M840 230 C840 160, 940 160, 940 230 Z" fill="#170A02"/>
    <ellipse cx="890" cy="230" rx="50" ry="14" fill="#FEF3C7" opacity="0.9" filter="url(#glow)"/>
    <!-- Soft light cone cast down -->
    <polygon points="840,230 940,230 970,550 810,550" fill="#FEF3C7" opacity="0.06"/>

    <!-- 4. Left Green Houseplant foliage (Identical to Cards 1, 2, 3) -->
    <g opacity="0.45">
      <!-- Leaf 1 -->
      <path d="M-20 400 Q 80 460, 110 580 Q 40 680, -20 720 Z" fill="#15803D"/>
      <!-- Leaf 2 -->
      <path d="M-20 540 Q 120 620, 140 760 Q 60 880, -20 920 Z" fill="#166534"/>
      <!-- Leaf 3 -->
      <path d="M-20 720 Q 90 800, 100 920 Q 40 1000, -20 1020 Z" fill="#14532D"/>
    </g>

    <!-- 5. Floor Ground -->
    <rect y="1060" width="${width}" height="348" fill="url(#floorGrad)"/>

    <!-- 6. Cylindrical Pedestal / Podium for Paint Can (Identical to Cards 1, 2, 3) -->
    <ellipse cx="330" cy="1110" rx="290" ry="72" fill="url(#podiumTop)" filter="url(#btnShadow)"/>
    <rect x="40" y="1110" width="580" height="42" fill="#421A04"/>
    <ellipse cx="330" cy="1152" rx="290" ry="72" fill="#2A1002"/>

    <!-- 7. TOP PILL BADGE: Economy (With leaf icon matching cards) -->
    <g transform="translate(85, 75)">
      <rect width="240" height="66" rx="33" fill="rgba(255, 255, 255, 0.18)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2"/>
      <!-- Leaf / tag icon -->
      <path d="M 34 33 C 34 25, 46 22, 50 33 C 50 42, 38 45, 34 33 Z" fill="none" stroke="#FFFFFF" stroke-width="2.8"/>
      <path d="M 36 35 L 48 31" stroke="#FFFFFF" stroke-width="2"/>
      <text x="74" y="43" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="27" fill="#FFFFFF" letter-spacing="0.6">Economy</text>
    </g>

    <!-- 8. MAIN TITLE: Economy -->
    <text x="85" y="235" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="84" fill="#FFFFFF" letter-spacing="-1.5">Economy</text>

    <!-- 9. SUBTITLE: Budget-friendly beauty for brighter walls -->
    <text x="85" y="300" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="500" font-size="32" fill="rgba(255, 255, 255, 0.92)">Budget-friendly beauty for</text>
    <text x="85" y="345" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="500" font-size="32" fill="rgba(255, 255, 255, 0.92)">brighter walls</text>

    <!-- 10. WARRANTY BADGE: 3 UP TO YEARS WARRANTY -->
    <g transform="translate(85, 415)">
      <!-- Shield Icon (Exact replica of 10/8/6 years in Cards 1, 2, 3) -->
      <path d="M 18 20 C 18 48, 48 70, 48 70 C 48 70, 78 48, 78 20 L 48 8 Z" fill="none" stroke="rgba(255, 255, 255, 0.9)" stroke-width="4.5"/>
      <path d="M 34 38 L 44 48 L 62 30" fill="none" stroke="rgba(255, 255, 255, 0.9)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- '3' Number -->
      <text x="108" y="68" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="76" fill="#FFFFFF">3</text>
      
      <!-- Text stack -->
      <text x="165" y="36" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="19" fill="rgba(255, 255, 255, 0.85)" letter-spacing="1">UP TO</text>
      <text x="165" y="58" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="24" fill="#FFFFFF" letter-spacing="1">YEARS</text>
      <text x="165" y="78" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="16" fill="rgba(255, 255, 255, 0.8)" letter-spacing="1.5">WARRANTY</text>
    </g>

    <!-- 11. THREE CIRCULAR FEATURE BADGES ON THE RIGHT (IDENTICAL TO CARDS 1, 2, 3) -->
    <!-- Feature 1: Smooth Finish -->
    <g transform="translate(600, 580)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.14)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="2"/>
      <!-- Sparkle stars -->
      <path d="M42 32 L46 44 L58 48 L46 52 L42 64 L38 52 L26 48 L38 44 Z" fill="#FFFFFF"/>
      <path d="M58 32 L60 38 L66 40 L60 42 L58 48 L56 42 L50 40 L56 38 Z" fill="#FFFFFF"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Smooth</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Finish</text>
    </g>

    <!-- Feature 2: High Coverage / Durable -->
    <g transform="translate(600, 730)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.14)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="2"/>
      <!-- Shield checkmark -->
      <path d="M30 40 C30 60, 50 72, 50 72 C50 72, 70 60, 70 40 L50 28 Z" fill="none" stroke="#FFF" stroke-width="3.5"/>
      <path d="M40 50 L47 57 L62 42" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">High</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Coverage</text>
    </g>

    <!-- Feature 3: Best Value / Low Odour -->
    <g transform="translate(600, 880)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.14)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="2"/>
      <!-- Clean leaf icon (Identical to Card 1, 2, 3) -->
      <path d="M35 65 C35 38, 58 35, 65 35 C65 42, 62 65, 35 65 Z" fill="none" stroke="#FFF" stroke-width="3.5"/>
      <path d="M38 62 L55 45" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Best</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Value</text>
    </g>

    <!-- 12. BOTTOM PILL ACTION BUTTON: Explore Product -> (IDENTICAL TO CARDS 1, 2, 3) -->
    <g transform="translate(85, 1225)">
      <rect width="460" height="90" rx="45" fill="url(#btnGrad)" filter="url(#btnShadow)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="1.5"/>
      <text x="72" y="58" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="32" fill="#FFFFFF" letter-spacing="0.3">Explore Product</text>
      <!-- Modern Arrow -->
      <path d="M375 45 L358 32 L358 41 L338 41 L338 49 L358 49 L358 58 Z" fill="#FFFFFF"/>
    </g>
  </svg>
  `;

  // Extract clean can from user's upload or can-berger-bison / realistic can
  const canImg = await sharp('src/assets/can-berger-bison.png')
    .resize(470, 470, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svgBuf = Buffer.from(svg);

  await sharp(svgBuf)
    .composite([
      {
        input: canImg,
        left: 95,
        top: 650
      }
    ])
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('HD card 4 created successfully!');
}

makeEconomyHD().catch(console.error);


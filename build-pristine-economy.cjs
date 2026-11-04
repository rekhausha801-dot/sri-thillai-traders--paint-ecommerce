const sharp = require('sharp');
const fs = require('fs');

async function buildCleanBisonEconomyCard() {
  const width = 988;
  const height = 1408;

  // 1. High quality SVG backdrop with realistic studio architecture:
  // - Warm Terracotta/Amber wall with smooth studio lighting gradient
  // - Slatted wood accent panel on right (matching Cards 1, 2, 3)
  // - Hanging minimalist pendant lamp on right
  // - Clean ceramic floor & 3D cylindrical pedestal
  // - 100% crisp, sharp typography & badges (NO ghosting, NO brown blur band, NO overlapping text!)
  const svgBackdrop = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Smooth Wall Gradient -->
      <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#C58550"/>
        <stop offset="35%" stop-color="#AA6B37"/>
        <stop offset="70%" stop-color="#8F5324"/>
        <stop offset="100%" stop-color="#6F3910"/>
      </linearGradient>

      <!-- Floor Gradient -->
      <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#CBB199"/>
        <stop offset="50%" stop-color="#B2957C"/>
        <stop offset="100%" stop-color="#8E7259"/>
      </linearGradient>

      <!-- Pedestal Gradient -->
      <linearGradient id="pedestalTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#A56736"/>
        <stop offset="100%" stop-color="#7B4217"/>
      </linearGradient>
      <linearGradient id="pedestalSide" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#5E310F"/>
        <stop offset="100%" stop-color="#381B05"/>
      </linearGradient>

      <!-- Button Gradient -->
      <linearGradient id="btnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#8B4513"/>
        <stop offset="100%" stop-color="#652F08"/>
      </linearGradient>

      <!-- Shadows & Glows -->
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="10" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
      <filter id="pedestalShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000000" flood-opacity="0.45"/>
      </filter>
    </defs>

    <!-- 1. STUDIO WALL (100% Smooth Continuous Gradient, ZERO Lines, ZERO Seams) -->
    <rect width="${width}" height="1080" fill="url(#wallGradient)"/>

    <!-- 2. Architectural Wall Paneling Slats on Right (Matching Cards 1, 2, 3) -->
    <g opacity="0.32">
      <rect x="850" y="0" width="20" height="1080" fill="#241104"/>
      <rect x="886" y="0" width="20" height="1080" fill="#241104"/>
      <rect x="922" y="0" width="20" height="1080" fill="#241104"/>
      <rect x="958" y="0" width="20" height="1080" fill="#241104"/>
    </g>

    <!-- 3. Hanging Cone Pendant Lamp on Right (Matching Cards 1, 2) -->
    <line x1="904" y1="0" x2="904" y2="160" stroke="#1C0E05" stroke-width="4.5"/>
    <path d="M856 245 C856 170, 952 170, 952 245 Z" fill="#1C0E05"/>
    <ellipse cx="904" cy="245" rx="48" ry="14" fill="#FEF3C7" opacity="0.9" filter="url(#softGlow)"/>
    <polygon points="856,245 952,245 984,650 824,650" fill="#FEF3C7" opacity="0.08"/>

    <!-- 4. Potted Plant Foliage on Left (Matching Cards 1, 2, 3) -->
    <g opacity="0.45">
      <path d="M-15 480 Q 75 540, 100 660 Q 35 760, -15 800 Z" fill="#14532D"/>
      <path d="M-15 620 Q 110 700, 130 840 Q 50 940, -15 970 Z" fill="#166534"/>
      <path d="M-15 800 Q 80 870, 90 990 Q 30 1060, -15 1080 Z" fill="#14532D"/>
    </g>

    <!-- 5. Studio Floor Ground -->
    <rect y="1080" width="${width}" height="328" fill="url(#floorGradient)"/>

    <!-- 6. 3D Cylindrical Pedestal / Podium for Can (Matching Cards 1, 2, 3) -->
    <ellipse cx="320" cy="1135" rx="285" ry="72" fill="url(#pedestalTop)" filter="url(#pedestalShadow)"/>
    <rect x="35" y="1135" width="570" height="42" fill="url(#pedestalSide)"/>
    <ellipse cx="320" cy="1177" rx="285" ry="72" fill="#2E1403"/>

    <!-- 7. TOP PILL BADGE: Economy -->
    <g transform="translate(85, 75)">
      <rect width="250" height="68" rx="34" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.5)" stroke-width="2"/>
      <circle cx="40" cy="34" r="14" fill="none" stroke="#FFFFFF" stroke-width="3"/>
      <path d="M40 26 L40 42 M34 32 C34 28, 46 28, 46 33 C46 38, 34 37, 34 41 L46 41" stroke="#FFFFFF" stroke-width="2.2" fill="none"/>
      <text x="76" y="44" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" fill="#FFFFFF" letter-spacing="0.5">Economy</text>
    </g>

    <!-- 8. MAIN TITLE: Economy -->
    <text x="85" y="235" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="88" fill="#FFFFFF" letter-spacing="-1.5">Economy</text>

    <!-- 9. SUBTITLE -->
    <text x="85" y="298" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="32" fill="rgba(255, 255, 255, 0.95)">Budget-friendly beauty for</text>
    <text x="85" y="342" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="32" fill="rgba(255, 255, 255, 0.95)">brighter walls</text>

    <!-- 10. WARRANTY BADGE: 3 UP TO YEARS WARRANTY (100% Crisp & High Contrast) -->
    <g transform="translate(85, 415)">
      <circle cx="50" cy="50" r="44" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="2.5"/>
      <path d="M 33 34 C 33 54, 50 64, 50 64 C 50 64, 67 54, 67 34 L 50 24 Z" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>
      <path d="M 42 45 L 48 51 L 59 38" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      
      <text x="115" y="72" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="84" fill="#FFFFFF">3</text>
      
      <text x="180" y="38" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="19" fill="rgba(255, 255, 255, 0.9)" letter-spacing="1">UP TO</text>
      <text x="180" y="60" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="24" fill="#FFFFFF" letter-spacing="1">YEARS</text>
      <text x="180" y="80" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="rgba(255, 255, 255, 0.82)" letter-spacing="1.5">WARRANTY</text>
    </g>

    <!-- 11. THREE ROUND FEATURE ICONS ON RIGHT (Matching Cards 1, 2, 3) -->
    <!-- Feature 1: Smooth Finish -->
    <g transform="translate(595, 570)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.18)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2"/>
      <path d="M42 32 L46 44 L58 48 L46 52 L42 64 L38 52 L26 48 L38 44 Z" fill="#FFFFFF"/>
      <path d="M58 32 L60 38 L66 40 L60 42 L58 48 L56 42 L50 40 L56 38 Z" fill="#FFFFFF"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Smooth</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Finish</text>
    </g>

    <!-- Feature 2: Durable Protection -->
    <g transform="translate(595, 720)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.18)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2"/>
      <path d="M30 40 C30 60, 50 72, 50 72 C50 72, 70 60, 70 40 L50 28 Z" fill="none" stroke="#FFF" stroke-width="3.5"/>
      <path d="M40 50 L47 57 L62 42" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Durable</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Protection</text>
    </g>

    <!-- Feature 3: Best Value / Low VOC -->
    <g transform="translate(595, 870)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.18)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2"/>
      <path d="M35 65 C35 38, 58 35, 65 35 C65 42, 62 65, 35 65 Z" fill="none" stroke="#FFF" stroke-width="3.5"/>
      <path d="M38 62 L55 45" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Best</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Value</text>
    </g>

    <!-- 12. BOTTOM PILL BUTTON: Explore Product -> (Matching Cards 1, 2, 3) -->
    <g transform="translate(85, 1220)">
      <rect width="460" height="92" rx="46" fill="url(#btnGradient)" filter="url(#cardShadow)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="1.5"/>
      <text x="75" y="58" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="32" fill="#FFFFFF" letter-spacing="0.3">Explore Product</text>
      <path d="M375 46 L358 33 L358 42 L338 42 L338 50 L358 50 L358 59 Z" fill="#FFFFFF"/>
    </g>
  </svg>
  `;

  // 2. Load the transparent paint bucket (Berger Bison Acrylic Distemper Economy Can)
  // Clean, crisp, high-resolution transparent PNG
  const canBuffer = await sharp('src/assets/can-berger-bison.png')
    .resize(500, 500, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svgBuffer = Buffer.from(svgBackdrop);

  // 3. Composite the paint bucket onto the pedestal in the studio
  await sharp(svgBuffer)
    .composite([
      {
        input: canBuffer,
        left: 70,
        top: 670
      }
    ])
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('Successfully created the pristine Bison Economy Card 4 matching Cards 1, 2, 3!');
}

buildCleanBisonEconomyCard().catch(console.error);


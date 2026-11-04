const sharp = require('sharp');
const fs = require('fs');

async function createMatchingEconomy() {
  const width = 988;
  const height = 1408;

  const svgCard = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background wall gradient: warm golden earth / amber ochre -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#C27838"/>
        <stop offset="35%" stop-color="#A35B22"/>
        <stop offset="100%" stop-color="#6E350D"/>
      </linearGradient>

      <!-- Floor/ground gradient -->
      <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#7C3E10"/>
        <stop offset="100%" stop-color="#4A2207"/>
      </linearGradient>

      <!-- Pedestal base gradient -->
      <linearGradient id="podiumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#D98236"/>
        <stop offset="100%" stop-color="#8C4412"/>
      </linearGradient>

      <!-- Button gradient -->
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E89A4B"/>
        <stop offset="100%" stop-color="#B86018"/>
      </linearGradient>

      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000" flood-opacity="0.4"/>
      </filter>
    </defs>

    <!-- Wall background -->
    <rect width="${width}" height="1050" fill="url(#bgGrad)"/>

    <!-- Architectural wall flutes/slats on the right (matching Cards 1, 2, 3) -->
    <g opacity="0.25">
      <rect x="855" y="0" width="22" height="1000" fill="#000"/>
      <rect x="890" y="0" width="22" height="1000" fill="#000"/>
      <rect x="925" y="0" width="22" height="1000" fill="#000"/>
      <rect x="960" y="0" width="22" height="1000" fill="#000"/>
    </g>

    <!-- Hanging modern lamp on the right -->
    <line x1="900" y1="0" x2="900" y2="180" stroke="#261509" stroke-width="4"/>
    <path d="M860 270 C860 200, 940 200, 940 270 Z" fill="#1C1008"/>
    <ellipse cx="900" cy="270" rx="40" ry="12" fill="#FED7AA" opacity="0.9"/>

    <!-- Decorative houseplant leaf shadow on left (matching Cards 1, 2, 3) -->
    <path d="M0 450 Q 80 520, 120 650 Q 60 750, 0 800 Z" fill="#14532D" opacity="0.35"/>
    <path d="M0 600 Q 110 680, 140 820 Q 70 920, 0 960 Z" fill="#166534" opacity="0.4"/>

    <!-- Floor -->
    <rect y="1050" width="${width}" height="358" fill="url(#floorGrad)"/>

    <!-- Pedestal / Podium for Can -->
    <ellipse cx="340" cy="1130" rx="290" ry="75" fill="url(#podiumGrad)" filter="url(#shadow)"/>
    <rect x="50" y="1130" width="580" height="45" fill="#582305"/>
    <ellipse cx="340" cy="1175" rx="290" ry="75" fill="#3D1602"/>

    <!-- TOP PILL BADGE: Economy -->
    <g transform="translate(80, 75)">
      <rect width="240" height="64" rx="32" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="2"/>
      <circle cx="38" cy="32" r="14" fill="none" stroke="#FFF" stroke-width="3"/>
      <path d="M38 24 L38 40 M32 30 C32 26, 44 26, 44 32 C44 38, 32 36, 32 40 L44 40" stroke="#FFF" stroke-width="2.5" fill="none"/>
      <text x="74" y="42" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="27" fill="#FFFFFF" letter-spacing="0.5">Economy</text>
    </g>

    <!-- MAIN TITLE: Economy -->
    <text x="80" y="235" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="82" fill="#FFFFFF" letter-spacing="-1.5">Economy</text>

    <!-- SUBTITLE -->
    <text x="80" y="298" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="31" fill="rgba(255, 255, 255, 0.95)">Budget-friendly beauty for</text>
    <text x="80" y="340" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="31" fill="rgba(255, 255, 255, 0.95)">brighter walls</text>

    <!-- WARRANTY BADGE: 3 UP TO YEARS WARRANTY -->
    <g transform="translate(80, 420)">
      <path d="M20 22 C20 48, 48 70, 48 70 C48 70, 76 48, 76 22 L48 10 Z" fill="none" stroke="rgba(255, 255, 255, 0.88)" stroke-width="4"/>
      <path d="M34 38 L44 48 L62 30" fill="none" stroke="rgba(255, 255, 255, 0.88)" stroke-width="4" stroke-linecap="round"/>
      <text x="105" y="68" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="74" fill="#FFFFFF">3</text>
      <text x="165" y="38" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="20" fill="rgba(255, 255, 255, 0.82)" letter-spacing="1">UP TO</text>
      <text x="165" y="60" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="24" fill="#FFFFFF" letter-spacing="1">YEARS</text>
      <text x="165" y="80" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="rgba(255, 255, 255, 0.78)" letter-spacing="1.5">WARRANTY</text>
    </g>

    <!-- 3 FEATURE CIRCLES ON THE RIGHT (IDENTICAL TO CARDS 1, 2, 3) -->
    <!-- Feature 1: Smooth Finish -->
    <g transform="translate(605, 590)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.38)" stroke-width="2"/>
      <path d="M42 32 L46 44 L58 48 L46 52 L42 64 L38 52 L26 48 L38 44 Z" fill="#FFFFFF"/>
      <path d="M58 32 L60 38 L66 40 L60 42 L58 48 L56 42 L50 40 L56 38 Z" fill="#FFFFFF"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Smooth</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Finish</text>
    </g>

    <!-- Feature 2: High Coverage -->
    <g transform="translate(605, 740)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.38)" stroke-width="2"/>
      <path d="M30 40 C30 60, 50 72, 50 72 C50 72, 70 60, 70 40 L50 28 Z" fill="none" stroke="#FFF" stroke-width="3.5"/>
      <path d="M40 50 L47 57 L62 42" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">High</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Coverage</text>
    </g>

    <!-- Feature 3: Best Value -->
    <g transform="translate(605, 890)">
      <circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.38)" stroke-width="2"/>
      <path d="M36 64 C36 40, 60 36, 64 36 C64 40, 60 64, 36 64 Z" fill="none" stroke="#FFF" stroke-width="3.5"/>
      <path d="M40 60 L54 46" stroke="#FFF" stroke-width="3"/>
      <text x="125" y="46" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Best</text>
      <text x="125" y="76" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">Value</text>
    </g>

    <!-- BOTTOM PILL BUTTON: Explore Product -> (MATCHING CARDS 1, 2, 3) -->
    <g transform="translate(80, 1220)">
      <rect width="450" height="90" rx="45" fill="url(#btnGrad)" filter="url(#shadow)" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5"/>
      <text x="65" y="57" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="32" fill="#FFFFFF">Explore Product</text>
      <path d="M365 45 L350 33 L350 41 L330 41 L330 49 L350 49 L350 57 Z" fill="#FFFFFF"/>
    </g>
  </svg>
  `;

  const canBuffer = await sharp('src/assets/can-berger-bison.png')
    .resize(480, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svgBuffer = Buffer.from(svgCard);

  await sharp(svgBuffer)
    .composite([
      {
        input: canBuffer,
        left: 100,
        top: 670
      }
    ])
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('Economy card 4 created successfully!');
}

createMatchingEconomy().catch(console.error);


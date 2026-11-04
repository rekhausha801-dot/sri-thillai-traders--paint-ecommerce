const sharp = require('sharp');
const fs = require('fs');

const svg1 = `
<svg width="312" height="435" viewBox="0 0 312 435" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EBE9FC" />
      <stop offset="50%" stop-color="#DFDCF6" />
      <stop offset="100%" stop-color="#CFCCED" />
    </linearGradient>
    <linearGradient id="arch" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E3E0F8" />
      <stop offset="100%" stop-color="#D1CEEF" />
    </linearGradient>
    <linearGradient id="lampGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="100%" stop-color="#FDE68A" />
    </linearGradient>
  </defs>
  <rect width="312" height="435" fill="url(#bg1)" />
  <path d="M 12 435 L 12 135 A 132 132 0 0 1 276 135 L 276 435 Z" fill="url(#arch)" opacity="0.65" />
  <path d="M 22 435 L 22 142 A 122 122 0 0 1 266 142 L 266 435 Z" fill="url(#bg1)" opacity="0.85" />
  <line x1="298" y1="0" x2="298" y2="155" stroke="#C5C2E6" stroke-width="1.5" />
  <path d="M 284 155 Q 298 147 312 155 L 314 175 Q 298 178 282 175 Z" fill="#FFFFFF" />
  <ellipse cx="298" cy="175" rx="14" ry="4" fill="url(#lampGlow)" opacity="0.9" />
</svg>
`;

const svg2 = `
<svg width="324" height="435" viewBox="0 0 324 435" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E5164" />
      <stop offset="50%" stop-color="#093E4D" />
      <stop offset="100%" stop-color="#052833" />
    </linearGradient>
    <linearGradient id="slat" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0A3440" />
      <stop offset="50%" stop-color="#146074" />
      <stop offset="100%" stop-color="#0A3440" />
    </linearGradient>
    <radialGradient id="lampGlow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FED7AA" stop-opacity="1" />
      <stop offset="50%" stop-color="#F97316" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#F97316" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="324" height="435" fill="url(#bg2)" />
  <!-- Vertical Wall Slats on Right -->
  <rect x="200" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="214" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="228" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="242" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="256" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="270" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="284" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="298" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <rect x="312" y="0" width="8" height="435" fill="url(#slat)" opacity="0.8" />
  <!-- Pendant Lamp -->
  <line x1="222" y1="0" x2="222" y2="72" stroke="#1E293B" stroke-width="2" />
  <path d="M 206 72 L 238 72 L 246 116 L 198 116 Z" fill="#1E293B" />
  <circle cx="222" cy="116" r="28" fill="url(#lampGlow2)" />
</svg>
`;

const svg3 = `
<svg width="312" height="435" viewBox="0 0 312 435" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F7957" />
      <stop offset="50%" stop-color="#3D6345" />
      <stop offset="100%" stop-color="#2D4D34" />
    </linearGradient>
    <linearGradient id="molding" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#35573C" />
      <stop offset="50%" stop-color="#5A8763" />
      <stop offset="100%" stop-color="#35573C" />
    </linearGradient>
  </defs>
  <rect width="312" height="435" fill="url(#bg3)" />
  <!-- Vertical Wall Moldings on Right -->
  <rect x="235" y="0" width="10" height="435" fill="url(#molding)" opacity="0.75" />
  <rect x="252" y="0" width="10" height="435" fill="url(#molding)" opacity="0.75" />
  <rect x="269" y="0" width="10" height="435" fill="url(#molding)" opacity="0.75" />
  <rect x="286" y="0" width="10" height="435" fill="url(#molding)" opacity="0.75" />
  <rect x="303" y="0" width="10" height="435" fill="url(#molding)" opacity="0.75" />
</svg>
`;

async function buildPureBackdrops() {
  await sharp(Buffer.from(svg1)).png().toFile('f:/panit frontend/src/assets/pure-room-1.png');
  await sharp(Buffer.from(svg2)).png().toFile('f:/panit frontend/src/assets/pure-room-2.png');
  await sharp(Buffer.from(svg3)).png().toFile('f:/panit frontend/src/assets/pure-room-3.png');
  console.log('Pure room backgrounds created successfully!');
}

buildPureBackdrops();

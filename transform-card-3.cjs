const sharp = require('sharp');
const fs = require('fs');

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

async function transformCard3ToEconomy() {
  const { data, info } = await sharp('src/assets/featured-hd-card-3.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const out = Buffer.from(data);

  // Shift Green Hue (Card 3) to warm golden amber/chestnut (0.075):
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const [h, s, l] = rgbToHsl(r, g, b);

    // If it's a green hue (wall, floor, can accent, button)
    // Don't shift white text or pure neutrals
    if (s > 0.12 && h > 0.22 && h < 0.48) {
      const targetH = 0.075; // Warm Golden Amber
      const [newR, newG, newB] = hslToRgb(targetH, s * 0.96, l);
      out[i] = newR;
      out[i + 1] = newG;
      out[i + 2] = newB;
    }
  }

  // Get sample wall color behind title
  const sampleIdx = (200 * width + 300) * channels;
  const bgHex = `#${out[sampleIdx].toString(16).padStart(2,'0')}${out[sampleIdx+1].toString(16).padStart(2,'0')}${out[sampleIdx+2].toString(16).padStart(2,'0')}`;
  
  // Sample pill badge background
  const pillIdx = (110 * width + 200) * channels;
  const pillHex = `#${out[pillIdx].toString(16).padStart(2,'0')}${out[pillIdx+1].toString(16).padStart(2,'0')}${out[pillIdx+2].toString(16).padStart(2,'0')}`;

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. Top pill badge: overwrite 'Premium' with 'Economy' -->
    <rect x="75" y="70" width="290" height="82" rx="41" fill="${pillHex}" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <circle cx="120" cy="111" r="14" fill="none" stroke="#FFF" stroke-width="3"/>
    <path d="M120 102 L120 120 M113 109 C113 104, 127 104, 127 110 C127 116, 113 114, 113 119 L127 119" stroke="#FFF" stroke-width="2.5" fill="none"/>
    <text x="150" y="121" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="31" fill="#FFFFFF" letter-spacing="0.6">Economy</text>

    <!-- 2. Main Title: overwrite 'Premium' with 'Economy' -->
    <rect x="75" y="180" width="560" height="90" fill="${bgHex}"/>
    <text x="80" y="255" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="94" fill="#FFFFFF" letter-spacing="-1.5">Economy</text>

    <!-- 3. Warranty Badge: overwrite '6' with '3' -->
    <rect x="195" y="380" width="90" height="110" fill="${bgHex}"/>
    <text x="202" y="468" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="88" fill="#FFFFFF">3</text>

    <!-- 4. Can Label: overwrite 'aspire' with 'ECONOMY' -->
    <rect x="250" y="650" width="180" height="70" fill="#1C382F" rx="8"/>
    <text x="258" y="700" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="30" fill="#FFFFFF" letter-spacing="2">ECONOMY</text>
  </svg>
  `;

  const svgBuf = Buffer.from(svgOverlay);

  await sharp(out, { raw: { width, height, channels } })
    .composite([
      { input: svgBuf, left: 0, top: 0 }
    ])
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('Successfully created authentic 3D photorealistic Economy Card 4!');
}

transformCard3ToEconomy().catch(console.error);


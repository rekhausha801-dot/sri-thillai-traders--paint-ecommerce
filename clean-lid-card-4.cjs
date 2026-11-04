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

async function createPerfectEconomyCardClean() {
  // 1. Load raw original Card 3 image
  const { data, info } = await sharp('C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793355616224_8ca17033.jpg')
    .resize(988, 1408, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  // 2. Shift green tones to warm golden amber/chestnut:
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const [h, s, l] = rgbToHsl(r, g, b);
    if (s > 0.12 && h > 0.22 && h < 0.48) {
      const targetH = 0.075; // Warm Golden Amber
      const [newR, newG, newB] = hslToRgb(targetH, s * 0.96, l);
      out[i] = newR;
      out[i + 1] = newG;
      out[i + 2] = newB;
    }
  }

  // 3. CLEAN INPAINTING OF TEXT REGION ONLY (y: 60..530, x: 60..580):
  // Does NOT touch the paint can lid or bucket at all!
  for (let y = 60; y <= 530; y++) {
    const refIdx = (y * width + 640) * channels;
    const refR = out[refIdx];
    const refG = out[refIdx + 1];
    const refB = out[refIdx + 2];

    const leftRefIdx = (y * width + 55) * channels;
    const leftR = out[leftRefIdx];
    const leftG = out[leftRefIdx + 1];
    const leftB = out[leftRefIdx + 2];

    for (let x = 60; x <= 580; x++) {
      const factor = (x - 60) / (580 - 60);
      const idx = (y * width + x) * channels;
      out[idx] = Math.round(leftR + (refR - leftR) * factor);
      out[idx + 1] = Math.round(leftG + (refG - leftG) * factor);
      out[idx + 2] = Math.round(leftB + (refB - leftB) * factor);
    }
  }

  // 4. SVG with clean text, NO 'ECONOMY' TEXT ON THE BUCKET/LID!
  const svgClean = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Top Pill Badge: Economy -->
    <g transform="translate(85, 75)">
      <rect width="250" height="70" rx="35" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="2"/>
      <path d="M 36 35 C 36 27, 48 24, 52 35 C 52 44, 40 47, 36 35 Z" fill="none" stroke="#FFFFFF" stroke-width="3"/>
      <path d="M 38 37 L 50 33" stroke="#FFFFFF" stroke-width="2.5"/>
      <text x="76" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" fill="#FFFFFF" letter-spacing="0.5">Economy</text>
    </g>

    <!-- Main Title: Economy -->
    <text x="85" y="240" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="92" fill="#FFFFFF" letter-spacing="-1.5">Economy</text>

    <!-- Subtitle: Budget-friendly beauty for brighter walls -->
    <text x="85" y="306" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="33" fill="rgba(255, 255, 255, 0.95)">Budget-friendly beauty for</text>
    <text x="85" y="352" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="33" fill="rgba(255, 255, 255, 0.95)">brighter walls</text>

    <!-- Warranty Badge: 3 UP TO YEARS WARRANTY -->
    <g transform="translate(85, 420)">
      <circle cx="50" cy="50" r="44" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2"/>
      <path d="M 34 35 C 34 53, 50 63, 50 63 C 50 63, 66 53, 66 35 L 50 25 Z" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>
      <path d="M 42 45 L 48 51 L 59 38" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      
      <text x="115" y="72" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="82" fill="#FFFFFF">3</text>
      
      <text x="180" y="38" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="19" fill="rgba(255, 255, 255, 0.85)" letter-spacing="1">UP TO</text>
      <text x="180" y="60" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="24" fill="#FFFFFF" letter-spacing="1">YEARS</text>
      <text x="180" y="80" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="rgba(255, 255, 255, 0.8)" letter-spacing="1.5">WARRANTY</text>
    </g>
  </svg>
  `;

  const svgBuf = Buffer.from(svgClean);

  await sharp(out, { raw: { width, height, channels } })
    .composite([
      { input: svgBuf, left: 0, top: 0 }
    ])
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('Successfully removed the text/box from the paint can lid and rim!');
}

createPerfectEconomyCardClean().catch(console.error);


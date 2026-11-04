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

async function renderPhotorealisticEconomyCard() {
  const width = 988;
  const height = 1408;

  // 1. Load pristine Card 1 (Lavender 3D studio render)
  const { data: c1Data, info } = await sharp('C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793355626748_b87d3076.jpg')
    .resize(width, height, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const out = Buffer.from(c1Data);

  // 2. Rotate hue from Lavender (0.68..0.76) to Warm Amber Gold (0.08):
  for (let i = 0; i < out.length; i += channels) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];

    const [h, s, l] = rgbToHsl(r, g, b);

    // If it's a purple/lavender hue (wall, arch, sofa, button, can accent)
    // Keep white text and green plants untouched!
    if (s > 0.08 && h > 0.60 && h < 0.85) {
      const targetH = 0.08; // Warm Amber Gold
      // Give rich warm contrast
      const [newR, newG, newB] = hslToRgb(targetH, s * 0.95, l);
      out[i] = newR;
      out[i + 1] = newG;
      out[i + 2] = newB;
    }
  }

  // 3. SEAMLESS WALL CLONING FOR TEXT ONLY (x: 50..580, y: 50..530)
  // In Card 1, the wall at x=600..750 is completely empty and smooth with the 3D arch!
  // At each y from 50 to 530, we smoothly copy the wall gradient from x=580..720 over to x=50..550:
  for (let y = 50; y <= 530; y++) {
    // Reference pixel on the smooth arch wall at x=650
    const refIdx = (y * width + 650) * channels;
    const wr = out[refIdx];
    const wg = out[refIdx + 1];
    const wb = out[refIdx + 2];

    const leftIdx = (y * width + 50) * channels;
    const lr = out[leftIdx];
    const lg = out[leftIdx + 1];
    const lb = out[leftIdx + 2];

    for (let x = 50; x <= 560; x++) {
      const t = (x - 50) / (560 - 50);
      const idx = (y * width + x) * channels;
      out[idx] = Math.round(lr + (wr - lr) * t);
      out[idx + 1] = Math.round(lg + (wg - lg) * t);
      out[idx + 2] = Math.round(lb + (wb - lb) * t);
    }
  }

  // 4. Clean Can Label:
  // In Card 1, the can label says 'SUPER LUXURY' at y: 640..730, x: 220..420
  // Cleanly paint the can face in matching warm amber/gold:
  for (let y = 635; y <= 730; y++) {
    const canRefIdx = (y * width + 190) * channels;
    const cr = out[canRefIdx], cg = out[canRefIdx + 1], cb = out[canRefIdx + 2];
    for (let x = 210; x <= 430; x++) {
      const idx = (y * width + x) * channels;
      out[idx] = cr;
      out[idx + 1] = cg;
      out[idx + 2] = cb;
    }
  }

  // 5. Crisp vector text overlays matching Card 1 typography 100%:
  const svgOverlay = `
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

    <!-- Can Label: 'ECONOMY' -->
    <text x="245" y="700" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="38" fill="#FFFFFF" letter-spacing="2">ECONOMY</text>
  </svg>
  `;

  const svgBuf = Buffer.from(svgOverlay);

  await sharp(out, { raw: { width, height, channels } })
    .composite([
      { input: svgBuf, left: 0, top: 0 }
    ])
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('Photorealistic 3D Economy Card 4 rendered successfully!');
}

renderPhotorealisticEconomyCard().catch(console.error);


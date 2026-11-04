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

async function create100PercentSeamlessCard4() {
  const width = 988;
  const height = 1408;

  // 1. Start from original Card 3 image
  const { data: origData, info } = await sharp('C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793355616224_8ca17033.jpg')
    .resize(width, height, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const out = Buffer.from(origData);

  // 2. Perform 100% thorough color shift from green to warm golden amber/chestnut:
  for (let i = 0; i < out.length; i += channels) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];

    const [h, s, l] = rgbToHsl(r, g, b);
    if (s > 0.05 && h > 0.16 && h < 0.50) {
      const targetH = 0.075;
      const [newR, newG, newB] = hslToRgb(targetH, s * 0.95, l);
      out[i] = newR;
      out[i + 1] = newG;
      out[i + 2] = newB;
    }
  }

  // 3. ZERO SEAM: Fill the wall across ALL X up to the right-side wall slats (x=835)!
  // By continuing all the way to x=835, there is NO seam or boundary inside the open wall!
  // At each y from 0 to 650:
  for (let y = 0; y <= 650; y++) {
    // Reference pixel on the smooth wall at x=825
    const refIdx = (y * width + 825) * channels;
    const wr = out[refIdx];
    const wg = out[wallRefIdx = (y * width + 825) * channels + 1];
    const wb = out[wallRefIdx = (y * width + 825) * channels + 2];

    // Reference pixel at left wall x=20
    const leftIdx = (y * width + 20) * channels;
    const lr = out[leftIdx];
    const lg = out[leftIdx + 1];
    const lb = out[leftIdx + 2];

    // Smoothly interpolate across the ENTIRE width from x=0 to x=830:
    for (let x = 0; x <= 830; x++) {
      // Don't overwrite the paint can lid!
      // Paint can top rim is between x: 120..530, y: 660..720
      // So y <= 650 is completely above the can!
      const t = x / 830;
      const idx = (y * width + x) * channels;
      out[idx] = Math.round(lr + (wr - lr) * t);
      out[idx + 1] = Math.round(lg + (wg - lg) * t);
      out[idx + 2] = Math.round(lb + (wb - lb) * t);
    }
  }

  // Preserve the plant on the far left (y: 380..720, x: 0..120):
  for (let y = 380; y <= 720; y++) {
    for (let x = 0; x <= 120; x++) {
      const origIdx = (y * width + x) * channels;
      const r = origData[origIdx], g = origData[origIdx+1], b = origData[origIdx+2];
      // If plant pixel
      if (r < 95 && g > r && b < 95) {
        // Shift plant to terracotta bronze
        out[origIdx] = Math.round(r * 1.15);
        out[origIdx + 1] = Math.round(g * 0.95);
        out[origIdx + 2] = Math.round(b * 0.85);
      }
    }
  }

  // Preserve the circular badges on the right (x: 580..950, y: 640..1050):
  // (They are untouched since our wall loop stopped at y=650 and can is below y=660)

  // 4. Render clean vector typography with ZERO ghosting, perfectly positioned:
  const svgClean = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. Top Pill Badge: Economy -->
    <g transform="translate(85, 75)">
      <rect width="250" height="70" rx="35" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="2"/>
      <path d="M 36 35 C 36 27, 48 24, 52 35 C 52 44, 40 47, 36 35 Z" fill="none" stroke="#FFFFFF" stroke-width="3"/>
      <path d="M 38 37 L 50 33" stroke="#FFFFFF" stroke-width="2.5"/>
      <text x="76" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" fill="#FFFFFF" letter-spacing="0.5">Economy</text>
    </g>

    <!-- 2. Main Title: Economy -->
    <text x="85" y="240" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="92" fill="#FFFFFF" letter-spacing="-1.5">Economy</text>

    <!-- 3. Subtitle: Budget-friendly beauty for brighter walls -->
    <text x="85" y="306" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="33" fill="rgba(255, 255, 255, 0.95)">Budget-friendly beauty for</text>
    <text x="85" y="352" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="33" fill="rgba(255, 255, 255, 0.95)">brighter walls</text>

    <!-- 4. Warranty Badge: 3 UP TO YEARS WARRANTY -->
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

  console.log('Zero-seam full card created successfully!');
}

create100PercentSeamlessCard4().catch(console.error);


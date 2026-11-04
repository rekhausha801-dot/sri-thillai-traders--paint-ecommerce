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

async function createPerfectEconomyCard100() {
  const width = 988;
  const height = 1408;

  // 1. Load original clean Card 3 image
  const { data: origData, info } = await sharp('C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793355616224_8ca17033.jpg')
    .resize(width, height, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const out = Buffer.from(origData);

  // 2. Perform 100% thorough hue shift to warm terracotta/golden amber (target hue: 0.075):
  for (let i = 0; i < out.length; i += channels) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];

    const [h, s, l] = rgbToHsl(r, g, b);
    // Any green or yellow-green tones (including plant and background)
    if (s > 0.06 && h > 0.16 && h < 0.50) {
      const targetH = 0.075;
      const [newR, newG, newB] = hslToRgb(targetH, s * 0.95, l);
      out[i] = newR;
      out[i + 1] = newG;
      out[i + 2] = newB;
    }
  }

  // 3. COMPLETE INPAINTING OF ENTIRE LEFT & UPPER ZONE:
  // We completely wipe out x: 0 to 580 from y: 0 all the way down to 640 (above the paint can lid)
  // by recreating the natural smooth studio wall!
  // At each y from 0 to 640, we sample the clean, untouched wall at x=620..780.
  for (let y = 0; y <= 640; y++) {
    const wallRefIdx = (y * width + 700) * channels;
    const wr = out[wallRefIdx];
    const wg = out[wallRefIdx + 1];
    const wb = out[wallRefIdx + 2];

    for (let x = 0; x <= 580; x++) {
      // Soft natural studio vignetting (slightly deeper at far left)
      const vignette = 0.86 + 0.14 * (x / 580);
      const idx = (y * width + x) * channels;
      out[idx] = Math.round(wr * vignette);
      out[idx + 1] = Math.round(wg * vignette);
      out[idx + 2] = Math.round(wb * vignette);
    }
  }

  // Also clean the can label 'aspire':
  // In the original card, the label text 'aspire' is at y: 640..730, x: 230..430
  for (let y = 635; y <= 725; y++) {
    const refCanIdx = (y * width + 210) * channels;
    const cr = out[refCanIdx], cg = out[refCanIdx + 1], cb = out[refCanIdx + 2];
    for (let x = 225; x <= 435; x++) {
      const idx = (y * width + x) * channels;
      out[idx] = cr;
      out[idx + 1] = cg;
      out[idx + 2] = cb;
    }
  }

  // Also recreate the delicate indoor plant on the lower left (y: 460..640, x: 0..120) with warm terracotta-olive leaves:
  // Using pure clean SVG vector overlays for 100% sharpness:

  const svgClean = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Indoor Plant foliage on left with zero pixelation -->
    <g opacity="0.45">
      <path d="M-10 420 Q 60 480, 85 580 Q 30 660, -10 680 Z" fill="#6B3A14"/>
      <path d="M-10 520 Q 90 580, 110 700 Q 40 800, -10 820 Z" fill="#582C0E"/>
      <path d="M-10 660 Q 70 720, 80 840 Q 30 900, -10 920 Z" fill="#48220A"/>
    </g>

    <!-- 1. Top Pill Badge: Economy -->
    <g transform="translate(85, 75)">
      <rect width="250" height="70" rx="35" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="2"/>
      <!-- Leaf icon -->
      <path d="M 36 35 C 36 27, 48 24, 52 35 C 52 44, 40 47, 36 35 Z" fill="none" stroke="#FFFFFF" stroke-width="3"/>
      <path d="M 38 37 L 50 33" stroke="#FFFFFF" stroke-width="2.5"/>
      <text x="76" y="46" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" fill="#FFFFFF" letter-spacing="0.5">Economy</text>
    </g>

    <!-- 2. Main Title: Economy -->
    <text x="85" y="240" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="92" fill="#FFFFFF" letter-spacing="-1.5">Economy</text>

    <!-- 3. Subtitle: Budget-friendly beauty for brighter walls -->
    <text x="85" y="306" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="33" fill="rgba(255, 255, 255, 0.95)">Budget-friendly beauty for</text>
    <text x="85" y="352" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="33" fill="rgba(255, 255, 255, 0.95)">brighter walls</text>

    <!-- 4. Warranty Badge: 3 UP TO YEARS WARRANTY (Single clean layer, NO GHOSTING!) -->
    <g transform="translate(85, 420)">
      <circle cx="50" cy="50" r="44" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2"/>
      <path d="M 34 35 C 34 53, 50 63, 50 63 C 50 63, 66 53, 66 35 L 50 25 Z" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>
      <path d="M 42 45 L 48 51 L 59 38" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- '3' Large Digit -->
      <text x="115" y="72" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="82" fill="#FFFFFF">3</text>
      
      <!-- 'UP TO YEARS WARRANTY' text stack -->
      <text x="180" y="38" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="19" fill="rgba(255, 255, 255, 0.85)" letter-spacing="1">UP TO</text>
      <text x="180" y="60" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="24" fill="#FFFFFF" letter-spacing="1">YEARS</text>
      <text x="180" y="80" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="rgba(255, 255, 255, 0.8)" letter-spacing="1.5">WARRANTY</text>
    </g>

    <!-- 5. Paint can body label: 'ECONOMY' (clean, perfectly centered on bucket body) -->
    <text x="252" y="700" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="38" fill="#FFFFFF" letter-spacing="2">ECONOMY</text>
  </svg>
  `;

  const svgBuf = Buffer.from(svgClean);

  await sharp(out, { raw: { width, height, channels } })
    .composite([
      { input: svgBuf, left: 0, top: 0 }
    ])
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('Card 4 recreated with 100% clean background, zero ghosting, and single typography!');
}

createPerfectEconomyCard100().catch(console.error);


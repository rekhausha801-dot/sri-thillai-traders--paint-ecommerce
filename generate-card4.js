import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createEconomyCard() {
  const bgSvg = Buffer.from(`
    <svg width="318" height="430" viewBox="0 0 318 430" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="warmBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDEFE4" />
          <stop offset="50%" stop-color="#F8DEC8" />
          <stop offset="100%" stop-color="#ECC6AA" />
        </linearGradient>
        <linearGradient id="arch" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F5D7C2" />
          <stop offset="100%" stop-color="#E2B79A" />
        </linearGradient>
        <linearGradient id="podium" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFF2E7" />
          <stop offset="100%" stop-color="#E2BFA6" />
        </linearGradient>
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C25E2C" />
          <stop offset="100%" stop-color="#9E441B" />
        </linearGradient>
      </defs>
      
      <!-- Background with smooth corners -->
      <rect width="318" height="430" rx="22" fill="url(#warmBg)" />
      
      <!-- Architectural Soft Arch -->
      <path d="M 20 430 L 20 125 A 120 120 0 0 1 260 125 L 260 430 Z" fill="url(#arch)" opacity="0.6" />
      
      <!-- Wall Slats on Right -->
      <rect x="270" y="0" width="6" height="430" fill="#D39F7C" opacity="0.45" />
      <rect x="282" y="0" width="6" height="430" fill="#D39F7C" opacity="0.45" />
      <rect x="294" y="0" width="6" height="430" fill="#D39F7C" opacity="0.45" />
      <rect x="306" y="0" width="6" height="430" fill="#D39F7C" opacity="0.45" />

      <!-- Minimal Pendant Cord and Lamp -->
      <line x1="245" y1="0" x2="245" y2="70" stroke="#8A5C40" stroke-width="1.5" />
      <path d="M 235 70 L 255 70 L 260 85 L 230 85 Z" fill="#FFFFFF" />

      <!-- Top Badge Pill (Economy) -->
      <rect x="26" y="24" width="84" height="26" rx="13" fill="#C25E2C" />
      <text x="68" y="41.5" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF" text-anchor="middle">Economy</text>

      <!-- Title: Economy -->
      <text x="26" y="86" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="27" font-weight="800" fill="#2E1B10">Economy</text>

      <!-- Subtitle -->
      <text x="26" y="112" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#6E442C">Budget-friendly beauty with durable finish.</text>

      <!-- Circular Podium base -->
      <ellipse cx="159" cy="346" rx="115" ry="34" fill="#804E30" opacity="0.22" />
      <ellipse cx="159" cy="340" rx="110" ry="30" fill="url(#podium)" />
      <ellipse cx="159" cy="336" rx="102" ry="24" fill="#FFFFFF" opacity="0.75" />

      <!-- Bottom Button (Explore Product) -->
      <rect x="26" y="372" width="154" height="36" rx="18" fill="url(#btnGrad)" />
      <text x="88" y="394.5" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="600" fill="#FFFFFF" text-anchor="middle">Explore Product</text>
      <path d="M 148 390.5 L 158 390.5 M 154 386.5 L 158 390.5 L 154 394.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </svg>
  `);

  const canBuffer = await sharp(path.join(__dirname, 'src/assets/can-berger-bison.png'))
    .resize(190, 190, { fit: 'inside' })
    .toBuffer();

  await sharp(bgSvg)
    .composite([
      {
        input: canBuffer,
        top: 172,
        left: 64,
      }
    ])
    .png()
    .toFile(path.join(__dirname, 'src/assets/featured-card-latest-4.png'));

  console.log('featured-card-latest-4.png generated successfully!');
}

createEconomyCard().catch(console.error);

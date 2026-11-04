import sharp from 'sharp';

async function removePaintCanSeamless() {
  const width = 975;
  const height = 345;

  // 1. Take a slice from left side background (around x: 260 to 320, width 60)
  // 2. Take a slice from right side background (around x: 570 to 630, width 60)
  // 3. Or better: let's inspect the middle seam (x: 330 to 565)
  // Left side:
  // apcolite logo is x: 45 to 295, y: 80 to 160
  // 3 icons are at the bottom: y: 215 to 300, x: 45 to 295
  // Right side:
  // "Lotus Effect Technology For Interior Walls" is at x: 605 to 940, y: 70 to 220
  // Button is at x: 605 to 740, y: 250 to 290
  
  // Notice that between x: 300 and x: 600, it's just the deep dark navy gradient (#151b45)
  // Let's create an exact high quality background matching the banner's navy tone and blend smoothly!
  
  // Background SVG with accurate deep navy radial lighting and hex lines:
  const svgBackground = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#161c48" />
          <stop offset="50%" stop-color="#141a42" />
          <stop offset="100%" stop-color="#192050" />
        </linearGradient>
        <radialGradient id="centerGlow" cx="48%" cy="46%" r="40%">
          <stop offset="0%" stop-color="#1f2868" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#171e4d" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#141a42" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#centerGlow)" />
      <!-- Hexagon tech motifs -->
      <g stroke="rgba(255,255,255,0.07)" stroke-width="1.5" fill="none">
        <polygon points="480,50 520,73 520,119 480,142 440,119 440,73" />
        <polygon points="560,96 600,119 600,165 560,188 520,165 520,119" />
        <polygon points="400,96 440,119 440,165 400,188 360,165 360,119" />
        <polygon points="480,142 520,165 520,211 480,234 440,211 440,165" />
        <polygon points="560,188 600,211 600,257 560,280 520,257 520,211" />
      </g>
    </svg>
  `);

  // To make left and right edges blend seamlessly into the background:
  // Apply a subtle fade/feather on the inner edges
  const leftMeta = await sharp('src/assets/banner-left-features.png').metadata();
  const rightMeta = await sharp('src/assets/banner-right-text.png').metadata();

  // Create left mask with gradient fade on right edge (width 330)
  const leftMaskSvg = Buffer.from(`
    <svg width="${leftMeta.width}" height="${leftMeta.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fff" />
          <stop offset="85%" stop-color="#fff" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fade)" />
    </svg>
  `);

  const featheredLeft = await sharp('src/assets/banner-left-features.png')
    .ensureAlpha()
    .composite([{
      input: await sharp(leftMaskSvg).toBuffer(),
      blend: 'dest-in'
    }])
    .toBuffer();

  // Create right mask with gradient fade on left edge (width 410)
  const rightMaskSvg = Buffer.from(`
    <svg width="${rightMeta.width}" height="${rightMeta.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fadeR" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#000" />
          <stop offset="15%" stop-color="#fff" />
          <stop offset="100%" stop-color="#fff" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fadeR)" />
    </svg>
  `);

  const featheredRight = await sharp('src/assets/banner-right-text.png')
    .ensureAlpha()
    .composite([{
      input: await sharp(rightMaskSvg).toBuffer(),
      blend: 'dest-in'
    }])
    .toBuffer();

  await sharp(svgBackground)
    .composite([
      { input: featheredLeft, left: 0, top: 0 },
      { input: featheredRight, left: 565, top: 0 }
    ])
    .toFile('src/assets/apcolite-banner-clean-no-can.png');

  console.log('Created seamless apcolite-banner-clean-no-can.png');
}

removePaintCanSeamless().catch(console.error);

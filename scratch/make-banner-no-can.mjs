import sharp from 'sharp';

async function removePaintCan() {
  const width = 975;
  const height = 345;

  const svgBackground = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="30%" x2="100%" y2="70%">
          <stop offset="0%" stop-color="#181c47" />
          <stop offset="40%" stop-color="#161b45" />
          <stop offset="70%" stop-color="#1c2255" />
          <stop offset="100%" stop-color="#191e4a" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#232b6e" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#161b45" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#glow)" />
      <polygon points="500,60 540,83 540,129 500,152 460,129 460,83" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
      <polygon points="580,106 620,129 620,175 580,198 540,175 540,129" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" />
      <polygon points="420,106 460,129 460,175 420,198 380,175 380,129" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" />
      <polygon points="500,152 540,175 540,221 500,244 460,221 460,175" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" />
    </svg>
  `);

  await sharp(svgBackground)
    .composite([
      { input: 'src/assets/banner-left-features.png', left: 0, top: 0 },
      { input: 'src/assets/banner-right-text.png', left: 565, top: 0 }
    ])
    .toFile('src/assets/apcolite-banner-clean-no-can.png');

  console.log('Successfully created src/assets/apcolite-banner-clean-no-can.png');
}

removePaintCan().catch(console.error);

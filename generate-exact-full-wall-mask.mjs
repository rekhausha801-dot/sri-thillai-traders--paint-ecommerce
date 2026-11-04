import sharp from 'sharp';

async function generateExactFullWallMask() {
  const width = 1200;
  const height = 1145;

  // The user highlighted the full wall area in pink:
  // Left: x = 96 (starts right where the side architectural frame / cove light begins)
  // Right: x = 1196 (all the way across to the right wall border)
  // Top: y = 162 (starts right at the ceiling recessed line / ceiling beam)
  // Bottom: y = 896 (all the way down to the floor skirting board line)
  //
  // Soft 1.5px blur on the boundary creates flawless blend with room lighting
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="wallGlow" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="transparent" />
    <g filter="url(#wallGlow)" fill="#FFFFFF">
      <rect x="96" y="160" width="1100" height="736" rx="2" />
    </g>
  </svg>`;

  const maskBuf = await sharp(Buffer.from(svg)).png().toBuffer();

  await sharp(maskBuf)
    .toFile('src/assets/visualizer-living-room-mask-hd.png');

  console.log('Successfully created exact full wall mask matching user request!');
}

generateExactFullWallMask().catch(console.error);

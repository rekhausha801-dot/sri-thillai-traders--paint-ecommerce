import sharp from 'sharp';

async function buildFullWallMask() {
  const width = 1200;
  const height = 1145;

  // The wall spans:
  // Left: x = 145 (starts right where the vertical wooden slat lights end and the flat wall begins)
  // Right: x = 1195 (all the way to the right wall corner)
  // Top: y = 175 (the bottom border of the recessed ceiling cove light)
  // Bottom: y = 880 (the top of the white skirting / baseboard at the marble floor)
  //
  // A subtle SVG blur on the perimeter creates natural soft lighting integration.
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="wallBlur" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="transparent" />
    <g filter="url(#wallBlur)" fill="#FFFFFF">
      <rect x="142" y="172" width="1056" height="710" rx="4" />
    </g>
  </svg>`;

  const maskBuf = await sharp(Buffer.from(svg)).png().toBuffer();

  await sharp(maskBuf)
    .toFile('src/assets/visualizer-living-room-mask-hd.png');

  console.log('Successfully created 100% full wall mask: src/assets/visualizer-living-room-mask-hd.png');
}

buildFullWallMask().catch(console.error);

import sharp from 'sharp';

async function makeMask() {
  const svg = `<svg width="1200" height="896" viewBox="0 0 1200 896" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="blur" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>
    <rect width="1200" height="896" fill="transparent" />
    <g filter="url(#blur)" fill="#FFFFFF">
      <polygon points="295,155 1060,155 1060,535 410,535 410,530 295,300" />
    </g>
  </svg>`;

  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const { data, info } = await sharp('f:/panit frontend/src/assets/visualizer-living-room.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const maskImg = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const finalRgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];

      const isPlant = (x >= 280 && x <= 510 && y >= 300 && y <= 660 && (g > r + 5 || (g > 65 && r < 130 && b < 100)));
      const isLamp = (x >= 1010 && x <= 1065 && y >= 410);
      const maskVal = maskImg.data[i * maskImg.info.channels + (maskImg.info.channels - 1)];

      finalRgba[i * 4] = 255;
      finalRgba[i * 4 + 1] = 255;
      finalRgba[i * 4 + 2] = 255;
      finalRgba[i * 4 + 3] = (isPlant || isLamp) ? 0 : maskVal;
    }
  }

  await sharp(finalRgba, { raw: { width, height, channels: 4 } })
    .blur(1.5)
    .png()
    .toFile('f:/panit frontend/src/assets/visualizer-living-room-mask.png');

  console.log('Living room wall mask perfected!');
}

makeMask().catch(console.error);

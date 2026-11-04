import sharp from 'sharp';

async function makePerfectFullMask() {
  const { data, info } = await sharp('f:/panit frontend/src/assets/visualizer-living-room.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const mask = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const outIdx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      mask[outIdx] = 255;
      mask[outIdx + 1] = 255;
      mask[outIdx + 2] = 255;
      mask[outIdx + 3] = 0;

      // 1. CEILING LINE EXCLUSION (y < 148)
      if (y < 148) continue;

      // 2. WINDOW & CURTAIN EXCLUSION ON LEFT (x < 265)
      if (x < 265) continue;

      // 3. GREEN FIDDLE-LEAF PLANT EXCLUSION:
      // Plant bounding area x: 265 to 505, y: 290 to 660
      const isGreenPlant = (x >= 265 && x <= 505 && y >= 290 && y <= 660 && (g > r + 5 || (g > 65 && r < 130 && b < 100)));
      if (isGreenPlant) continue;
      // Plant stem & pot (x: 340 to 425, y: 500 to 700)
      if (x >= 340 && x <= 425 && y >= 500 && y <= 700) continue;

      // 4. SOFA EXCLUSION:
      // The sofa backrest and cushions start at y >= 544 across x: 405 to 1055
      if (y >= 544 && x >= 405 && x <= 1055) continue;

      // Dark green pillow top (x: 810 to 960, y >= 520)
      if (x >= 810 && x <= 960 && y >= 520) continue;

      // White throw pillow top (x: 540 to 675, y >= 522)
      if (x >= 540 && x <= 675 && y >= 522) continue;

      // 5. WOODEN FLOATING SHELF EXCLUSION ON FAR RIGHT:
      // Shelf is at x >= 1075, y >= 575 to 640
      if (x >= 1075 && y >= 575 && y <= 640 && r > b + 25) continue;

      // 6. FLOOR EXCLUSION (y > 760)
      if (y > 760) continue;

      // 7. EVERYTHING ELSE IS THE FULL WALL (up to y=544 behind sofa, and down to floor at right side x > 1055)
      // Solid 100% full wall paint coverage!
      mask[outIdx + 3] = 255;
    }
  }

  await sharp(mask, { raw: { width, height, channels: 4 } })
    .blur(1.2)
    .png()
    .toFile('f:/panit frontend/src/assets/visualizer-living-room-mask.png');

  console.log('Living room 100% full wall mask created successfully!');
}

makePerfectFullMask().catch(console.error);

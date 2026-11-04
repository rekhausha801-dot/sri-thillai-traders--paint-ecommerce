import sharp from 'sharp';

async function makeCardsUltraBright() {
  const src = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793268321136_707cca7e.png';

  const cards = [
    { id: 1, left: 0, width: 148 },
    { id: 2, left: 151, width: 146 },
    { id: 3, left: 301, width: 149 },
    { id: 4, left: 453, width: 147 },
  ];

  for (const c of cards) {
    let img = sharp(src).extract({ left: c.left, top: 0, width: c.width, height: 313 });
    const rawCard = await img.raw().toBuffer({ resolveWithObject: true });
    const { data, info } = rawCard;

    // Clean Edit badge in Card 1 corner
    if (c.id === 1) {
      for (let y = 265; y < info.height; y++) {
        for (let x = 0; x < 48; x++) {
          const distToCenter = Math.hypot(x - 20, y - 295);
          if (distToCenter < 24) {
            const mirrorX = Math.min(info.width - 1, Math.max(0, info.width - 1 - x));
            const srcIdx = (y * info.width + mirrorX) * info.channels;
            const destIdx = (y * info.width + x) * info.channels;
            data[destIdx] = data[srcIdx];
            data[destIdx + 1] = data[srcIdx + 1];
            data[destIdx + 2] = data[srcIdx + 2];
            data[destIdx + 3] = data[srcIdx + 3];
          }
        }
      }
    }

    // Process with CLAHE adaptive contrast (maxSlope: 3) + brightness boost + crisp unsharp mask
    await sharp(data, { raw: info })
      .resize({ width: 494, height: 704, fit: 'fill', kernel: 'lanczos3' })
      .clahe({ width: 25, height: 25, maxSlope: 3 })
      .modulate({
        brightness: 1.15,
        saturation: 1.12
      })
      .linear(1.08, -4)
      .sharpen({
        sigma: 1.3,
        m1: 1.3,
        m2: 2.6
      })
      .png()
      .toFile(`src/assets/featured-card-latest-${c.id}.png`);

    console.log(`Saved ultra-bright Card ${c.id}`);
  }
}

makeCardsUltraBright();

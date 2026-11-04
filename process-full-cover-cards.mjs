import sharp from 'sharp';

async function processCards() {
  const src = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793268321136_707cca7e.png';

  const cards = [
    { id: 1, left: 0, width: 148 },
    { id: 2, left: 151, width: 146 },
    { id: 3, left: 301, width: 149 },
    { id: 4, left: 453, width: 147 },
  ];

  for (const c of cards) {
    // 1. Extract the full authentic card from top (y:0) to bottom (y:313)
    // NO cutting, NO artificial extension bars, 100% full cover original gradient!
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

    // 2. High-precision upscale to 494x704 with Lanczos3
    // Boost brightness and contrast for crystal clear text, bright can, and punchy colors
    await sharp(data, { raw: info })
      .resize({ width: 494, height: 704, fit: 'fill', kernel: 'lanczos3' })
      .modulate({
        brightness: 1.08,
        saturation: 1.12
      })
      .linear(1.10, -6)
      .sharpen({
        sigma: 1.3,
        m1: 1.4,
        m2: 2.8
      })
      .png()
      .toFile(`src/assets/featured-card-latest-${c.id}.png`);

    console.log(`Saved pristine full cover Card ${c.id}`);
  }
}

processCards();


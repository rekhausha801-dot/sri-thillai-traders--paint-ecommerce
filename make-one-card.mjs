import sharp from 'sharp';

async function makeOneSeamlessCards() {
  const src = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793268321136_707cca7e.png';

  const cards = [
    { id: 1, left: 0, width: 148, topColor: { r: 1, g: 51, b: 89, alpha: 1 } },
    { id: 2, left: 151, width: 146, topColor: { r: 0, g: 60, b: 52, alpha: 1 } },
    { id: 3, left: 301, width: 149, topColor: { r: 149, g: 85, b: 5, alpha: 1 } },
    { id: 4, left: 453, width: 147, topColor: { r: 93, g: 12, b: 122, alpha: 1 } },
  ];

  for (const c of cards) {
    // 1. Extract the full card directly from 707cca7e (y: 0 to 313)
    let cardImg = sharp(src).extract({ left: c.left, top: 0, width: c.width, height: 313 });
    const rawCard = await cardImg.raw().toBuffer({ resolveWithObject: true });
    const { data, info } = rawCard;

    // In card 1, inpaint the small Edit circle badge in the corner
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

    // 2. Extend the top by 22 pixels with the exact matching top color/gradient of that card
    // So that when displayed inside rounded corners, the letters have breathing space and are 100% visible
    const extendedBuffer = await sharp(data, { raw: info })
      .extend({
        top: 22,
        bottom: 0,
        left: 0,
        right: 0,
        background: c.topColor
      })
      .resize({ width: 494, height: 704, fit: 'fill', kernel: 'lanczos3' })
      .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.0 })
      .png()
      .toFile(`src/assets/featured-card-latest-${c.id}.png`);

    console.log(`Saved completely seamless 1 card for Card ${c.id}`);
  }
}

makeOneSeamlessCards();


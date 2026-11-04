import sharp from 'sharp';

async function combineHeaderAndBody() {
  const headerSrc = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793269567599_a2ef3f6d.png';
  const bodySrc = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793268321136_707cca7e.png';

  const cards = [
    {
      id: 1,
      headerLeft: 0,
      headerWidth: 250,
      bodyLeft: 0,
      bodyWidth: 148
    },
    {
      id: 2,
      headerLeft: 258,
      headerWidth: 250,
      bodyLeft: 151,
      bodyWidth: 146
    },
    {
      id: 3,
      headerLeft: 516,
      headerWidth: 250,
      bodyLeft: 301,
      bodyWidth: 149
    },
    {
      id: 4,
      headerLeft: 774,
      headerWidth: 250,
      bodyLeft: 453,
      bodyWidth: 147
    }
  ];

  for (const c of cards) {
    // 1. Header (Super Luxury / Luxury / Premium / Economy + LIME BASED PAINTS)
    // Extract from headerSrc (height 76) and resize to width 494, height 170
    const headerBuffer = await sharp(headerSrc)
      .extract({ left: c.headerLeft, top: 0, width: c.headerWidth, height: 74 })
      .resize({ width: 494, height: 170, fit: 'fill', kernel: 'lanczos3' })
      .png()
      .toBuffer();

    // 2. Lower body (Shop Now -> button + paint bucket + marble podium)
    // In bodySrc, button starts around y: 85 and goes down to 313 (height: 228)
    let bodyImg = sharp(bodySrc).extract({ left: c.bodyLeft, top: 85, width: c.bodyWidth, height: 228 });
    const rawCard = await bodyImg.raw().toBuffer({ resolveWithObject: true });
    const { data, info } = rawCard;

    // In card 1, inpaint Edit badge
    if (c.id === 1) {
      for (let y = 175; y < info.height; y++) {
        for (let x = 0; x < 48; x++) {
          const distToCenter = Math.hypot(x - 20, y - 210);
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

    const bodyBuffer = await sharp(data, { raw: info })
      .resize({ width: 494, height: 534, fit: 'fill', kernel: 'lanczos3' })
      .png()
      .toBuffer();

    // 3. Seamlessly stack Header (top: 0, height: 170) and Body (top: 170, height: 534)
    // Total height = 704, total width = 494
    await sharp({
      create: {
        width: 494,
        height: 704,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      }
    })
      .composite([
        { input: headerBuffer, top: 0, left: 0 },
        { input: bodyBuffer, top: 170, left: 0 }
      ])
      .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.0 })
      .png()
      .toFile(`src/assets/featured-card-latest-${c.id}.png`);

    console.log(`Card ${c.id} generated perfectly`);
  }
}

combineHeaderAndBody();


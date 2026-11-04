import sharp from 'sharp';
import fs from 'fs';

async function generateFullCards() {
  const src = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793268321136_707cca7e.png';

  const cardDefs = [
    {
      id: 1,
      left: 0,
      width: 148,
      bgColorTop: '#072448',
      titleSvg: '<text x="247" y="88" text-anchor="middle" font-family="Times New Roman, Times, Georgia, serif" font-size="44" font-weight="bold" fill="#FFFFFF">Super <tspan fill="#E5B95F">Luxury</tspan></text>',
      subColor: 'rgba(255, 255, 255, 0.88)'
    },
    {
      id: 2,
      left: 151,
      width: 146,
      bgColorTop: '#01382C',
      titleSvg: '<text x="247" y="88" text-anchor="middle" font-family="Times New Roman, Times, Georgia, serif" font-size="48" font-weight="bold" fill="#FFFFFF">Luxury</text>',
      subColor: 'rgba(255, 255, 255, 0.88)'
    },
    {
      id: 3,
      left: 301,
      width: 149,
      bgColorTop: '#7D4507',
      titleSvg: '<text x="247" y="88" text-anchor="middle" font-family="Times New Roman, Times, Georgia, serif" font-size="48" font-weight="bold" fill="#E5B95F">Premium</text>',
      subColor: 'rgba(255, 255, 255, 0.88)'
    },
    {
      id: 4,
      left: 453,
      width: 147,
      bgColorTop: '#3D0D5B',
      titleSvg: '<text x="247" y="88" text-anchor="middle" font-family="Times New Roman, Times, Georgia, serif" font-size="48" font-weight="bold" fill="#E5B95F">Economy</text>',
      subColor: 'rgba(255, 255, 255, 0.88)'
    }
  ];

  for (const c of cardDefs) {
    // 1. Extract lower content (button + can + podium): from y: 55 to bottom (height: 258)
    let lowerImg = sharp(src).extract({ left: c.left, top: 55, width: c.width, height: 258 });
    const rawCard = await lowerImg.raw().toBuffer({ resolveWithObject: true });
    const { data, info } = rawCard;

    // Clean Edit badge on card 1
    if (c.id === 1) {
      for (let y = 205; y < info.height; y++) {
        for (let x = 0; x < 48; x++) {
          const distToCenter = Math.hypot(x - 20, y - 240);
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

    // Resize lower section to fill 494 x 554 with clean PNG output
    const lowerResized = await sharp(data, { raw: info })
      .resize({ width: 494, height: 554, fit: 'fill', kernel: 'lanczos3' })
      .png()
      .toBuffer();

    // 2. Create the SVG header
    const svgHeader = `
      <svg width="494" height="704" xmlns="http://www.w3.org/2000/svg">
        <rect width="494" height="704" fill="${c.bgColorTop}" />
        ${c.titleSvg}
        <text x="247" y="126" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="${c.subColor}">
          LIME BASED PAINTS
        </text>
      </svg>
    `.trim();

    const svgPng = await sharp(Buffer.from(svgHeader)).png().toBuffer();

    // 3. Composite lower section on top of the background
    await sharp(svgPng)
      .composite([
        {
          input: lowerResized,
          top: 150,
          left: 0
        }
      ])
      .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.0 })
      .png()
      .toFile(`src/assets/featured-card-latest-${c.id}.png`);

    console.log(`Saved pristine full card ${c.id}`);
  }
}

generateFullCards();

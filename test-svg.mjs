import sharp from 'sharp';

async function testComposite() {
  const src = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793268321136_707cca7e.png';
  let lowerImg = sharp(src).extract({ left: 0, top: 55, width: 148, height: 258 });
  const rawCard = await lowerImg.raw().toBuffer({ resolveWithObject: true });
  const { data, info } = rawCard;
  
  const lowerResized = await sharp(data, { raw: info })
    .resize({ width: 494, height: 554, fit: 'fill', kernel: 'lanczos3' })
    .png()
    .toBuffer();

  const c = {
    bgColorTop: '#072448',
    titleSvg: '<text x="247" y="85" text-anchor="middle" font-family="Times New Roman, Times, serif" font-size="44" font-weight="bold" fill="#FFFFFF">Super <tspan fill="#E5B95F">Luxury</tspan></text>',
    subColor: 'rgba(255, 255, 255, 0.85)'
  };
  const svgHeader = `
    <svg width="494" height="704" xmlns="http://www.w3.org/2000/svg">
      <rect width="494" height="704" fill="${c.bgColorTop}" />
      ${c.titleSvg}
      <text x="247" y="125" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="${c.subColor}">
        LIME BASED PAINTS
      </text>
    </svg>
  `.trim();

  const svgPng = await sharp(Buffer.from(svgHeader)).png().toBuffer();

  try {
    const finalBuffer = await sharp(svgPng)
      .composite([
        {
          input: lowerResized,
          top: 150,
          left: 0
        }
      ])
      .png()
      .toFile('src/assets/test-full-1.png');
    console.log('Success finalComposite!');
  } catch(e) {
    console.log('Error composite:', e);
  }
}
testComposite();

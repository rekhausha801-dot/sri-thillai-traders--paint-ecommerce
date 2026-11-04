import sharp from 'sharp';

async function enhanceClarity() {
  const cards = [
    {
      id: 1,
      name: 'Super Luxury',
      accentColor: '#10528B',
      headerSvg: `
        <text x="247" y="112" text-anchor="middle" font-family="'Times New Roman', Georgia, serif" font-size="44" font-weight="bold" fill="#FFFFFF">
          Super <tspan fill="#E5B95F">Luxury</tspan>
        </text>
        <text x="247" y="148" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="rgba(255, 255, 255, 0.90)">
          LIME BASED PAINTS
        </text>
      `
    },
    {
      id: 2,
      name: 'Luxury',
      accentColor: '#00624E',
      headerSvg: `
        <text x="247" y="112" text-anchor="middle" font-family="'Times New Roman', Georgia, serif" font-size="46" font-weight="bold" fill="#FFFFFF">
          Luxury
        </text>
        <text x="247" y="148" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="rgba(255, 255, 255, 0.90)">
          LIME BASED PAINTS
        </text>
      `
    },
    {
      id: 3,
      name: 'Premium',
      accentColor: '#B2620A',
      headerSvg: `
        <text x="247" y="112" text-anchor="middle" font-family="'Times New Roman', Georgia, serif" font-size="46" font-weight="bold" fill="#E5B95F">
          Premium
        </text>
        <text x="247" y="148" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="rgba(255, 255, 255, 0.90)">
          LIME BASED PAINTS
        </text>
      `
    },
    {
      id: 4,
      name: 'Economy',
      accentColor: '#7917A0',
      headerSvg: `
        <text x="247" y="112" text-anchor="middle" font-family="'Times New Roman', Georgia, serif" font-size="46" font-weight="bold" fill="#E5B95F">
          Economy
        </text>
        <text x="247" y="148" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="rgba(255, 255, 255, 0.90)">
          LIME BASED PAINTS
        </text>
      `
    }
  ];

  for (const c of cards) {
    const inputPath = `src/assets/featured-card-latest-${c.id}.png`;

    // High clarity overlay SVG for Header, Button text, and Paint Bucket Label
    const overlaySvg = Buffer.from(`
      <svg width="494" height="704" xmlns="http://www.w3.org/2000/svg">
        <!-- Crisp Top Header -->
        ${c.headerSvg}

        <!-- Crisp Shop Now -> Button Text -->
        <text x="240" y="248" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#1A1A1A">
          Shop Now &#8594;
        </text>

        <!-- Crisp Paint Bucket Label Text -->
        <!-- Center of label is x: 227, y: 504 -->
        <text x="227" y="495" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="900" letter-spacing="1.5" fill="${c.accentColor}">
          LIME BASED
        </text>
        <text x="227" y="515" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="900" letter-spacing="1.5" fill="${c.accentColor}">
          PAINTS
        </text>
        <text x="227" y="534" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="700" letter-spacing="0.8" fill="#555555">
          PREMIUM QUALITY
        </text>
        <text x="227" y="546" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="700" letter-spacing="0.8" fill="#555555">
          FOR LASTING BEAUTY
        </text>
      </svg>
    `);

    // Composite ultra-crisp overlay directly on top of the card
    await sharp(inputPath)
      .composite([
        {
          input: overlaySvg,
          top: 0,
          left: 0
        }
      ])
      .png()
      .toFile(`src/assets/featured-card-latest-${c.id}-sharp.png`);

    // Replace original file with the crystal clear version
    const finalBuf = await sharp(`src/assets/featured-card-latest-${c.id}-sharp.png`)
      .toBuffer();
    
    await sharp(finalBuf).toFile(inputPath);
    console.log(`Successfully sharpened and rendered ultra-clear text for Card ${c.id}`);
  }
}

enhanceClarity();

import sharp from 'sharp';

async function brightenRemainingCards() {
  const cards = [
    { id: 2, brightness: 1.40, saturation: 1.15 },
    { id: 3, brightness: 1.40, saturation: 1.15 },
    { id: 4, brightness: 1.40, saturation: 1.15 }
  ];

  for (const c of cards) {
    const inputPath = `src/assets/featured-card-latest-${c.id}.png`;
    const tempPath = `src/assets/featured-card-latest-${c.id}-bright.png`;

    await sharp(inputPath)
      .modulate({
        brightness: c.brightness,
        saturation: c.saturation
      })
      .linear(1.06, -3)
      .sharpen({
        sigma: 1.2,
        m1: 1.2,
        m2: 2.2
      })
      .png()
      .toFile(tempPath);

    // Replace the card asset with the brightened version
    const buf = await sharp(tempPath).toBuffer();
    await sharp(buf).toFile(inputPath);

    console.log(`Successfully brightened Card ${c.id} to match Card 1 luminosity`);
  }
}

brightenRemainingCards();


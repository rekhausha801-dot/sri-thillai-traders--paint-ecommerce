import sharp from 'sharp';

async function restorePremiumMasterCards() {
  const src = 'C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.user_uploaded/media_1793266516292_7f10e364.png';

  const cards = [
    { id: 1, left: 1, width: 247, title: 'Super Luxury' },
    { id: 2, left: 257, width: 247, title: 'Luxury' },
    { id: 3, left: 515, width: 247, title: 'Premium' },
    { id: 4, left: 772, width: 247, title: 'Economy' },
  ];

  for (const c of cards) {
    // Extract exact crop directly from approved master reference
    // Resize with Lanczos3 high-resolution sampling
    // Natural contrast and color vibrancy - 100% authentic premium look
    await sharp(src)
      .extract({ left: c.left, top: 0, width: c.width, height: 352 })
      .resize({ width: 494, height: 704, fit: 'fill', kernel: 'lanczos3' })
      .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.0 })
      .png()
      .toFile(`src/assets/featured-card-latest-${c.id}.png`);

    console.log(`Saved pristine authentic Card ${c.id} (${c.title})`);
  }
}

restorePremiumMasterCards();


import sharp from 'sharp';

async function makeExteriorMask() {
  const { data, info } = await sharp('f:/panit frontend/src/assets/featured-exterior-house.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const mask = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const outIdx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];

      mask[outIdx] = 255;
      mask[outIdx+1] = 255;
      mask[outIdx+2] = 255;
      mask[outIdx+3] = 0;

      // 1. SKY (Blue sky has strong blue dominance: b > r + 35)
      if (b > r + 30 && b > 140) continue;

      // 2. GREEN VEGETATION & PLANTS & PALM TREE
      if ((g > r + 10 && g > b) || (g > 65 && r < 120 && b < 100)) continue;

      // 3. POOL WATER & STONE DECK
      if (y > 670 && x < 450) continue;
      if (y > 730) continue;

      // 4. OUTDOOR SOFA CORNER ON LEFT
      if (x < 225 && y > 630) continue;

      // 5. PARASOL UMBRELLA & LOUNGE CHAIRS
      if (x >= 280 && x <= 430 && y >= 600 && y <= 730) continue;

      // 6. ALL GLASS WINDOWS AND DOORS (Big right window, sliding doors, entrance glass)
      // Big right window upstairs: x: 700 to 860, y: 320 to 500
      if (x >= 700 && x <= 860 && y >= 320 && y <= 500) continue;
      // Upstairs sliding doors & balcony interior: x: 200 to 580, y: 350 to 550
      if (x >= 195 && x <= 580 && y >= 350 && y <= 550) continue;
      // Downstairs left sliding door: x: 240 to 395, y: 570 to 715
      if (x >= 240 && x <= 395 && y >= 570 && y <= 715) continue;
      // Downstairs center sliding door: x: 435 to 590, y: 565 to 715
      if (x >= 435 && x <= 590 && y >= 565 && y <= 715) continue;
      // Downstairs entrance door: x: 710 to 815, y: 565 to 735
      if (x >= 710 && x <= 815 && y >= 565 && y <= 735) continue;
      // Very dark frames & shadow:
      if (r < 75 && g < 75 && b < 75) continue;

      // 7. WOOD SLATS & WOOD PANELING
      // Wood is distinctly warm orange/brown (r > b + 45 and r > 130 and g > 70)
      if (r > 130 && g > 70 && b < 115 && r > b + 45) continue;
      // Central vertical wood column: x: 635 to 675, y: 260 to 720
      if (x >= 635 && x <= 675 && y >= 260 && y <= 720) continue;
      // Balcony horizontal wood fascia: x: 170 to 625, y: 510 to 565
      if (x >= 170 && x <= 625 && y >= 510 && y <= 565) continue;

      // 8. ROOF LINES & BLACK TRIM
      if (r < 95 && g < 95 && b < 95) continue;
      if (y < 250) continue;

      // 9. WALL SECTIONS ONLY:
      // A) Concrete fascia frame around balcony:
      const inUpperFrame = (x >= 165 && x <= 645 && y >= 265 && y <= 580);
      // B) Ground floor stucco walls between sliding doors:
      const inGroundPillars = (
        (x >= 390 && x <= 445 && y >= 565 && y <= 715) || // pillar between doors
        (x >= 585 && x <= 635 && y >= 560 && y <= 715) || // wall right of center door
        (x >= 220 && x <= 605 && y >= 555 && y <= 590)    // horizontal stucco band above ground doors
      );
      // C) Right tower white concrete frame:
      const inRightFrame = (x >= 670 && x <= 915 && y >= 255 && y <= 545);
      // D) Ground entrance walls:
      const inEntranceWall = (
        (x >= 810 && x <= 870 && y >= 555 && y <= 730) || // wall right of front door
        (x >= 675 && x <= 870 && y >= 535 && y <= 575) || // stucco above door
        (x >= 675 && x <= 715 && y >= 575 && y <= 730)    // pillar left of front door
      );

      if (inUpperFrame || inGroundPillars || inRightFrame || inEntranceWall) {
        // Pixel must be wall color (light grey, white, or beige/sand stucco)
        const diff = Math.max(r, g, b) - Math.min(r, g, b);
        const isWhiteStucco = (r > 190 && g > 190 && b > 185 && diff < 30);
        const isBeigeStucco = (r >= 140 && r <= 230 && g >= 130 && g <= 215 && b >= 100 && b <= 190 && (r - b) < 65);

        if (isWhiteStucco || isBeigeStucco) {
          mask[outIdx+3] = 255;
        }
      }
    }
  }

  await sharp(mask, { raw: { width, height, channels: 4 } })
    .blur(1.2)
    .png()
    .toFile('f:/panit frontend/src/assets/featured-exterior-house-mask.png');

  console.log('Exterior wall mask strictly excluding glass and sofa generated!');
}

makeExteriorMask().catch(console.error);

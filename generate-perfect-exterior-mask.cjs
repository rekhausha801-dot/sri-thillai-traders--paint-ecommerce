const sharp = require('sharp');

async function createFullCoverageExteriorMask() {
  const { data, info } = await sharp('src/assets/featured-exterior-house.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const mask = Buffer.alloc(width * height * 4);

  let coveredCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const outIdx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      mask[outIdx] = 255;
      mask[outIdx + 1] = 255;
      mask[outIdx + 2] = 255;
      mask[outIdx + 3] = 0; // Default transparent

      // ==========================================
      // 1. SKY (Strict Exclusion)
      // ==========================================
      // Pure blue sky above house and in openings
      if (b > 160 && b > r + 20 && b > g + 10 && y < 450) continue;
      if (b > 190 && b > r + 30 && y < 550) continue;
      // Clouds in top sky
      if (y < 130 && r > 210 && g > 220 && b > 230) continue;

      // ==========================================
      // 2. LAWN, PLANTS, TREES, FLOWERS
      // ==========================================
      // Palm tree on left (x < 220, y < 520)
      if (x < 220 && y < 520 && ((g > r && g > b) || (g > 60 && r < 100 && b < 100))) continue;
      // Tall green tree behind roof (y < 220, x > 150)
      if (y < 220 && ((g > r && g > b) || (g > 70 && b < 120))) continue;
      // Bushes and shrubs in foreground garden (y > 600)
      if (y > 600 && x < 480 && (g > r || (g > 60 && r < 120 && b < 110))) continue;
      // Garden bordering driveway
      if (y > 690 && x > 440 && (g > r || (g > 65 && b < 110))) continue;
      // Grass lawn in lower left
      if (y >= 680 && x <= 460) continue;

      // ==========================================
      // 3. DRIVEWAY, ROAD, PAVERS, BOLLARDS
      // ==========================================
      if (y >= 830) continue; // Road pavement at bottom
      if (y >= 710 && x >= 460) continue; // Driveway pavers

      // ==========================================
      // 4. CAR (AUDI Q8) - x: 715 to 895, y: 615 to 765
      // ==========================================
      if (x >= 715 && x <= 895 && y >= 615 && y <= 765) continue;

      // ==========================================
      // 5. STONE TILE PILLARS
      // ==========================================
      // Grey stone pillar under porch: x: 655 to 705, y: 485 to 735
      if (x >= 655 && x <= 705 && y >= 485 && y <= 735) continue;
      // Top right textured stone column: x: 795 to 865, y: 160 to 325
      if (x >= 795 && x <= 865 && y >= 160 && y <= 325) continue;

      // ==========================================
      // 6. WOOD CEILINGS, SLATS & SOFFITS
      // ==========================================
      // Warm brown wood under porch canopy: x: 420 to 770, y: 450 to 515
      if (x >= 420 && x <= 770 && y >= 450 && y <= 515 && r > 80 && g > 45 && r > b + 25) continue;
      // Upper roof eaves & fascia
      if (y < 240 && x >= 500 && r > 70 && g > 40 && r > b + 20) continue;
      // Balcony ceiling underside
      if (y >= 210 && y <= 300 && x >= 490 && x <= 840 && r > 60 && g > 35 && r > b + 20) continue;

      // ==========================================
      // 7. WINDOWS & GLASS DOORS (FRAMES + GLASS REFLECTIONS)
      // ==========================================
      // Left 2-story large window:
      // Upper window: x: 258 to 398, y: 268 to 445
      if (x >= 258 && x <= 398 && y >= 268 && y <= 445) continue;
      // Lower window: x: 258 to 398, y: 520 to 695
      if (x >= 258 && x <= 398 && y >= 520 && y <= 695) continue;
      // Window divider mullions / black metal
      if (x >= 250 && x <= 405 && y >= 260 && y <= 700 && r < 55 && g < 55 && b < 55) continue;

      // Balcony glass railing & upstairs sliding doors:
      // x: 505 to 830, y: 290 to 455
      if (x >= 505 && x <= 830 && y >= 290 && y <= 455) continue;

      // Front entrance door: x: 530 to 660, y: 515 to 705
      if (x >= 530 && x <= 660 && y >= 515 && y <= 705) continue;

      // Garage door: x: 735 to 945, y: 540 to 715
      if (x >= 735 && x <= 945 && y >= 540 && y <= 715) continue;

      // ==========================================
      // 8. ALL EXTERIOR WALL SURFACES TO FULLY COVER:
      // ==========================================
      // A) Left 2-story main cube wall: x: 185 to 495, y: 135 to 715
      const inLeftCube = (x >= 185 && x <= 495 && y >= 135 && y <= 715);

      // B) Center upper floor wall & balcony fascia: x: 495 to 805, y: 195 to 480
      const inCenterUpper = (x >= 495 && x <= 805 && y >= 195 && y <= 480);

      // C) Ground floor entrance recessed wall: x: 470 to 535 && y: 480 to 715
      const inGroundEntrance = (x >= 470 && x <= 535 && y >= 480 && y <= 715);

      // D) Right garage exterior stucco walls (above & right of garage door):
      // x: 705 to 985, y: 475 to 720
      const inGarageWall = (x >= 705 && x <= 985 && y >= 475 && y <= 720);

      // E) Left perimeter wall & gate wall: x: 0 to 185, y: 570 to 720
      const inLeftFence = (x >= 0 && x <= 185 && y >= 570 && y <= 720);

      // F) Far right edge wall: x: 975 to 1010, y: 570 to 720
      const inRightFence = (x >= 975 && x <= 1010 && y >= 570 && y <= 720);

      if (inLeftCube || inCenterUpper || inGroundEntrance || inGarageWall || inLeftFence || inRightFence) {
        // Exclude deep shadows / black trims
        if (r < 30 && g < 30 && b < 30) continue;
        
        mask[outIdx + 3] = 255;
        coveredCount++;
      }
    }
  }

  console.log('Covered wall pixels with full coverage mask:', coveredCount);

  await sharp(mask, { raw: { width, height, channels: 4 } })
    .blur(1.2)
    .png()
    .toFile('src/assets/featured-exterior-house-mask.png');

  console.log('Saved high-coverage mask to src/assets/featured-exterior-house-mask.png!');
}

createFullCoverageExteriorMask().catch(console.error);


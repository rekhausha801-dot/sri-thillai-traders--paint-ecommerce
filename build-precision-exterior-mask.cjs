const sharp = require('sharp');

async function buildPrecisionWholeHouseMask() {
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
      mask[outIdx + 3] = 0;

      // -------------------------------------------------------------
      // 1. SKY (Outside the house envelope)
      // -------------------------------------------------------------
      // Above main house roofline
      if (y < 125) continue;
      // Sky to the left of the house (x < 190) above fence (y < 580)
      if (x < 190 && y < 580) continue;
      // Sky above porch/balcony roof (y < 195, x > 490)
      if (y < 195 && x > 490) continue;

      // -------------------------------------------------------------
      // 2. GROUND, LAWN & ROADS (Everything below the building)
      // -------------------------------------------------------------
      if (y >= 835) continue; // Front street asphalt
      if (y >= 710 && x >= 460) continue; // Driveway pavers
      if (y >= 685 && x <= 460) continue; // Lawn grass
      // Shrub row between lawn and driveway (y > 620, x between 440 and 475)
      if (y > 620 && x >= 440 && x <= 475 && g > r && g > b) continue;
      // Green bushes at ground level in front of left wall (y > 635, x: 190 to 240)
      if (y > 635 && x >= 190 && x <= 240 && g > r && g > b) continue;

      // -------------------------------------------------------------
      // 3. CAR (Audi Q8 SUV in driveway)
      // -------------------------------------------------------------
      if (x >= 715 && x <= 895 && y >= 615 && y <= 765) continue;

      // -------------------------------------------------------------
      // 4. ARCHITECTURAL WOOD ELEMENTS (CANOPY, SOFFITS, FASCIA)
      // -------------------------------------------------------------
      // Porch roof canopy: starts at x=525, goes to x=770, y=445 to 515
      if (x >= 525 && x <= 770 && y >= 445 && y <= 515) continue;
      // Balcony roof canopy: x: 495 to 838, y: 205 to 300
      if (x >= 495 && x <= 838 && y >= 205 && y <= 300) continue;
      // Topmost upper roof soffit/fascia (y: 125 to 165, x: 520 to 860)
      if (y >= 125 && y <= 165 && x >= 520 && x <= 860) continue;

      // -------------------------------------------------------------
      // 5. STONE COLUMNS / TILES (UNPAINTED TEXTURED STONE)
      // -------------------------------------------------------------
      // Ground floor porch support column: x: 658 to 705, y: 485 to 735
      if (x >= 658 && x <= 705 && y >= 485 && y <= 735) continue;
      // Top right vertical stone accent column: x: 795 to 865, y: 160 to 325
      if (x >= 795 && x <= 865 && y >= 160 && y <= 325) continue;

      // -------------------------------------------------------------
      // 6. WINDOWS & GLASS DOORS (FRAMES & REFLECTIONS)
      // -------------------------------------------------------------
      // Left 2-story large window:
      // Upper glass pane: x: 258 to 398, y: 268 to 445
      if (x >= 258 && x <= 398 && y >= 268 && y <= 445) continue;
      // Lower glass pane: x: 258 to 398, y: 520 to 695
      if (x >= 258 && x <= 398 && y >= 520 && y <= 695) continue;
      // Black aluminum window frame & mullions
      if (x >= 250 && x <= 405 && y >= 260 && y <= 700 && r < 40 && g < 40 && b < 40) continue;

      // Balcony glass railing & sliding doors upstairs: x: 505 to 830, y: 290 to 455
      if (x >= 505 && x <= 830 && y >= 290 && y <= 455) continue;

      // Front entrance main door & sidelight: x: 530 to 660, y: 515 to 710
      if (x >= 530 && x <= 660 && y >= 515 && y <= 710) continue;

      // Garage door (dark purple horizontal slats): x: 735 to 945, y: 540 to 715
      if (x >= 735 && x <= 945 && y >= 540 && y <= 715) continue;

      // -------------------------------------------------------------
      // 7. COMPREHENSIVE WALL SECTIONS (FULL COVERAGE)
      // -------------------------------------------------------------
      // Wall 1: Main left two-story stucco tower
      // Envelope: x: 190 to 495, y: 135 to 715
      const inLeftTower = (x >= 190 && x <= 495 && y >= 135 && y <= 715);

      // Wall 2: Center upper floor wall & balcony back wall
      // Envelope: x: 495 to 805, y: 195 to 480
      const inCenterUpper = (x >= 495 && x <= 805 && y >= 195 && y <= 480);

      // Wall 3: Recessed entrance wall (left of front door)
      // Envelope: x: 470 to 535, y: 480 to 715
      const inEntranceStucco = (x >= 470 && x <= 535 && y >= 480 && y <= 715);

      // Wall 4: Right garage exterior stucco walls (above door & right of door)
      // Envelope: x: 705 to 985, y: 475 to 720
      const inGarageStucco = (x >= 705 && x <= 985 && y >= 475 && y <= 720);

      // Wall 5: Perimeter boundary walls (left boundary wall: x: 0 to 190, y: 580 to 720)
      const inPerimeterWall = (x >= 0 && x <= 190 && y >= 580 && y <= 720);

      // Wall 6: Far right boundary wall (x: 975 to 1010, y: 580 to 720)
      const inFarRightWall = (x >= 975 && x <= 1010 && y >= 580 && y <= 720);

      if (inLeftTower || inCenterUpper || inEntranceStucco || inGarageStucco || inPerimeterWall || inFarRightWall) {
        // Exclude extreme dark frame edges
        if (r < 25 && g < 25 && b < 25) continue;

        mask[outIdx + 3] = 255;
        coveredCount++;
      }
    }
  }

  console.log('Total covered exterior wall pixels:', coveredCount);

  // Apply subtle anti-aliased edge feathering (0.8px) so recolor looks 100% natural
  await sharp(mask, { raw: { width, height, channels: 4 } })
    .blur(0.8)
    .png()
    .toFile('src/assets/featured-exterior-house-mask.png');

  console.log('Full coverage mask successfully saved to src/assets/featured-exterior-house-mask.png!');
}

buildPrecisionWholeHouseMask().catch(console.error);

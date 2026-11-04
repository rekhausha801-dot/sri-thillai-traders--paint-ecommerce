import sharp from 'sharp';

async function makeFullWallMasks() {
  // 1. LIVING ROOM FULL WALL MASK (1200 x 896)
  // Fill the complete back wall from curtain edge (x=275) all the way to right border (x=1200)
  // Top: ceiling line (y=146)
  // Bottom: behind sofa down to y=575, and behind shelf down to y=760
  const svgLivingRoom = `<svg width="1200" height="896" viewBox="0 0 1200 896" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="blur" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
    <rect width="1200" height="896" fill="transparent" />
    <g filter="url(#blur)" fill="#FFFFFF">
      <polygon points="268,146 1200,146 1200,560 1085,560 1085,760 395,570 268,570" />
    </g>
  </svg>`;

  const livingRoomBuf = await sharp(Buffer.from(svgLivingRoom)).png().toBuffer();
  const livingRoomImg = await sharp('f:/panit frontend/src/assets/visualizer-living-room.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const livingMaskData = await sharp(livingRoomBuf).raw().toBuffer({ resolveWithObject: true });
  const wLR = livingRoomImg.info.width;
  const hLR = livingRoomImg.info.height;
  const rgbaLR = Buffer.alloc(wLR * hLR * 4);

  for (let y = 0; y < hLR; y++) {
    for (let x = 0; x < wLR; x++) {
      const i = y * wLR + x;
      const r = livingRoomImg.data[i * 3];
      const g = livingRoomImg.data[i * 3 + 1];
      const b = livingRoomImg.data[i * 3 + 2];

      // Exclude green plant leaves accurately
      const isPlant = (x >= 265 && x <= 505 && y >= 295 && y <= 660 && (g > r + 5 || (g > 65 && r < 130 && b < 100)));
      // Exclude lamp pole
      const isLamp = (x >= 1045 && x <= 1060 && y >= 420);
      // Exclude floating shelf wood
      const isShelf = (x >= 1080 && y >= 560 && y <= 625 && r > b + 20);

      const val = livingMaskData.data[i * 4 + 3];
      rgbaLR[i * 4] = 255;
      rgbaLR[i * 4 + 1] = 255;
      rgbaLR[i * 4 + 2] = 255;
      rgbaLR[i * 4 + 3] = (isPlant || isLamp || isShelf) ? 0 : val;
    }
  }

  await sharp(rgbaLR, { raw: { width: wLR, height: hLR, channels: 4 } })
    .blur(1)
    .png()
    .toFile('f:/panit frontend/src/assets/visualizer-living-room-mask.png');

  console.log('1. Living Room FULL wall mask updated successfully!');


  // 2. WHOLE HOUSE EXTERIOR FULL WALL MASK (1024 x 1024)
  // Paint the ENTIRE house facade walls completely:
  // - Upper left box facade (all sides of concrete frame)
  // - Ground floor stucco facade (all the way across ground floor)
  // - Right upper tower facade (front and side walls)
  // - Ground entrance stucco facade
  // BUT cleanly excluding:
  // - Sky
  // - Glass windows & sliding doors
  // - Wood slats & wood panels
  // - Pool water & outdoor furniture & plants
  const svgExterior = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="blur" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
    <rect width="1024" height="1024" fill="transparent" />
    <g filter="url(#blur)" fill="#FFFFFF">
      <!-- Upper Left Box Frame Full Outer -->
      <polygon points="164,430 580,260 644,332 644,385 580,315 174,475 174,575 164,575" />
      <polygon points="174,530 580,480 580,520 174,570" />
      <polygon points="164,430 186,440 186,575 164,575" />

      <!-- Ground Floor Stucco Walls - FULL SOLID COVERAGE ACROSS GROUND FACADE -->
      <!-- Entire ground floor band above doors -->
      <polygon points="215,550 635,530 635,595 215,600" />
      <!-- Wall pier between doors -->
      <polygon points="385,565 448,560 448,720 385,720" />
      <!-- Wall pier right of center door -->
      <polygon points="580,555 640,550 640,730 580,730" />
      <!-- Wall left of ground sliding door -->
      <polygon points="215,570 252,570 252,710 215,710" />

      <!-- Right Tower Upper Box - FULL SOLID COVERAGE OF WHITE/BEIGE SURFACES -->
      <polygon points="670,350 870,250 885,265 885,535 855,535 855,295 705,355 705,505 670,505" />
      <polygon points="670,465 885,465 885,540 670,540" />
      <!-- Right Side Facade Face -->
      <polygon points="885,265 922,370 922,640 885,610" />

      <!-- Ground Floor Right Entrance - FULL SOLID WALL AROUND DOOR -->
      <polygon points="675,535 870,525 870,590 675,590" />
      <polygon points="805,570 870,565 870,735 805,735" />
      <polygon points="675,575 720,575 720,735 675,735" />
    </g>
  </svg>`;

  const extBuf = await sharp(Buffer.from(svgExterior)).png().toBuffer();
  const extImg = await sharp('f:/panit frontend/src/assets/featured-exterior-house.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const extMaskData = await sharp(extBuf).raw().toBuffer({ resolveWithObject: true });
  const wExt = extImg.info.width;
  const hExt = extImg.info.height;
  const rgbaExt = Buffer.alloc(wExt * hExt * 4);

  for (let y = 0; y < hExt; y++) {
    for (let x = 0; x < wExt; x++) {
      const i = y * wExt + x;
      const r = extImg.data[i * 3];
      const g = extImg.data[i * 3 + 1];
      const b = extImg.data[i * 3 + 2];

      // Exclude sky
      const isSky = (b > r + 35 && b > 140);
      // Exclude vegetation / palms / garden
      const isPlant = (g > r + 10 && g > b) || (g > 65 && r < 120 && b < 100);
      // Exclude pool water
      const isPool = (y > 670 && x < 450);
      // Exclude glass window interiors (dark frames / reflections)
      const isGlass = (r < 65 && g < 65 && b < 70);
      // Exclude wood slats (warm orange-brown)
      const isWood = (r > 130 && g > 70 && b < 115 && r > b + 45);

      const val = extMaskData.data[i * 4 + 3];
      rgbaExt[i * 4] = 255;
      rgbaExt[i * 4 + 1] = 255;
      rgbaExt[i * 4 + 2] = 255;
      rgbaExt[i * 4 + 3] = (isSky || isPlant || isPool || isGlass || isWood) ? 0 : val;
    }
  }

  await sharp(rgbaExt, { raw: { width: wExt, height: hExt, channels: 4 } })
    .blur(1)
    .png()
    .toFile('f:/panit frontend/src/assets/featured-exterior-house-mask.png');

  console.log('2. Whole House Exterior FULL wall mask updated successfully!');
}

makeFullWallMasks().catch(console.error);

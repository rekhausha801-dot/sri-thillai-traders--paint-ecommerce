import sharp from 'sharp';

async function checkLeftRight() {
  const { data, info } = await sharp('src/assets/visualizer-living-room-hd.jpg').raw().toBuffer({ resolveWithObject: true });
  // Check y = 400 (middle of wall) across all x
  console.log('--- Scanning left edge y=400 ---');
  for (let x = 0; x <= 200; x += 10) {
    const idx = (400 * info.width + x) * 3;
    console.log(`x=${x}: R=${data[idx]} G=${data[idx+1]} B=${data[idx+2]}`);
  }

  console.log('--- Scanning right edge y=400 ---');
  for (let x = 1100; x < 1200; x += 10) {
    const idx = (400 * info.width + x) * 3;
    console.log(`x=${x}: R=${data[idx]} G=${data[idx+1]} B=${data[idx+2]}`);
  }
}
checkLeftRight();

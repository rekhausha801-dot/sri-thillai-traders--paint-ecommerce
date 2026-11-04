import sharp from 'sharp';

async function checkTop() {
  const { data, info } = await sharp('src/assets/visualizer-living-room-hd.jpg').raw().toBuffer({ resolveWithObject: true });
  // Scan ceiling along x = 600
  for (let y = 0; y <= 220; y += 10) {
    const idx = (y * info.width + 600) * 3;
    console.log(`y=${y}: R=${data[idx]} G=${data[idx+1]} B=${data[idx+2]}`);
  }
}
checkTop();

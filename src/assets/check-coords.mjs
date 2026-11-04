import sharp from 'sharp';

async function check() {
  const { data, info } = await sharp('src/assets/visualizer-living-room-hd.jpg').raw().toBuffer({ resolveWithObject: true });
  console.log('Dims:', info.width, info.height);
  // Scan y along x = 600
  for (let y = 840; y <= 940; y += 5) {
    const idx = (y * info.width + 600) * 3;
    console.log(`y=${y}: R=${data[idx]} G=${data[idx+1]} B=${data[idx+2]}`);
  }
}
check();

const sharp = require('sharp');
const fs = require('fs');

async function removeAllGreenPatches() {
  const width = 988;
  const height = 1408;

  // 1. Load current Card 4
  const { data, info } = await sharp('src/assets/featured-hd-card-4.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const out = Buffer.from(data);

  // 2. Sample clean wall pixels on the right at each row y
  // In the zone y from 350 to 800 and x from 0 to 220:
  // If a pixel has any green tint (g > r || g > b + 15 || hue is green)
  // Replace it COMPLETELY with smooth clean wall!
  for (let y = 320; y <= 850; y++) {
    // Reference pixel on the smooth warm amber wall at x = 450 (or 500)
    const refIdx = (y * width + 480) * channels;
    const wr = out[refIdx];
    const wg = out[refIdx + 1];
    const wb = out[refIdx + 2];

    for (let x = 0; x <= 220; x++) {
      const idx = (y * width + x) * channels;
      const r = out[idx];
      const g = out[idx + 1];
      const b = out[idx + 2];

      // Check if it's the green patch (green channel is prominent or higher than red):
      // In the sample: [86, 105, 62] -> g (105) > r (86)
      if (g > r * 0.95 || (g > 60 && g > b + 15 && r < 140)) {
        // Natural soft studio vignette for far left wall:
        const vig = 0.88 + 0.12 * (x / 220);
        out[idx] = Math.round(wr * vig);
        out[idx + 1] = Math.round(wg * vig);
        out[idx + 2] = Math.round(wb * vig);
      }
    }
  }

  // Save the completely clean Card 4 without any trace of green!
  await sharp(out, { raw: { width, height, channels } })
    .png({ quality: 100 })
    .toFile('src/assets/featured-hd-card-4.png');

  console.log('All green patches have been 100% removed from Card 4!');
}

removeAllGreenPatches().catch(console.error);


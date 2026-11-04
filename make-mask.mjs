import sharp from 'sharp';

const svgMask = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="1.5" />
    </filter>
  </defs>
  
  <rect width="1024" height="1024" fill="transparent" />

  <g filter="url(#blur)" fill="#FFFFFF">
    <!-- 1. Upper Left Facade Frame -->
    <polygon points="166,442 580,268 642,336 642,370 580,305 174,472 174,570 166,570" />
    <polygon points="166,432 580,260 580,268 166,442" />
    <polygon points="174,535 580,488 580,518 174,565" />
    <polygon points="166,442 186,448 186,570 166,570" />

    <!-- 2. Ground Floor Stucco Wall -->
    <polygon points="222,558 605,535 605,585 222,590" />
    <polygon points="388,575 442,572 442,705 388,705" />
    <polygon points="584,570 635,565 635,715 584,715" />

    <!-- 3. Right Tower / Box Facade Frame -->
    <polygon points="674,352 870,260 882,275 882,530 858,525 858,300 710,360 710,500 674,500" />
    <polygon points="674,470 882,470 882,535 674,535" />
    <polygon points="882,275 918,375 918,630 882,600" />

    <!-- 4. Ground Floor Right Entrance Wall -->
    <polygon points="680,545 865,535 865,585 680,585" />
    <polygon points="812,580 865,575 865,730 812,730" />
    <polygon points="680,580 714,580 714,730 680,730" />
  </g>
</svg>`;

sharp(Buffer.from(svgMask))
  .png()
  .toFile('f:/panit frontend/src/assets/featured-exterior-house-mask.png')
  .then(() => console.log('Clean architectural SVG mask generated successfully!'))
  .catch(err => console.error(err));

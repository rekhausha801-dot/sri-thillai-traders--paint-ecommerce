import fs from 'fs';

const css = fs.readFileSync('src/styles/Home.css', 'utf-8');

const horizontalCSS = `

/* ==========================================================================
   Horizontal 3-Card Row Grid (Matching User Screenshot Exactly)
   ========================================================================== */
.services-horizontal-row-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
}

.service-horizontal-card {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  background: #FAF8F4;
  border: 1px solid rgba(214, 173, 112, 0.4);
  box-shadow: 0 10px 30px -4px rgba(23, 54, 93, 0.12), 0 4px 12px rgba(214, 173, 112, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
  line-height: 0;
}

.service-horizontal-card:hover {
  transform: translateY(-8px);
  border-color: #D6AD70;
  box-shadow: 0 20px 45px -6px rgba(23, 54, 93, 0.22), 0 8px 24px rgba(214, 173, 112, 0.2);
}

.service-horizontal-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 20px;
  filter: none !important;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-horizontal-card:hover .service-horizontal-img {
  transform: scale(1.02);
}

@media (max-width: 992px) {
  .services-horizontal-row-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .services-horizontal-row-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
`;

fs.writeFileSync('src/styles/Home.css', css + horizontalCSS, 'utf-8');
console.log('Appended horizontal CSS successfully!');


/**
 * Generate ElliottSecurity favicon / PWA icons from the geometric monogram.
 * Source: public/brand/logo.svg (app icon with dark background)
 *         public/logo-mark.svg (transparent mark)
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const appIconPath = join(publicDir, 'brand', 'logo.svg');
const markPath = join(publicDir, 'logo-mark.svg');

async function pngFrom(svgPath, size, outName) {
	const buf = await sharp(readFileSync(svgPath)).resize(size, size).png().toBuffer();
	writeFileSync(join(publicDir, outName), buf);
	console.log(`Wrote ${outName} (${size}x${size})`);
	return buf;
}

async function main() {
	// Keep public copies in sync with brand sources
	copyFileSync(markPath, join(publicDir, 'brand', 'monogram.svg'));

	const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" role="img" aria-label="ElliottSecurity">
  <rect width="64" height="64" rx="12" fill="#09090B"/>
  <defs>
    <linearGradient id="g" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7C3AED"/>
      <stop offset="0.5" stop-color="#8B5CF6"/>
      <stop offset="1" stop-color="#A855F7"/>
    </linearGradient>
  </defs>
  <path d="M32 5 54.5 18v28L32 59 9.5 46V18L32 5Z" stroke="url(#g)" stroke-width="3.5" stroke-linejoin="round"/>
  <path fill="url(#g)" d="M20 18h26v7H28.5v4H42v7H28.5v4H46v7H20V18Z"/>
</svg>
`;
	writeFileSync(join(publicDir, 'favicon.svg'), faviconSvg);
	console.log('Wrote favicon.svg');

	const appSvg = readFileSync(appIconPath);
	const png16 = await sharp(appSvg).resize(16, 16).png().toBuffer();
	const png32 = await sharp(appSvg).resize(32, 32).png().toBuffer();
	const png48 = await sharp(appSvg).resize(48, 48).png().toBuffer();
	writeFileSync(join(publicDir, 'favicon.ico'), await toIco([png16, png32, png48]));
	console.log('Wrote favicon.ico (16/32/48)');

	await pngFrom(appIconPath, 180, 'apple-touch-icon.png');
	await pngFrom(appIconPath, 192, 'android-chrome-192x192.png');
	await pngFrom(appIconPath, 512, 'android-chrome-512x512.png');

	// Social / OG preview with monogram
	const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="#09090B"/>
  <rect x="80" y="80" width="1040" height="470" rx="24" fill="#111118" stroke="#2A2A38" stroke-width="2"/>
  <defs>
    <linearGradient id="og" x1="140" y1="200" x2="260" y2="360" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7C3AED"/>
      <stop offset="0.5" stop-color="#8B5CF6"/>
      <stop offset="1" stop-color="#A855F7"/>
    </linearGradient>
  </defs>
  <g transform="translate(140 215) scale(3.15)">
    <path d="M32 5 54.5 18v28L32 59 9.5 46V18L32 5Z" stroke="url(#og)" stroke-width="3.5" stroke-linejoin="round"/>
    <path fill="url(#og)" d="M20 18h26v7H28.5v4H42v7H28.5v4H46v7H20V18Z"/>
  </g>
  <text x="380" y="290" fill="#F8FAFC" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="52" font-weight="600">ElliottSecurity Platform</text>
  <text x="380" y="350" fill="#CBD5E1" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="28">Cybersecurity engineering knowledge platform</text>
  <text x="380" y="410" fill="#94A3B8" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="22">Document the work. Share the knowledge. Keep building.</text>
</svg>
`;
	writeFileSync(join(publicDir, 'og-default.svg'), ogSvg);
	console.log('Wrote og-default.svg');

	const legacy = join(publicDir, 'apple-touch-icon.svg');
	if (existsSync(legacy)) unlinkSync(legacy);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

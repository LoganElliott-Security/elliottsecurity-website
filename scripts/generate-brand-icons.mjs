/**
 * Generate ElliottSecurity favicon / PWA icons from public/brand/logo.svg
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const logoPath = join(publicDir, 'brand', 'logo.svg');

const logoSvg = readFileSync(logoPath);

async function png(size, outName) {
	const buf = await sharp(logoSvg).resize(size, size).png().toBuffer();
	const out = join(publicDir, outName);
	writeFileSync(out, buf);
	console.log(`Wrote ${outName} (${size}x${size})`);
	return buf;
}

async function main() {
	const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" role="img" aria-label="ElliottSecurity">
  <rect width="32" height="32" rx="6" fill="#181824"/>
  <path
    d="M16 4.5 7 8.5v7c0 5.25 3.85 10.15 9 11.5 5.15-1.35 9-6.25 9-11.5v-7L16 4.5Z"
    stroke="#7C3AED"
    stroke-width="1.75"
    stroke-linejoin="round"
  />
  <path
    d="M12.5 16.5 14.75 18.75 19.5 14"
    stroke="#A855F7"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`;
	writeFileSync(join(publicDir, 'favicon.svg'), faviconSvg);
	console.log('Wrote favicon.svg');

	const png16 = await sharp(logoSvg).resize(16, 16).png().toBuffer();
	const png32 = await sharp(logoSvg).resize(32, 32).png().toBuffer();
	const png48 = await sharp(logoSvg).resize(48, 48).png().toBuffer();
	const ico = await toIco([png16, png32, png48]);
	writeFileSync(join(publicDir, 'favicon.ico'), ico);
	console.log('Wrote favicon.ico (16/32/48)');

	await png(180, 'apple-touch-icon.png');
	await png(192, 'android-chrome-192x192.png');
	await png(512, 'android-chrome-512x512.png');

	// OG share image using the brand mark
	const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="#09090B"/>
  <rect x="80" y="80" width="1040" height="470" rx="24" fill="#181824" stroke="#2A2A38" stroke-width="2"/>
  <rect x="120" y="190" width="120" height="120" rx="28" fill="#181824" stroke="#2A2A38" stroke-width="2"/>
  <path
    d="M180 208 146 224v26c0 19.7 14.4 38 33.8 43.1C199 284 213.4 265.7 213.4 246v-26L180 208Z"
    stroke="#7C3AED"
    stroke-width="6.5"
    stroke-linejoin="round"
  />
  <path
    d="M167 253 175.5 261.5 193 242"
    stroke="#A855F7"
    stroke-width="6.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <text x="280" y="245" fill="#F8FAFC" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="56" font-weight="600">ElliottSecurity Platform</text>
  <text x="280" y="310" fill="#CBD5E1" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="30">Cybersecurity knowledge platform</text>
  <text x="280" y="370" fill="#94A3B8" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="22">Document the work. Share the knowledge. Keep building.</text>
</svg>
`;
	writeFileSync(join(publicDir, 'og-default.svg'), ogSvg);
	console.log('Wrote og-default.svg');

	const legacySvg = join(publicDir, 'apple-touch-icon.svg');
	if (existsSync(legacySvg)) {
		unlinkSync(legacySvg);
		console.log('Removed legacy apple-touch-icon.svg');
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

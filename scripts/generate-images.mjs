import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, 'public');
const assetsDir = path.join(publicDir, 'assets');

const targets = [
  { file: 'ame-du-monde.png', id: 'ame-du-monde' },
  { file: 'travel-gc.png', id: 'travel-gc' },
];

const widths = [768, 1200, 1920];

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true }).catch(() => {});
}

async function processOne(srcPath, outBase, maxBytesMobile = 150_000, maxBytesDesktop = 400_000) {
  for (const w of widths) {
    const img = sharp(srcPath).resize({ width: w, withoutEnlargement: true });

    // AVIF
    const outAvif = path.join(assetsDir, `${outBase}-${w}.avif`);
    const avifBuf = await img.clone().avif({ quality: 50, effort: 4 }).toBuffer();
    await fs.writeFile(outAvif, avifBuf);

    // WebP
    const outWebp = path.join(assetsDir, `${outBase}-${w}.webp`);
    const webpBuf = await img.clone().webp({ quality: 68 }).toBuffer();
    await fs.writeFile(outWebp, webpBuf);
  }
}

async function main() {
  await ensureDir(assetsDir);
  for (const t of targets) {
    const src = path.join(assetsDir, t.file);
    try {
      await fs.access(src);
    } catch {
      console.warn(`[images] Source introuvable: ${src}`);
      continue;
    }
    console.log(`[images] Génération variantes pour ${t.file}…`);
    await processOne(src, t.id);
  }
  console.log('[images] OK');
}

main().catch((err) => { console.error(err); process.exit(1); });



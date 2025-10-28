import fs from 'node:fs/promises';
import path from 'node:path';

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

async function processOne(sharp, srcPath, outBase) {
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
  // Import dynamique de sharp: si absent, on sort proprement
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (e) {
    console.log('[images] Sharp non installé — génération des variantes ignorée.');
    return;
  }

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
    await processOne(sharp, src, t.id);
  }
  console.log('[images] OK');
}

main().catch((err) => { console.error(err); process.exit(1); });



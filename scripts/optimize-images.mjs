/**
 * optimize-images.mjs
 * Converts all images in public/images/ to WebP format
 * - High quality (82) for clear results without blur
 * - Skips images that already have an up-to-date WebP version
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_IMAGES = join(ROOT, 'public', 'images');

// Quality settings - high enough to stay sharp, low enough to save space
const WEBP_QUALITY = 82;   // 80-85 sweet spot: jelas tapi ringan
const MAX_WIDTH = 1600;    // max 1600px width, cukup untuk layar retina mobile

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);

let converted = 0;
let skipped = 0;
let failed = 0;
const savings = [];

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getAllImages(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function convertToWebP(inputPath) {
  const ext = extname(inputPath);
  const outputPath = inputPath.slice(0, -ext.length) + '.webp';
  const name = basename(inputPath);

  // Check if WebP already exists and is newer than source
  if (existsSync(outputPath)) {
    const [srcStat, dstStat] = await Promise.all([stat(inputPath), stat(outputPath)]);
    if (dstStat.mtimeMs >= srcStat.mtimeMs) {
      console.log(`  ⏭  Skipped (up-to-date): ${name}`);
      skipped++;
      return;
    }
  }

  try {
    const srcStat = await stat(inputPath);

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true }) // never upscale
      .webp({
        quality: WEBP_QUALITY,
        effort: 4,          // 0-6, balanced encode speed vs size
        smartSubsample: true,
      })
      .toFile(outputPath);

    const dstStat = await stat(outputPath);
    const saved = srcStat.size - dstStat.size;
    const pct = ((saved / srcStat.size) * 100).toFixed(1);

    savings.push({ name, orig: srcStat.size, webp: dstStat.size, saved });
    console.log(
      `  ✅ ${name} → ${formatBytes(srcStat.size)} → ${formatBytes(dstStat.size)} (saved ${pct}%)`
    );
    converted++;
  } catch (err) {
    console.error(`  ❌ Failed: ${name} — ${err.message}`);
    failed++;
  }
}

async function main() {
  console.log('🖼  Image Optimizer — Converting to WebP\n');
  console.log(`   Source: ${PUBLIC_IMAGES}`);
  console.log(`   Quality: ${WEBP_QUALITY} | Max width: ${MAX_WIDTH}px\n`);

  const images = await getAllImages(PUBLIC_IMAGES);

  if (images.length === 0) {
    console.log('No images found.');
    return;
  }

  console.log(`Found ${images.length} image(s):\n`);

  for (const imgPath of images) {
    await convertToWebP(imgPath);
  }

  // Summary
  const totalOrig = savings.reduce((s, r) => s + r.orig, 0);
  const totalWebP = savings.reduce((s, r) => s + r.webp, 0);
  const totalSaved = totalOrig - totalWebP;

  console.log('\n' + '─'.repeat(60));
  console.log(`✅ Converted : ${converted}`);
  console.log(`⏭  Skipped   : ${skipped}`);
  console.log(`❌ Failed    : ${failed}`);
  if (converted > 0) {
    console.log(`\n💾 Total saved: ${formatBytes(totalSaved)} (${((totalSaved / totalOrig) * 100).toFixed(1)}%)`);
    console.log(`   Before: ${formatBytes(totalOrig)}`);
    console.log(`   After : ${formatBytes(totalWebP)}`);
  }
  console.log('─'.repeat(60));
  console.log('\n✨ Done! Update your <img> src to use .webp extension.');
}

main().catch(console.error);

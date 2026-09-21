import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve(process.cwd(), 'public/images');

async function convertJpgToWebp() {
  try {
    const files = await fs.readdir(IMAGES_DIR);
    const jpgFiles = files.filter((file) => /\.(jpg|jpeg)$/i.test(file));

    if (jpgFiles.length === 0) {
      console.log('No JPG/JPEG images found in public/images.');
      return;
    }

    console.log(`Found ${jpgFiles.length} images to convert to WebP in ${IMAGES_DIR}...\n`);

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const file of jpgFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const parsed = path.parse(file);
      const outputPath = path.join(IMAGES_DIR, `${parsed.name}.webp`);

      const inputStats = await fs.stat(inputPath);
      totalOriginalSize += inputStats.size;

      await sharp(inputPath)
        .webp({
          quality: 85,
          effort: 6,
          lossless: false,
        })
        .withMetadata({ strip: true })
        .toFile(outputPath);

      const outputStats = await fs.stat(outputPath);
      totalOptimizedSize += outputStats.size;

      const savedPercent = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);
      console.log(
        `✓ ${file.padEnd(30)} -> ${`${parsed.name}.webp`.padEnd(30)} | ${(outputStats.size / 1024).toFixed(1)} KB (Saved ${savedPercent}%)`
      );
    }

    const overallSavings = (((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1);
    console.log(`\n======================================================`);
    console.log(`Total Original:  ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Total Optimized: ${(totalOptimizedSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Net Compression Savings: ${overallSavings}%`);
    console.log(`======================================================\n`);
  } catch (error) {
    console.error('Error during asset conversion:', error);
    process.exit(1);
  }
}

convertJpgToWebp();

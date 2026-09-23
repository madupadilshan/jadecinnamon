import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const UPLOAD_DIR = 'C:\\Users\\Hasidu\\.gemini\\antigravity-ide\\brain\\9561c0e3-4193-4e7b-a58d-cc03a3a026b8\\.user_uploaded';
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/images');

const imageMap = [
  {
    input: path.join(UPLOAD_DIR, 'media_1790129252627.png'),
    output: path.join(OUTPUT_DIR, 'gallery-cinnamon-pack.webp'),
  },
  {
    input: path.join(UPLOAD_DIR, 'media_1790129268186.jpg'),
    output: path.join(OUTPUT_DIR, 'gallery-quill-bales.webp'),
  },
  {
    input: path.join(UPLOAD_DIR, 'media_1790129301882.jpg'),
    output: path.join(OUTPUT_DIR, 'gallery-quill-stacks.webp'),
  },
];

async function convertUploaded() {
  for (const { input, output } of imageMap) {
    try {
      await sharp(input)
        .webp({ quality: 85, effort: 6 })
        .toFile(output);
      console.log(`Converted ${input} -> ${output}`);
    } catch (e) {
      console.error(`Error converting ${input}:`, e);
    }
  }
}

convertUploaded();

import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function getImageMeta(folderName: string) {
  const folderPath = path.resolve(process.cwd(), `public/images/${folderName}`);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath)
    .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
    .map(file => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      return {
        src: `/images/${folderName}/${file}`,
        caption: file.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        date: stats.birthtimeMs,
      };
    });
}

export default function viteImageMetaPlugin(): Plugin {
  return {
    name: 'vite-image-meta-plugin',
    resolveId(id) {
      if (id.startsWith('virtual:image-meta:')) return id;
    },
    load(id) {
      if (id.startsWith('virtual:image-meta:')) {
        const folder = id.split(':')[2];
        const images = getImageMeta(folder);
        return `export default ${JSON.stringify(images)};`;
      }
    }
  };
}

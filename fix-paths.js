import fs from 'fs';
import path from 'path';

const distDir = './dist';
const turtelboostDir = './turtelboost-deploy';

function fixPaths(dir) {
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix absolute paths to relative
        content = content.replace(/href="\/_astro/g, 'href="./_astro');
        content = content.replace(/src="\/_astro/g, 'src="./_astro');
        content = content.replace(/href="\/favicon/g, 'href="./favicon');
        content = content.replace(/href="\/images/g, 'href="./images');
        content = content.replace(/href="\/blog/g, 'href="./blog');
        content = content.replace(/content="\/images/g, 'content="./images');

        fs.writeFileSync(filePath, content);
        console.log('Fixed:', filePath);
      }
    });
  }
  walkDir(dir);
}

fixPaths(distDir);
fixPaths(turtelboostDir);
console.log('Done fixing paths!');

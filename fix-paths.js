import fs from 'fs';
import path from 'path';

const distDir = './dist';
const turtelboostDir = './turtelboost-deploy';

function fixPaths(dir) {
  function walkDir(dir, depth = 0) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath, depth + 1);
      } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Calculate relative prefix based on depth
        const prefix = depth > 0 ? '../'.repeat(depth) : './';

        // Fix absolute paths to relative
        content = content.replace(/href="\/_astro/g, `href="${prefix}_astro`);
        content = content.replace(/src="\/_astro/g, `src="${prefix}_astro`);
        content = content.replace(/href="\/favicon/g, `href="${prefix}favicon`);
        content = content.replace(/href="\/images/g, `href="${prefix}images`);
        content = content.replace(/href="\/blog/g, `href="${prefix}blog`);
        content = content.replace(/content="\/images/g, `content="${prefix}images`);

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

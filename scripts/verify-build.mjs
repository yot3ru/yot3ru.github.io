import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const rootPath = root.pathname.replace(/^\/(.:\/)/, '$1');
const required = ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'CNAME', '.nojekyll'];
const errors = [];

for (const file of required) {
  if (!existsSync(join(rootPath, file))) errors.push(`Missing required output: ${file}`);
}

if (existsSync(join(rootPath, 'CNAME'))) {
  const cname = readFileSync(join(rootPath, 'CNAME'), 'utf8').trim();
  if (cname !== 'lufi.lk') errors.push(`CNAME must contain only lufi.lk; found: ${cname}`);
}

const textFiles = [];
const collect = (directory) => {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name);
    if (statSync(file).isDirectory()) collect(file);
    else if (['.html', '.css', '.js'].includes(extname(file))) textFiles.push(file);
  }
};

if (existsSync(rootPath)) collect(rootPath);

for (const file of textFiles) {
  const source = readFileSync(file, 'utf8');
  if (/127\.0\.0\.1|localhost|node_modules/.test(source)) {
    errors.push(`Development-only reference in ${relative(rootPath, file)}`);
  }

  const references = source.matchAll(/["'(](\/(?:_astro|fonts|img|video)\/[^"'()\s,?#]+)/g);
  for (const [, reference] of references) {
    const output = join(rootPath, decodeURI(reference).replace(/^\//, ''));
    if (!existsSync(output)) errors.push(`Missing asset ${reference} referenced by ${relative(rootPath, file)}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Verified ${required.length} required files and ${textFiles.length} generated text assets.`);

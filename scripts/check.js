import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const requiredFiles = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '_redirects',
  'assets/favicon.svg',
  'assets/hero-7lleva.png',
  'assets/7lleva-icon.png'
];
const forbiddenTextPatterns = [/\.env/i, /access_token/i, /api[_-]?key/i];
const forbiddenReadablePatterns = [/\b\d{10}\b/];
const requiredTextPatterns = [
  /Próximamente/i,
  /Estamos preparando el lanzamiento/i,
  /Durante la etapa inicial, 7Lleva no cobrará comisión/i,
  /San José de Gracia/i,
  /Mazamitla/i,
  /Valle de Juárez/i,
  /Sahuayo/i,
  /Jiquilpan/i,
  /Guadalajara/i,
  /soporte@7lleva\.com/i,
  /contacto@7lleva\.com/i,
  /legal@7lleva\.com/i
];

function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walkFiles(absolutePath);
    }
    return absolutePath;
  });
}

if (!fs.existsSync(distDir)) {
  throw new Error('Primero ejecuta npm run build.');
}

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(distDir, file)));
if (missingFiles.length) {
  throw new Error(`Faltan archivos en dist: ${missingFiles.join(', ')}`);
}

const textFiles = walkFiles(distDir).filter((file) => /\.(html|txt|xml|css|js|json|svg)$/i.test(file));
const textBundle = textFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');

for (const file of textFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const pattern of forbiddenTextPatterns) {
    if (pattern.test(content)) {
      throw new Error(`Dato sensible encontrado en ${path.relative(distDir, file)}: ${pattern}`);
    }
  }

  if (!file.endsWith('.js')) {
    for (const pattern of forbiddenReadablePatterns) {
      if (pattern.test(content)) {
        throw new Error(`Telefono personal probable en ${path.relative(distDir, file)}: ${pattern}`);
      }
    }
  }
}

for (const pattern of requiredTextPatterns) {
  if (!pattern.test(textBundle)) {
    throw new Error(`Texto obligatorio no encontrado en dist: ${pattern}`);
  }
}

console.log('Revision estatica OK.');

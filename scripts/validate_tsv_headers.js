// Simple TSV header validator for ARIX templates
// expected map: file path => required headers (tab-separated)
const fs = require('fs');
const checks = [
  { file: 'templates/trigger_classification_template.tsv',
    headers: ['trigger','category','action','priority','note'] },
  { file: 'hooks/memory_hooks_template.tsv',
    headers: ['hook','pattern','category','target','note'] }
];

let failed = 0;
for (const c of checks) {
  if (!fs.existsSync(c.file)) {
    console.log(`ℹ️ Skip: ${c.file} not found`);
    continue;
  }
  const firstLine = fs.readFileSync(c.file, 'utf8').split(/\r?\n/)[0].trim();
  const got = firstLine.split('\t');
  const need = c.headers;
  const ok = need.every((h, i) => got[i] === h);
  if (!ok) {
    console.error(`❌ Header mismatch in ${c.file}\n got: ${got.join('|')}\nneed: ${need.join('|')}`);
    failed++;
  } else {
    console.log(`✅ Header OK: ${c.file}`);
  }
}
if (failed) process.exit(1);
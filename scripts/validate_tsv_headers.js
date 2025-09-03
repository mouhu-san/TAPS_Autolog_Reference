// Simple TSV header validator for pj attachments.
// Add files + expected headers here.
const fs = require('fs');

const targets = [
  {
    path: 'pj/attachments/arix_id_to_uuid_map.tsv',
    headers: ['arix_id','uuid','source','created_at','updated_at','notes']
  },
  {
    path: 'pj/pj_index.tsv',
    optional: true,
    headers: ['pj_id','title_canvas','title_md','file_relpath','canvas_name','status','last_updated']
  }
];

let failed = false;

for (const t of targets) {
  if (!fs.existsSync(t.path)) {
    if (t.optional) {
      console.log(`ℹ️ skip (optional not found): ${t.path}`);
      continue;
    } else {
      console.error(`❌ missing required file: ${t.path}`);
      failed = true;
      continue;
    }
  }
  const firstLine = fs.readFileSync(t.path, 'utf8').split(/\r?\n/)[0].trim();
  const got = firstLine.split('\t');
  const want = t.headers;
  const ok = want.every((h,i)=> got[i] === h);
  if (!ok) {
    console.error(`❌ header mismatch: ${t.path}\n  expected: ${want.join('\t')}\n  got     : ${got.join('\t')}`);
    failed = true;
  } else {
    console.log(`✅ header ok: ${t.path}`);
  }
}

if (failed) process.exit(2);
console.log('🎉 TSV header validation passed');

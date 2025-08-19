// scripts/validate_tsv_headers.js
// Usage: node scripts/validate_tsv_headers.js
// Exits with code 0 if all TSV headers match; 1 if any mismatch or error.

const fs = require('fs');
const path = require('path');

function readFileTrim(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').split(/\r?\n/)[0].trim() : null;
}

function fail(msg) {
  console.error(msg);
  process.exitCode = 1;
}

(function main() {
  try {
    const repoRoot = process.cwd(); // run from repo root
    const expectedPath = path.join(repoRoot, 'arix-16', 'templates', 'arix16_header.tsv');

    if (!fs.existsSync(expectedPath)) {
      fail(`Expected header file not found: ${expectedPath}`);
      process.exit(2);
    }

    const expected = readFileTrim(expectedPath);
    if (!expected) {
      fail(`Expected header appears empty: ${expectedPath}`);
      process.exit(2);
    }

    // directories to scan; adjust/add as needed
    const targets = [
      path.join(repoRoot, 'arix-16', 'examples', 'exports_sample'),
      path.join(repoRoot, 'exports') // optional project exports dir
    ];

    let foundAny = false;
    for (const dir of targets) {
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (const f of files) {
        if (f.isDirectory()) {
          // recurse into subdirs
          const subdir = path.join(dir, f.name);
          // simple recursion: find .tsv files under this subdir
          const recFiles = fs.readdirSync(subdir, { withFileTypes: true });
          for (const rf of recFiles) {
            if (!rf.isDirectory() && rf.name.endsWith('.tsv')) {
              foundAny = true;
              const fp = path.join(subdir, rf.name);
              const actual = readFileTrim(fp);
              if (actual !== expected) {
                console.error(`MISMATCH: ${fp}`);
                console.error(`Expected: ${expected}`);
                console.error(`Actual  : ${actual}`);
                process.exitCode = 1;
              } else {
                console.log(`OK: ${fp}`);
              }
            }
          }
        } else if (f.isFile() && f.name.endsWith('.tsv')) {
          foundAny = true;
          const fp = path.join(dir, f.name);
          const actual = readFileTrim(fp);
          if (actual !== expected) {
            console.error(`MISMATCH: ${fp}`);
            console.error(`Expected: ${expected}`);
            console.error(`Actual  : ${actual}`);
            process.exitCode = 1;
          } else {
            console.log(`OK: ${fp}`);
          }
        }
      }
    }

    if (!foundAny) {
      console.warn('No .tsv files found in target directories (check paths in script).');
    }

    if (process.exitCode === 1) {
      console.error('One or more TSV headers mismatched.');
      process.exit(1);
    } else {
      console.log('All TSV headers matched (or no files found).');
      process.exit(0);
    }

  } catch (err) {
    console.error('Error in validate_tsv_headers.js:', err);
    process.exit(2);
  }
})();

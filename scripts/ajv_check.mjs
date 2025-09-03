#!/usr/bin/env node
// Minimal AJV runner with config + formats + JSON/JSONL support
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const args = process.argv.slice(2);
const get = (k, d=null) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i+1] : d;
};

const schemaPath = get('--schema');
const dataPath   = get('--data');
const configPath = get('--config','./arix-16/config/ajv_config.json');

if (!schemaPath || !dataPath) {
  console.error('Usage: node scripts/ajv_check.mjs --schema <path> --data <file|dir> [--config <path>]');
  process.exit(2);
}

// load config (optional)
let ajvOpts = { strict: true, allErrors: false, allowUnionTypes: true };
try {
  if (fs.existsSync(configPath)) {
    const user = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    ajvOpts = { ...ajvOpts, ...user };
  }
} catch (e) {
  console.warn('⚠️ config load warning:', e.message);
}

const ajv = new Ajv(ajvOpts);
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validate = ajv.compile(schema);

let failCount = 0, passCount = 0;

function validateJson(obj, origin) {
  const ok = validate(obj);
  if (!ok) {
    failCount++;
    console.error(`❌ ${origin}\n${ajv.errorsText(validate.errors, { separator: '\n' })}\n`);
  } else {
    passCount++;
  }
}

function validateJsonl(content, origin) {
  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    try {
      validateJson(JSON.parse(trimmed), `${origin}:L${idx+1}`);
    } catch (e) {
      failCount++;
      console.error(`❌ ${origin}:L${idx+1}\nJSON parse error: ${e.message}\n`);
    }
  });
}

function walk(target) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    fs.readdirSync(target).forEach(f => walk(path.join(target, f)));
  } else if (stat.isFile()) {
    const lower = target.toLowerCase();
    if (lower.endsWith('.json')) {
      validateJson(JSON.parse(fs.readFileSync(target, 'utf8')), target);
    } else if (lower.endsWith('.jsonl') || lower.endsWith('.ndjson')) {
      validateJsonl(fs.readFileSync(target, 'utf8'), target);
    }
  }
}

walk(dataPath);
console.log(`✅ passed: ${passCount}  ❗failed: ${failCount}`);
process.exit(failCount > 0 ? 1 : 0);

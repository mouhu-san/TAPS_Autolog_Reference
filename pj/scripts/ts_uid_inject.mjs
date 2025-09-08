#!/usr/bin/env node
/**
 * ts_uid_inject.mjs
 * - 行ごとに ts/uid を自動付与（JSONLはフィールド追加、非JSONは先頭に ts:/uid:）
 * Usage:
 *   node ts_uid_inject.mjs -i input.txt -o output.txt --start 1 --tz +09:00
 * 使い方例：
 * node reference/pj5/scripts/ts_uid_inject.mjs -i logs.md -o logs_tagged.md --start 100 --tz local
 * 注意：node 18+ で書かれています
 */
import fs from "node:fs";
import { EOL } from "node:os";

function parseArgs(argv) {
  const args = { infile: "-", outfile: "-", start: 1, tz: "local" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-i" || a === "--infile") args.infile = argv[++i] || "-";
    else if (a === "-o" || a === "--outfile") args.outfile = argv[++i] || "-";
    else if (a === "--start") args.start = parseInt(argv[++i] || "1", 10);
    else if (a === "--tz") args.tz = argv[++i] || "local";
  }
  return args;
}

function nowIso(tzopt) {
  const d = new Date();
  if (tzopt === "utc") return new Date(d.toISOString().split(".")[0] + "Z").toISOString();
  if (tzopt === "local") {
    const pad = (n) => String(n).padStart(2, "0");
    const off = -d.getTimezoneOffset(); // 分（日本は+540）
    const sign = off >= 0 ? "+" : "-";
    const hh = pad(Math.floor(Math.abs(off) / 60));
    const mm = pad(Math.abs(off) % 60);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .replace("Z", "");
    return `${local}${sign}${hh}:${mm}`;
  }
  // +09:00 等
  const m = /^([+-])(\d{2}):?(\d{2})$/.exec(tzopt);
  if (m) {
    // 近似: ローカル時刻に指定オフセットを付与
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .replace("Z", "");
    return `${local}${m[1]}${m[2]}:${m[3]}`;
  }
  return d.toISOString();
}

function tsCompact(iso) {
  return iso.replace(/[-:]/g, "");
}

function genUid(iso, seq) {
  return `${tsCompact(iso)}-${String(seq).padStart(4, "0")}`;
}

function looksJson(s) {
  const t = s.trim();
  return t.startsWith("{") && t.endsWith("}");
}

function processLine(line, seq, tzopt) {
  if (!line.trim()) return { out: line, seq };
  const iso = nowIso(tzopt);
  const uid = genUid(iso, seq);

  if (looksJson(line)) {
    try {
      const obj = JSON.parse(line);
      let changed = false;
      if (!("ts" in obj)) { obj.ts = iso; changed = true; }
      if (!("uid" in obj)) { obj.uid = uid; changed = true; }
      if (changed) seq++;
      return { out: JSON.stringify(obj), seq };
    } catch {}
  }
  const hasTs = /\bts:/.test(line);
  const hasUid = /\buid:/.test(line);
  const prefix = [];
  if (!hasTs) prefix.push(`ts:${iso}`);
  if (!hasUid) prefix.push(`uid:${uid}`);
  if (prefix.length) { seq++; return { out: `${prefix.join(" ")} ${line.trimEnd()}`, seq }; }
  return { out: line.trimEnd(), seq };
}

async function main() {
  const args = parseArgs(process.argv);
  const input = args.infile === "-" ? fs.readFileSync(0, "utf-8") : fs.readFileSync(args.infile, "utf-8");
  const lines = input.replace(/\r\n/g, "\n").split("\n");

  let seq = args.start;
  const outLines = [];
  for (const ln of lines) {
    const { out, seq: s2 } = processLine(ln, seq, args.tz);
    seq = s2;
    outLines.push(out);
  }
  const outStr = outLines.join(EOL) + EOL;
  if (args.outfile === "-") process.stdout.write(outStr);
  else fs.writeFileSync(args.outfile, outStr, "utf-8");
}
main().catch((e) => { console.error(e); process.exit(1); });

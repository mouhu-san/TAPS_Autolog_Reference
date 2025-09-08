#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ts_uid_inject.py
- 行ごとに ts(ISO8601) と uid を自動付与
- JSON行(JSONL)は 'ts' / 'uid' フィールドを追加
- それ以外の行は先頭に 'ts:...' と 'uid:...' を付与
- 既に存在する場合は上書きしない
Usage:
python ts_uid_inject.py -i input.txt -o output.txt
cat input.jsonl | python ts_uid_inject.py > out.jsonl
Options:
--start 100  … uid連番の開始値（デフォルト=1）
--tz utc|local|+09:00 … tsのタイムゾーン（既定: local）
使い方例:
# Pythonスクリプトを直接実行
python reference/pj5/scripts/ts_uid_inject.py -i input.jsonl -o output.jsonl --tz +09:00
"""

import sys, argparse, json, re, datetime
from datetime import timezone, timedelta

def now_iso(tzopt:str) -> str:
    if tzopt == "utc":
        return datetime.datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    if tzopt == "local":
        return datetime.datetime.now().astimezone().replace(microsecond=0).isoformat()
    # offset形式 +09:00 等
    m = re.fullmatch(r'([+-])(\d{2}):?(\d{2})', tzopt or "")
    if m:
        sign, hh, mm = m.groups()
        offs = int(hh)*60+int(mm)
        if sign == "-": offs = -offs
        tz = timezone(timedelta(minutes=offs))
        return datetime.datetime.now(tz).replace(microsecond=0).isoformat()
    # フォールバック
    return datetime.datetime.now().astimezone().replace(microsecond=0).isoformat()

def ts_compact(iso: str) -> str:
    # 2025-09-05T23:59:47+09:00 -> 20250905T235947+0900
    return re.sub(r'[-:]', "", iso).replace("+", "+").replace("T", "T")

def gen_uid(iso: str, seq: int) -> str:
    # ts圧縮 + 4桁連番
    return f"{ts_compact(iso)}-{seq:04d}"

def is_json_line(s: str) -> bool:
    s = s.strip()
    return s.startswith("{") and s.endswith("}")

def inject_line(line: str, seq: int, tzopt: str):
    if not line.strip():
        return line, seq
    iso = now_iso(tzopt)
    uid = gen_uid(iso, seq)

    if is_json_line(line):
        try:
            obj = json.loads(line)
            changed = False
            if "ts" not in obj:
                obj["ts"] = iso
                changed = True
            if "uid" not in obj:
                obj["uid"] = uid
                changed = True
            if changed:
                seq += 1
            return json.dumps(obj, ensure_ascii=False), seq
        except json.JSONDecodeError:
            pass  # 非JSONとして処理

    # Markdown等：ts: と uid: が無ければ先頭に付与
    has_ts = re.search(r'\bts:', line)
    has_uid = re.search(r'\buid:', line)
    prefix = []
    if not has_ts:
        prefix.append(f"ts:{iso}")
    if not has_uid:
        prefix.append(f"uid:{uid}")
    if prefix:
        seq += 1
        return (" ".join(prefix) + " " + line.rstrip("\n")), seq
    return line.rstrip("\n"), seq

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--infile", default="-")
    ap.add_argument("-o", "--outfile", default="-")
    ap.add_argument("--start", type=int, default=1)
    ap.add_argument("--tz", choices=["utc","local"], default="local",
                    help="ISO時刻のタイムゾーン（local/utc）。+09:00等の手動指定も可。")
    args = ap.parse_args()

    fin = sys.stdin if args.infile == "-" else open(args.infile, "r", encoding="utf-8", newline="")
    fout = sys.stdout if args.outfile == "-" else open(args.outfile, "w", encoding="utf-8", newline="\n")

    seq = args.start
    try:
        for raw in fin:
            out, seq = inject_line(raw, seq, args.tz)
            fout.write(out + "\n")
    finally:
        if fin is not sys.stdin: fin.close()
        if fout is not sys.stdout: fout.close()

if __name__ == "__main__":
    main()
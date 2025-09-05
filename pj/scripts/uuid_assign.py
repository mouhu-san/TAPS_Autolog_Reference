#!/usr/bin/env python3
"""
uuid_assign.py — ARIX-16 ↔ UUID マップ自動生成・付与ツール
Usage:
  python uuid_assign.py \
    --meta-jsonl pj/attachments/arix_metadata.jsonl \
    --map-tsv pj/attachments/arix_id_to_uuid_map.tsv \
    --write-back-jsonl

機能:
- JSONL(1行=1レコード)を読み、arix_id ごとに UUID を割当て/維持
- 既存の TSV マップを取り込み、同一 arix_id の UUID は再利用（安定性）
- --write-back-jsonl 指定時は JSONL へも uuid を追記して保存
- 空行/コメント(#)行はスキップ
"""
import argparse, sys, os, csv, uuid, hashlib, datetime, json
from collections import OrderedDict

def read_jsonl(path):
    records = []
    if not os.path.exists(path):
        return records
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            try:
                rec = json.loads(line)
                records.append(rec)
            except json.JSONDecodeError as e:
                print(f"[WARN] JSON decode error: {e} line={line[:120]}...", file=sys.stderr)
    return records

def read_map_tsv(path):
    m = OrderedDict()
    if not os.path.exists(path):
        return m
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            arix = row.get("arix_id", "").strip()
            uid  = row.get("uuid", "").strip()
            if arix and uid:
                m[arix] = row
    return m

def write_map_tsv(path, rows):
    headers = ["arix_id","uuid","source","created_at","updated_at","notes"]
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, delimiter="\t", fieldnames=headers)
        w.writeheader()
        for r in rows.values():
            out = {h: r.get(h, "") for h in headers}
            w.writerow(out)

def assign_uuid(arix_id, mode="v4"):
    if mode == "sha3-224":
        h = hashlib.sha3_224(arix_id.encode("utf-8")).hexdigest()
        # 表示は UUID 風に整形せず、ハッシュ文字列のまま返す（衝突極小）
        return h
    else:
        return str(uuid.uuid4())

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--meta-jsonl", default="pj/attachments/arix_metadata.jsonl")
    ap.add_argument("--map-tsv",    default="pj/attachments/arix_id_to_uuid_map.tsv")
    ap.add_argument("--uuid-mode",  choices=["v4","sha3-224"], default="v4")
    ap.add_argument("--write-back-jsonl", action="store_true")
    ap.add_argument("--out-jsonl",  default=None, help="未指定時: <meta-jsonl> を上書き（--write-back-jsonl時）")
    args = ap.parse_args()

    meta = read_jsonl(args.meta_jsonl)
    amap = read_map_tsv(args.map_tsv)
    now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

    added, reused, updated = 0,0,0
    for rec in meta:
        arix = rec.get("arix_id") or rec.get("arix") or rec.get("ARIX") or ""
        arix = str(arix).strip()
        if not arix:
            print(f"[WARN] missing arix_id in record: {rec}", file=sys.stderr)
            continue

        # 既存TSVにあれば再利用
        row = amap.get(arix)
        if row:
            uid = row.get("uuid","").strip()
            if not uid:
                uid = assign_uuid(arix, args.uuid_mode)
                row["uuid"] = uid
                row["updated_at"] = now
                updated += 1
            else:
                reused += 1
        else:
            uid = assign_uuid(arix, args.uuid_mode)
            amap[arix] = {
                "arix_id": arix,
                "uuid": uid,
                "source": "uuid_assign.py",
                "created_at": now,
                "updated_at": now,
                "notes": ""
            }
            added += 1

        # JSONL に uuid を反映（任意）
        if args.write_back_jsonl:
            rec["uuid"] = amap[arix]["uuid"]

    write_map_tsv(args.map_tsv, amap)

    if args.write_back_jsonl:
        out = args.out_jsonl or args.meta_jsonl
        with open(out, "w", encoding="utf-8") as f:
            for rec in meta:
                f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    print(f"[DONE] map: {args.map_tsv}  added={added} reused={reused} updated={updated}")
    if args.write_back_jsonl:
        print(f"[DONE] jsonl: {args.out_jsonl or args.meta_jsonl}")

if __name__ == "__main__":
    main()

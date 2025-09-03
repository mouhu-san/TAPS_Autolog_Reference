#!/usr/bin/env python3
"""
tag_aggregator.py — ARIX-16 タグ集計・辞書生成ツール
Usage:
  python tag_aggregator.py \
    --meta-jsonl pj/attachments/arix_metadata.jsonl \
    --out-tsv pj/attachments/arix_tags_aggregated.tsv \
    [--dict-csv pj/attachments/arix_tags.csv]

機能:
- JSONL の tags 配列を集計し、頻度とサンプル arix_id を出力
- 任意で tags辞書(arix_tags.csv)を読み込み、説明文を付加
"""
import argparse, sys, os, csv, json
from collections import defaultdict, OrderedDict

def read_jsonl(path):
    recs = []
    if not os.path.exists(path):
        return recs
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            try:
                recs.append(json.loads(line))
            except json.JSONDecodeError as e:
                print(f"[WARN] JSONL parse error: {e}", file=sys.stderr)
    return recs

def read_tag_dict(path):
    d = {}
    if not os.path.exists(path):
        return d
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            tag = row.get("tag","").strip()
            if tag:
                d[tag] = row
    return d

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--meta-jsonl", default="pj/attachments/arix_metadata.jsonl")
    ap.add_argument("--out-tsv",    default="pj/attachments/arix_tags_aggregated.tsv")
    ap.add_argument("--dict-csv",   default="pj/attachments/arix_tags.csv")
    ap.add_argument("--samples",    type=int, default=5, help="tagごとに表示する arix_id サンプル数")
    args = ap.parse_args()

    recs = read_jsonl(args.meta_jsonl)
    tdict = read_tag_dict(args.dict_csv)

    counts = defaultdict(int)
    sample_ids = defaultdict(list)

    for r in recs:
        arix = str(r.get("arix_id") or r.get("arix") or "")
        tags = r.get("tags") or []
        if isinstance(tags, str):
            # カンマ区切り文字列にも一応対応
            tags = [t.strip() for t in tags.split(",") if t.strip()]
        for t in tags:
            counts[t] += 1
            if len(sample_ids[t]) < args.samples and arix:
                sample_ids[t].append(arix)

    # 出力
    headers = ["tag","count","desc","examples"]
    os.makedirs(os.path.dirname(args.out_tsv), exist_ok=True)
    with open(args.out_tsv, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, delimiter="\t")
        w.writerow(headers)
        for tag, cnt in sorted(counts.items(), key=lambda kv: (-kv[1], kv[0])):
            desc = (tdict.get(tag, {}).get("desc") or
                    tdict.get(tag, {}).get("description") or "")
            examples = ";".join(sample_ids[tag])
            w.writerow([tag, cnt, desc, examples])

    print(f"[DONE] tag aggregation -> {args.out_tsv}  tags={len(counts)}")

if __name__ == "__main__":
    main()

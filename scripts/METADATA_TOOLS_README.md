# Metadata Tools (UUID & Tags)

- `scripts/uuid_assign.py` : `arix_metadata.jsonl` を読み、`arix_id_to_uuid_map.tsv` を更新。必要に応じ JSONL へ uuid を書き戻し。
- `scripts/tag_aggregator.py` : メタの `tags` を集計し、`arix_tags_aggregated.tsv` を生成。
- `scripts/run_metadata_tools.ps1` : Windows 一括実行。

## Quick Start
```powershell
# repo ルート想定
python scripts/uuid_assign.py --meta-jsonl pj/attachments/arix_metadata.jsonl --map-tsv pj/attachments/arix_id_to_uuid_map.tsv --write-back-jsonl
python scripts/tag_aggregator.py --meta-jsonl pj/attachments/arix_metadata.jsonl --out-tsv pj/attachments/arix_tags_aggregated.tsv --dict-csv pj/attachments/arix_tags.csv
```

出力:
- `pj/attachments/arix_id_to_uuid_map.tsv`（追記/更新）
- `pj/attachments/arix_metadata.jsonl`（--write-back-jsonl 指定時に uuid 付与）
- `pj/attachments/arix_tags_aggregated.tsv`（タグ頻度集計）

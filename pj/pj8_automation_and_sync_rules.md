# pj8 / 自動化・同期ルール（ドラフト運用）

## レイヤ
- **Export**: ログ/Canvas → JSON(L)/TSV（テンプレは pj5 / templates）
- **Validate**: GitHub Actions（AJV/TSVヘッダ）※CI詳細は後で強化
- **Index**: `arix_id_to_uuid_map.tsv` で逆引き管理

## スクリプト配置（案だけ先に）
- `scripts/uuid_assign.py`（UUID付与）
- `scripts/tag_aggregator.py`（タグ集計）
- `scripts/export_ndjson.sh`（NDJSON化）

> CIは今は保留でOK。ドキュメントを先に固める。
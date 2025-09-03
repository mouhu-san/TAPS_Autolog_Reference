# run_metadata_tools.ps1 — Windows PowerShell ワンキー実行
# 使い方:
#   1) このファイルを repo ルートに保存
#   2) 実行: 右クリック→PowerShellで実行（必要に応じて ExecutionPolicy 設定）

param(
  [string]$MetaJsonl = "pj/attachments/arix_metadata.jsonl",
  [string]$MapTsv    = "pj/attachments/arix_id_to_uuid_map.tsv",
  [string]$TagDict   = "pj/attachments/arix_tags.csv"
)

python scripts/uuid_assign.py --meta-jsonl $MetaJsonl --map-tsv $MapTsv --write-back-jsonl
python scripts/tag_aggregator.py --meta-jsonl $MetaJsonl --out-tsv "pj/attachments/arix_tags_aggregated.tsv" --dict-csv $TagDict
Write-Host "DONE: UUID 付与 & タグ集計 完了" -ForegroundColor Green

# tools: スキーマ検証と整合チェック

## JSON Schema (ajv)
npm i -g ajv-cli
ajv validate -s ./arix-16/schema/arix16.schema.json   -d ./arix-16/examples/exports_sample/taps_arix16_2025-W33.jsonl --spec=draft2020

## 整合チェック
- UID 形式: TAPS-YYYY-MM-DD-SSS
- Prev/Next チェーン: 週内で欠損が無いこと
- JSONL/TSV 件数一致

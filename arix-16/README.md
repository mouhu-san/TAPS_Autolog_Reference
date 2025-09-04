# ARIX-16 Reference Package (TAPS)
人間可読 × 機械可読の両立を目的とした参照一式。GRAU-16 を ARIX-16 に名称統一済み。

## 収録物
- schema/arix16.schema.draft-2020-12.json … ARIX-16 JSON Schema（ajv等で検証可能）
- templates/arix16_header.tsv … TSVヘッダ（列順の契約）
- templates/04_Triggers.tsv … トリガ分類・実行ルーティング辞書
- templates/05_Memory.json … 記憶同期コンテキスト（運用規約）
- examples/arix16_block_example.md … 会話末に埋め込む ARIX-16 メタブロック例
- examples/exports_sample/taps_arix16_2025-W33.tsv … 出力TSVサンプル
- examples/exports_sample/taps_arix16_2025-W33.jsonl … 出力JSONLサンプル
- tools/README.md … スキーマ検証ガイド
- tools/ajv_config.json … ajv設定

## GitHub への取り込み手順（TAPS_Autolog_Reference）
1. リポジトリ直下に `arix-16/` ディレクトリを作成。
2. このZipを展開し、中身の `arix-16/` フォルダごと配置。
3. READMEの Quick Start から `arix-16/` 配下にリンクを張る。
4. コミット: 
   ```bash
   git add arix-16
   git commit -m "feat(ref): add ARIX-16 reference package (schema/templates/examples/tools)"
   git push
   ```

## Validation（任意）
```bash
npm i -g ajv-cli
ajv validate -s ./arix-16/schema/arix16.schema.draft-2020-12.json   -d ./arix-16/examples/exports_sample/taps_arix16_2025-W33.jsonl --spec=draft2020
```

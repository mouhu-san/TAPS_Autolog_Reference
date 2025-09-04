# pj2 / ARIX-16 仕様（定義）— 3-9-4 構造

> 更新日: 2025-09-03（JST）

## 1. 要約
ARIX-16 は **機械3 + 人間9 + 機械4** の 16 チャンクで構成される識別子体系。  
目的は「人間の意味」と「AIの安定照合」を同時に満たすこと。

```
ARIXv1 = M1-M2-M3-H1-H2-H3-H4-H5-H6-H7-H8-H9-M4-M5-M6-M7
```

例（参考・UI表示用）：
```
A16v1-TAPS-CANVAS-2025W35-PJ-spec-arix16-final-2025-09-03-AT-S01-v1-memo
```

## 2. 設計原則（抜粋）
- **可読×機械**：H系は短語・半角・日本語はスラグ化、M系は検索/照合の鍵。
- **日付/週番号**：M3 に `YYYYWww` を推奨（`2025W35` など）。
- **互換性**：破壊的変更時は `A16v2` を新発行、互換表で移行を追跡。

## 3. チャンク定義（v1.0）
| Chunk | 名称 | 例 | 用途 |
|---|---|---|---|
| M1 | システム種別 | `TAPS` | 最上位システム識別 |
| M2 | データクラス | `CANVAS` / `CHAT` / `DRIVE` / `GAS` | 媒体種別 |
| M3 | パーティションキー | `2025W35` / `2025-09-03` | 時間分割・検索主鍵 |
| H1 | プロジェクト略称 | `PJ` / `REF` / `AUTOLOG` | 人間可読 |
| H2 | 大カテゴリ | `spec` / `policy` / `template` | テーマ |
| H3 | 中カテゴリ | `arix16` / `splitting` | 詳細テーマ |
| H4 | フェーズ/状態 | `draft` / `wip` / `final` | 状態 |
| H5 | 日付 | `2025-09-03` | 読みやすい日付 |
| H6 | アクター | `DK` / `AT` | 担当者 |
| H7 | シーケンス | `S01` | 連番 |
| H8 | バリアント | `v1` / `altA` | 亜種 |
| H9 | フリーテキスト | `memo` | 補助 |
| M4 | UUID | `uuidv7()` | 一意性（別表管理も可） |
| M5 | ハッシュ | `sha3-224` 短縮 | 完整合検証 |
| M6 | NID | `000123` | 数値補助ID |
| M7 | 予約 | `rsv` | 将来拡張 |

> **UUID併用（仮設B）**：UUID は ARIX 本体に含めず、別ファイルで管理しても良い。UIは ARIX-16 を表示、DB主キーは UUID を採用。

## 4. 記法ルール
- 区切りは `-`、半角英数字と `_` のみ（空白・全角は不可）。
- H系は意味を保った短い英語/スラグにする（日本語は変換）。
- 生成順序：M1→M2→M3→H1..H9→M4→M5→M6→M7。

## 5. 付帯ファイル（テンプレ）
- [`arix_id_to_uuid_map.tsv`](./attachments/arix_id_to_uuid_map.tsv) — ARIX と UUID の逆引き表
- [`arix_tags.csv`](./attachments/arix_tags.csv) — タグ・用途DB
- [`arix_metadata.jsonl`](./attachments/arix_metadata.jsonl) — 拡張メタ
- [`arix16.schema.draft-2020-12.json`](./attachments/arix16.schema.draft-2020-12.json) — 文字列スキーマ（AJV 検証用・最小）

## 6. 検証
- AJV 例：`ajv validate -c ajv-formats -s ./attachments/arix16.schema.draft-2020-12.json -d ./attachments/arix_metadata.jsonl --spec=draft2020`
- TSV ヘッダ検証は pj8 の CI で `scripts/validate_tsv_headers.js` を用意。

## 7. 変更履歴
- 2025-09-03: 初版（v1.0）作成

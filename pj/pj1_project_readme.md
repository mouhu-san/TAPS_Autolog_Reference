---
ARIX: A16v1-TAPS-CANVAS-{{YYYYWww}}-PJ-index-readme
created: {{YYYY-MM-DD}}
updated: {{YYYY-MM-DD}}
ai_flags: ["Index","HumanFirst","AIReadable"]
tags: [pj1, overview, links, policy]
source: ["TAPS Driveスキャン計画（古い順を正とする）"]
---

# pj1 / README（概要＆リンク集・現在地）

> 運用原則：**過去ログは「古い方針を正」とし、後続が矛盾する場合は注記のうえ上書き**。

## 1) 概要（What / Why）
- プロジェクト：**TAPS_Autolog_Reference**（人間×タキオンの記録・分類・同期の参照実装）
- 目的：Canvas／Chat／Drive／GAS／GitHub を **ARIX-16（3-9-4）** の統一IDで結び、
  - 記録 → 構文抽出 → 自動分類 → 同期 → 再文脈化 を一貫化
  - 低エネルギー時の**ショートコマンド入力**を許容（後述）

## 2) 公式リンク集（現行）
### GitHub
- TAPSReference（本PJを格納）：<https://github.com/mouhu-san/TAPS_Autolog_Reference>
- Autolog（実装）：<https://github.com/mouhu-san/TAPS_Autolog>
- ClassificationSuite（分類）：<https://github.com/mouhu-san/TAPS_Autolog_ClassificationSuite>

### Google Drive / GAS / Sheet
- Drive（TAPS_Autolog）：<https://drive.google.com/drive/folders/11QaePI-fH_SJhsGVspdZnHj_f-FJ-FV2>
- Drive（TAPS_AEROG）：<https://drive.google.com/drive/folders/1X9zb7YSj_Bh8MnsjHAP3ySptI0q6R5Rt>
- Drive構造ツリー（Colab）：<https://colab.research.google.com/drive/13awpCuj5THP9jg2SbwLQtcvrfUMKcGTZ>
- フォルダIDとTree取得（Sheet）：<https://docs.google.com/spreadsheets/d/1rHSjlohPUOJtW8Zy7etEmUUnsbtWKGKVPzaLtH_aZO8/edit?usp=sharing>
- GAS：TAPS_Autolog_v1.0.0：<https://script.google.com/d/1_idg0F08hfDKtlBndTJwfMjUM1dc3TSqgliVTBBy1ZhACFBLNeN5AR11/edit>
- TAPS_LogMaster（Sheet）：<https://docs.google.com/spreadsheets/d/1HUSp2Zzj7olWJspi1gJfedvuxo0k6F5JreEvfFrYDW0/edit>
- TAPS_Summary_Generator（Sheet）：<https://docs.google.com/spreadsheets/d/18v3xRwDhH4_NHe_REA_CkdanhSYX1WXpjJ_JAIE_BSY/edit>
- Drive構造CSV：<https://drive.google.com/file/d/12ORNToxpw4UVfirHWOuq2GRYnjSxvABB/view>

> 注：リンクは **常にこの pj1 を正** とする。他所から参照する場合も、最終確認は本表。

## 3) 目次（pj1〜pj9 正式対応）
- pj2: **ARIX-16 仕様（定義）** — ID設計（3-9-4）・互換表・運用
- pj3: **Canvas 分類＆分割運用** — 容量閾値・命名・分岐／索引
- pj4: **命名・エクスポート事例集** — Good/Bad・アンチパターン
- pj5: **テンプレート集** — TSV/JSON/スクリプト雛形
- pj6: **FAQ・トラブル対策** — 検証・権限・Trigger
- pj7: **構造・データフロー** — Mermaid図・I/O一覧
- pj8: **自動化・同期ルール** — GAS/Actions/集計・逆引き
- pj9: **進捗＆ToDo** — 現在地・優先度・ロードマップ

## 4) 運用ルール（Tachyon-Readable）
- **ARIX-16 必須**：新規Canvas/ファイル作成時は ARIX / created / updated / tags を**先頭YAML**に記載。
- **Canvas古い方が正**：方針の矛盾は、古い決定を優先。上書きする際は「理由と日時」を本文先頭に記録。
- **分割時の索引**：元Canvas末尾に「分割先リンク＋要約（3行）」を残す。
- **ショートコマンド**（低エネルギー時）例：
- **仕様更新は **pj2（ARIX-16）** が唯一の正。pj8 は実装・同期の反映先。
- **Canvas名は `【<チャット名>】` で開始**し、ARIX-16・Created/Updated・Tags を本文冒頭に必ず記す。
- **pj 接頭（pj1〜pj9）は **GPTの ProjectFiles 専用**。Canvas命名には使わない。
- **pj_index.tsv の位置づけ** pj_index.tsv は *「pj ファイル群（リポジトリの ProjectFiles）」だけ**を管理する索引。
- **Canvasはチャット名プレフィックスで別管理**（必要なら canvas_index.tsv を増設）。

  - `@tap h-2 a-1 s-3 w-2 note: 頭痛`
  - `@tap memo: …`（メモ行だけ保存、後で整形）

## 5) Canvas 命名規則（正式）
- 形式：`【<チャットルーム名>】 <短い説明>（ARIX: <A16v1-...>）`
- 先頭メタ（本文1行目以降に必ず付与）：
  - `ARIX-16: A16v1-...`
  - `Created: YYYY-MM-DDThh:mm:ss+09:00`
  - `Updated: YYYY-MM-DDThh:mm:ss+09:00`
  - `Tags: #構造 #ToDo ...`

### 例
- タイトル：`【TAPS Driveスキャン計画】 PJ再配置の草案（ARIX: A16v1-TAPS-CANVAS-...）`
- 先頭メタ：
  - `ARIX-16: A16v1-TAPS-CANVAS-REF-PJ-RECONF-2025-W36-...`
  - `Created: 2025-09-04T00:00:00+09:00`
  - `Updated: 2025-09-04T00:00:00+09:00`
  - `Tags: #PJ #分割規約 #ARIX16`


- 先頭メタの例（追加サンプル）：
  - `ARIX-16: A16v1-TAPS-CANVAS-REF-PJ-RECONF-2025-W36-...`
  - `Created: 2025-09-04T00:00:00+09:00`
  - `Updated: 2025-09-04T00:00:00+09:00`
  - `Tags: #PJ #分割規約 #ARIX16`




## 6) 未完タスク（短期 / 優先）
- [ ] pj2 に **UUID逆引き表 arix_id_to_uuid_map.tsv** の雛形追記
- [ ] pj8 に **TSV/JSON 検証CI** の手順書を転記
- [ ] pj5 に **trigger_classification_template.tsv** の最新版反映
- [ ] pj9 に **ロードマップ（週次）** 骨子記入

## 7) 変更履歴（Changelog）
- 2025-09-02：初版作成（Canvas統合・リンク表整備・運用原則の明文化）

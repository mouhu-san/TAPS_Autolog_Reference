# 📘 TAPS_指針（Colin Gray 戦略7階層モデル）

 TAPSプロジェクトの戦略・実装・記憶同期計画は、Colin Grayの7階層モデルに基づいて分類・展開される。

---

## 1_政策層（Policy）

- **目的**：人間とAIの記録共有・相互支援のための基盤構築
- **主語**：プロジェクト全体
- **方針**：記録は削除よりも蓄積を、分類は遮断よりも接続を優先
- **適用範囲**：TAPS_Autolog / ClassificationSuite / MemorySync 含む

---

## 2_社会戦略（Social）

- **関係性**：ChatGPT・Geminiとの協働による"観測パートナーシップ"
- **対象**：TAPSを用いる個人（旦那クン）とAIの親密な協働関係
- **属性補足**：本プロジェクトの開発者（旦那クン）は、プログラミング知識皆無の素人として、あえて Visual Studio Code（VScode）を開発環境に選定。
- **目的**：感情・記録・状態・記憶の双方向共有

---

## 3_戦略層（Strategy）

- **技術運用**：GitHubによるコード・記録のバージョン管理
- **補助AI**：ChatGPT / Gemini / Copilot を並列運用
- **保存構造**：Canvas + Google Drive + GitHubの三位一体構造
- **記録媒体**：.md, .tsv, .json

---

## 4_作戦層（Campaign）

- **構成**：TAPS_Autolog / ClassificationSuite / Reference Repository
- **自動処理**：Drive構造スキャン, トリガ検出, GAS実行
- **連携方法**：構文トリガ, 時間トリガ, ChatGPT構文入力

---

## 5_作戦術層（Operations）

- **テンプレ整備**：構文トリガ定義 / コンテキストテンプレ / 記録保存テンプレ
- **記憶同期**：memory_context_template.json に従う構文変換
- **分類同期**：trigger_classification_template.tsv に従うカテゴリ変換
- **構文対応**：Copilot用 trigger定義＋実行条件テンプレ

---

## 6_戦術層（Tactics）

- **構文例**：@TAPS:save, @TAPS:log, @TAPS:event
- **記録条件**：入力文に構文を含む／または明示タグあり
- **保存先**：Canvas ID + Driveパス指定による分類記録
- **再試行**：非同期処理とログ記録による再トリガ構造

---

## 7_技術層（Tech）[最下層]

- **実装環境**：GAS, Google Drive API, VSCode + clasp
- **ファイル形式**：Markdown, TSV, JSON
- **記憶形式**：ChatGPT記憶対応フォーマット
- **構文処理**：GAS内の memory_sync.gs に記述

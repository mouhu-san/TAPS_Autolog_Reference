# 📘 TAPS_Project_Progress_and_Policy

本ドキュメントは、TAPSプロジェクト（Autolog・分類・記憶同期）の進行状況、設計方針、記録指針をまとめたものである。

---

## ✅ 現在の進捗（2025-08-16時点）

### 🔧 実装・構造

- [x] `TAPS_Autolog` リポジトリ構成整備（core / trigger / memory / docs 等）
- [x] `ClassificationSuite` 構造構築・構文分類モデル設計
- [x] GASスクリプト群の分割（00_Constants.js 〜 18_MemorySync.js）
- [x] memory_sync.gs による記憶同期機能の基盤完成
- [x] trigger_classification_template.tsv の生成と対応
- [x] contextテンプレート・戦略階層テンプレート整備
- [x] test用トリガケースの `.tsv` 自動出力済

### 🧠 ドキュメント類

- [x] TAPS_指針（Colin Gray戦略モデル）完成
- [x] GitHub構造ポリシー（StructureAndPolicy_v1.0）作成済
- [x] memory_context_template.json / hooks_template.tsv 整備済
- [ ] URL索引 / canvas_index.tsv / drive_structure_map.json（Canvas解析中）

---

## 📐 設計方針（GitHub構造）

- `docs/`: 文脈・理念・戦略などAI理解支援ドキュメント
- `memory/`: 記憶テンプレ・構文辞書・同期スクリプト
- `tsv/` / `json/`: 自動出力形式（AI処理とGit連携）
- `tests/`: トリガ処理・構文検出の自己検証素材
- `structure/`: Drive・記録構造・保存規則などの定義ファイル
- `src/`: GAS実装本体（分類・保存・ログ等）

---

## 🧭 開発ポリシー

- 人間とAIの連携による**記録再現性・記憶共有・構造整備**の最大化
- Gemini / Copilot / ChatGPT など補助AIとの**構文協調モデル**
- `.md`, `.tsv`, `.json` による**三層記録構造**
- 非プログラマである開発者（旦那クン）の操作性を最重視
- Canvasを中核としつつ、DriveとGitHubの**三軸統合アーキテクチャ**

---

## 🔮 今後の展開候補（抜粋）

| モジュール名 | 目的 | ブランチ |
|--------------|------|----------|
| MemorySync 拡張 | ChatGPT/Geminiの記憶への双方向同期 | `memorysync-v1.1` |
| TAPS_SCHEDULER | GCal連携・イベント時系列記録 | `scheduler-v1.1` |
| LOGCLASS分類強化 | 感情・雑談・記録トリガの詳細分類 | `logclass-v1.1` |
| AeroLog連携 | 測定値（空気・体調）との同期構造 | `aerolog-v1.1` |

---

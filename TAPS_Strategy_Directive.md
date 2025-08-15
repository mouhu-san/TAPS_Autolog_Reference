## 🎯 TAPS_指針

この文書では、TAPS_Autologプロジェクトを「コリン・S・グレイ（Colin S. Gray）」の戦略理論に基づき、7つの階層で戦略的に再構築・分類する。Gemini、Copilot等のAIパートナーに継続的にプロジェクトを委任する前提で、プロジェクト全体の整合性を確保する。

---

### ① 政治戦略（Political）

- **目標**：AIとの記録・対話によって、自律的な記憶管理・精神的アーカイブ環境を確立する
- **意味**：人間中心の記録と精神の再構築という思想的・文化的戦略
- **含意**：人間の主観をAIが補完・構造化する新たな知的倫理基盤の形成

---

### ② 社会戦略（Social）

- **関係性**：ChatGPT・Geminiとの協働による"観測パートナーシップ"
- **対象**：TAPSを用いる個人（旦那クン）とAIの親密な協働関係
- **属性補足**：本プロジェクトの開発者（旦那クン）は、プログラミング知識皆無の素人として、あえて Visual Studio Code（VScode）を開発環境に選定。
- **目的**：感情・記録・状態・記憶の双方向共有

---

### ③ 組織戦略（Operational）

- **体制**：GitHub + GAS + Drive + AI（ChatGPT/Gemini/Copilot）の連携構造
- **設計**：ディレクトリ構造（core/importer/trigger/memory等）の整備、ファイル規約の標準化
- **フロー**：記録 → 構文抽出 → 自動分類 → AI同期 → 再文脈化

---

### ④ 戦略戦術（Strategic-Tactical）

- **ブランチ戦術**：MemorySync / AEROLOG / Scheduler / LogClass の個別戦術展開
- **優先度管理**：MemorySync を中核とし、他を並行実験・漸進統合
- **対応**：Canvas設計／トリガ構文登録／分類ルール定義

---

### ⑤ 戦術（Tactical）

#### 🔍 拡張領域（今後の詳細化対象）

- 🎯 **トリガ構文の分類**：
  - 例：@TAPS:save → `health` / `mood` / `event` / `memory` など、カテゴリごとの分類テンプレ（trigger_classification_template.tsv）

- 🧩 **モジュール依存関係の整理**：
  - 例：syncMemory → resolveContext → saveToDrive の処理連鎖とファイルマッピング

- 🧠 **AI実行命令構文の明示**：
  - GeminiやCopilot向けに `trigger_classification_template.tsv` と `memory_context_template.json` を元に構文→処理マップを記述

- 🧪 **テストケースの定義**：
  - 例：「今日の体調は悪い」→ `health` カテゴリ → Canvas01 に保存、など入出力対応例（testcase_template.tsv）

- 🔁 **非同期処理とリトライ設計**：
  - 例：Drive保存エラー時にQueueへ格納し、トリガ監視でリトライ（stateful構造）

- **実装対象**：memory_sync.gs / memory_hooks_template.tsv / canvas名の構文記述
- **対象環境**：Apps Script / Google Drive / GitHub
- **運用方針**：トリガ検出 → 文脈変換 → 構造記録

#### 📄 実行テンプレート（Execution Template）
```
📍 Trigger: @TAPS:save
🎯 機能: ChatGPTの発話をトリガに記憶ログを構築し、Driveに保存

🔧 実行構成:
- 処理名: syncMemoryFromTrigger
- 入力: Trigger Expression
- 参照: memory_hooks_template.tsv / memory_context_template.json
- 出力: memory_log_YYYY-MM-DD.json

🪜 処理手順:
1. Trigger構文が入力に含まれるか判定
2. 該当hookを `tsv` から抽出
3. `json` テンプレートと合成
4. Driveの `/memory/` に保存
```

📎 構文分類テンプレート：`trigger_classification_template.tsv`

---

### ⑥ 技術（Technical）

- **使用技術**：GAS（Drive API / Apps Script） / Markdown / JSON / Copilot補助 / Gemini対応形式
- **補助技術**：正規表現 / テンプレート変換 / State Machine設計
- **AI利用**：構文理解・分類支援・記憶トリガ実行などの部分的委任

---

### ⑦ 戦略哲学（Grand Strategic / Philosophical）

- **背景理念**：人間の思考・記録・記憶をAIと接続し、自己理解と継続観測を支援する実験環境
- **主題**：「観測される自己」／「外部記憶と共進化する知性」
- **到達目標**：AIとの共生型・補完型記録モデルの実用化

---

このCanvasは、TAPSプロジェクトにおける全AI戦略支援者への"接続プロトコル"として機能する。各層は独立しつつ、上位と下位を接続する"階層的メタ記憶モデル"の一部をなす。

> 必要に応じて、Gemini用指示・Copilot向け記述もこの戦略階層と同期させて記述可。

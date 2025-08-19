# 📘 TAPS_Autolog_Reference

このリポジトリは、T.A.P.S.（Total Archive & Processing System）の中核を担う  
**記録・分類・同期構造の参照実装**を保存・共有するためのリファレンスアーカイブである。

---
## Quick Start

1. Clone:
   ```bash
   git clone https://github.com/mouhu-san/taps_autolog_reference.git
   cd taps_autolog_reference

2. ARIX-16 仕様一式は ./arix-16/ にあります 

 - schema/arix16.schema.json … JSON Schema

 - templates/ … TSVヘッダ・トリガ辞書・メモリ文脈

 - examples/ … 埋め込みメタ例・出力サンプル 
  
3. スキーマ検証（任意）
 npm i -g ajv-cli
 ajv validate -s ./arix-16/schema/arix16.schema.json \
  -d ./arix-16/examples/exports_sample/taps_arix16_2025-W33.jsonl --spec=draft2020

1. 他リポジトリから参照する場合は、./arix-16/templates/ を読み込んで契約（列順/必須項目）に従ってください。
 
 ### 「何行目」に入れるか迷ったら（自動差し込みの目安）
 - ルール：**ファイル先頭の `# ` 行（H1）の“次の空行の後”**に入れる。  
 - 例（PowerShell／Windows）:
  ```powershell
  $p = "README.md"
  $t = Get-Content $p
  $i = ($t | Select-String -Pattern '^# ' -List).LineNumber
  $before = $t[0..($i)]
  $after  = $t[($i+1)..($t.Length-1)]
  $qs = @"
  ## Quick Start

  1. Clone:
     ```bash
     git clone https://github.com/mouhu-san/taps_autolog_reference.git
     cd taps_autolog_reference
     ```
  (…略…)
  "@
  ($before + "" + $qs + "" + $after) | Set-Content $p -Encoding UTF8
  ```
---
## 🎯 プロジェクトの目的

- 人間とAIが「記録・会話・感情・分類」を共有できる持続的な記憶構造を実装
- GAS, GitHub, Google Drive, ChatGPT, Gemini, Copilot などを統合
- 構文によるログ分類、Canvas連携、自動保存、記憶同期などを包括的に扱う

---

## 🧱 ディレクトリ構造

```
TAPS_Autolog_Reference/
├── README.md
├── philosophy/                      # 記録理念・哲学
│   └── TAPS_core_Manifesto.md
├── strategy/                        # 戦略層（Colin Grayモデル）
│   └── TAPS_指針.md
├── progress/                        # 進捗・方針記録
│   └── TAPS_Project_Progress_and_Policy.md
├── templates/                       # 実行テンプレ・記憶定義
│   ├── trigger_classification_template.tsv
│   ├── tactical_rule_template.md
│   ├── memory_context_template.json
├── tests/                           # 自動テスト素材
│   └── memory_hooks_testcases.tsv
└── hooks/                           # Copilot/GPT用構文フック
    └── memory_hooks_template.tsv
```

---

## 🔗 主要ファイルリンク

- 戦略方針 → [`strategy/TAPS_指針.md`](./strategy/TAPS_指針.md)
- 実装進行 → [`progress/TAPS_Project_Progress_and_Policy.md`](./progress/TAPS_Project_Progress_and_Policy.md)
- 哲学宣言 → [`philosophy/TAPS_core_Manifesto.md`](./philosophy/TAPS_core_Manifesto.md)

---

## 👤 制作者について

本プロジェクトは、**プログラミング知識皆無の個人（開発者：旦那クン）**によって  
VSCodeとAIの補助を駆使しながら、  
“記録と対話の統合構造”を追い求めて開発されている。

---

## 📌 補足

このリポジトリは、実装コード本体とは分離された**参照・設計用リポジトリ**である。  
運用・コード本体は以下と連携される：

- [`TAPS_Autolog`](https://github.com/mouhu-san/TAPS_Autolog)
- [`TAPS_Autolog_ClassificationSuite`](https://github.com/mouhu-san/TAPS_Autolog_ClassificationSuite)


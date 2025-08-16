# 📘 TAPS_Autolog_Reference

このリポジトリは、T.A.P.S.（Total Archive & Processing System）の中核を担う  
**記録・分類・同期構造の参照実装**を保存・共有するためのリファレンスアーカイブである。

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


# 📄 Tactical Rule Template

このテンプレートは、TAPS構文の分類と、それに対応するGASモジュールや保存構造を明示するための実行ルール定義ファイルです。

---

## 🎯 構文分類 → 実行構成

| トリガ構文 | カテゴリ | 使用モジュール | 出力先 | 保存Canvas |
|------------|----------|----------------|--------|------------|
| @TAPS:save | health   | syncMemoryFromTrigger | /memory/ | 01 |
| @TAPS:log  | mood     | syncMemoryFromTrigger | /memory/ | 02 |
| @TAPS:event| event    | syncMemoryFromTrigger | /canvas-raw/ | 05 |
| @TAPS:memory| memory  | syncMemoryFromTrigger | /log-summary/ | 03 |
| @TAPS:idea | idea     | syncMemoryFromTrigger | /canvas-raw/ | 08 |
| @TAPS:meta | meta     | syncMemoryFromTrigger | /meta/ | 99 |

---

## 🔧 モジュール依存フロー

```
Trigger → syncMemoryFromTrigger()
         → extractContext()
         → generateMemoryContext()
         → saveToDrive()
```

---

## 🧠 実行条件例

- トリガに @TAPS:save が含まれる場合 → category = health → Canvas01 に保存
- トリガが無効な場合 → 処理中止 + ログ出力

---

## 📌 対応テンプレート

- `trigger_classification_template.tsv`
- `memory_context_template.json`

このファイルは Gemini / Copilot 向けの構文処理マップとして活用されます。

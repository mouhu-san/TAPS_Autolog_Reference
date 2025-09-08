pj5 / テンプレート集（最低限）

このpjには“そのまま使える”雛形を集約する。詳細版は `/pj/templates/` 配下。

## 1) Canvas 分割テンプレ（貼って使う）

```
ARIX: A16v1-<…>
作成: <ISO8601> / 更新: <ISO8601>
タグ: #進捗 #設計
要約: <1行で要約>
リンク: 分割元
, 分割先A
, 分割先B
```
```markdown

### 🧩 ts/uid/ctx 埋め込みテンプレ

**Markdown（可視）**

```markdown
ts:2025-09-05T23:59:47+09:00 uid:20250905-001 ctx:TAPS心理観測
本文…
```

**Markdown（非表示）**
```html
<!-- ts:2025-09-05T23:59:47+09:00 uid:20250905-001 ctx:TAPS心理観測 -->
```

**JSONL 行テンプレ**
```json
{"UID":"<ARIX-16>","ts":"<ISO8601>","ctx":"<label>","text":"<content>"}
```

## 2) トリガ分類（TSVヘッダ例）

trigger category action priority note
@TAPS:save	memory save_to_drive 5 記録保存
@TAPS:scan	drive scan_tree 4 Drive構造取得


## 3) メモリ文脈（JSONスニペット）
```json
{"uid":"","title":"","summary":"","tags":[],"source":"chat","links":[]}

    実体ファイルは `/pj/templates/` にも同梱（この下のブロックを追加で作る）。
# pj8 / 自動化・同期ルール（ドラフト運用）

## ts 自動付与ルール（最小実装）

- すべての保存処理で「発言行」に `ts:` を自動付与する
- 既に `ts:` が存在する場合は上書きしない
- 必要に応じて `uid:`（短縮ID）も `ts:` から生成

## 🗺️ Drive/GAS 取り込み時の自動 ts 付与パス（図解）

```mermaid
flowchart TD
  A[ChatGPT / Gemini / Copilot<br/>（会話・トリガ）] --> B{{memory_hooks_template.tsv<br/>trigger_classification_template.tsv}}
  B --> C[Apps Script: memory_sync.gs<br/>ensureTs()/ensureUid()]
  C --> D[(JSONL生成)]
  D --> E[Drive /memory/ フォルダへ保存]
  E --> F{同期}
  F -->|手動 or Actions| G[GitHub repo (Autolog/Reference)]
  E --> H[LogMaster Sheets 取込（任意）]
  H --> I[集計/ダッシュボード]
```

### Apps Script (最小例)

```javascript
function ensureTs(line) {
  // 既存 ts を検出（JSON/Markdown双方を緩くカバー）
  if (/(\bts:|\\"ts\\")/.test(line)) return line;

  // ISO文字列（UTC）。JST固定にしたい場合は Utilities.formatDate などで変換可
  const iso = new Date().toISOString();

  // JSON行（JSONL）ならオブジェクトに差し込む
  if (line.trim().startsWith("{")) {
    try {
      const obj = JSON.parse(line);
      if (!obj.ts) obj.ts = iso;
      return JSON.stringify(obj);
    } catch (e) {
      // JSONでなければ素朴に先頭へ付与
    }
  }
  return `ts:${iso} ` + line;
}
```

## レイヤ
- **Export**: ログ/Canvas → JSON(L)/TSV（テンプレは pj5 / templates）
- **Validate**: GitHub Actions（AJV/TSVヘッダ）※CI詳細は後で強化
- **Index**: `arix_id_to_uuid_map.tsv` で逆引き管理

## スクリプト配置（案だけ先に）
- `scripts/uuid_assign.py`（UUID付与）
- `scripts/tag_aggregator.py`（タグ集計）
- `scripts/export_ndjson.sh`（NDJSON化）

## メモ
> CIは今は保留でOK。ドキュメントを先に固める
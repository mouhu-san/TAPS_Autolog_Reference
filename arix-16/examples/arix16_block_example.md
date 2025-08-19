本文: 「記憶の連続性を保つため、ARIX-16 の導入について…」

--- TAPS/ARIX-16 ---
UID: TAPS-2025-08-18-023
Timestamp: 2025-08-18T22:41:00+09:00
Speaker: user
Prev: TAPS-2025-08-18-022
Next: (pending)
TopicTag: memory_sync
Intent: decide
ThreadRoot: TAPS-2025-08-18-010
SummaryShort: ARIX-16 導入方針決定
SummaryLong: 会話を小瓶化し、UID/時刻/Prev/Next/ThreadRoot を明示。週次で Next を確定し、JSONL/TSV にエクスポートして AI/人間双方で参照可能にする。
ActionItems:
  - MAX_FILE_CHARS=10000 で本番運用へ
  - 日次/週次トリガを設定
Decisions:
  - 連番は TAPS-YYYY-MM-DD-SSS を採用
DataRefs:
  - Git: mouhu-san/TAPS_Autolog_Reference
RiskNotes: zip 配布不安定→TSV 直出しに切替
Metrics: chars=1420,tokens=210,elapsed_ms=1150
RawExcerpt: 記憶の連続性を……
--- END ARIX-16 ---

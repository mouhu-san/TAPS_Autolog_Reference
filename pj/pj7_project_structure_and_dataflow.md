# pj7 / プロジェクト構造・データフロー図（最小）

```mermaid
flowchart LR
  Chat[Chat/Canvas] -->|export| Drive[Google Drive]
  Drive -->|snapshot| Git[GitHub Reference]
  Git -->|CI validate| Status[Badge]
  Drive -->|index| AI[ChatGPT/Gemini/Copilot]

    出力置き場: DriveSnapshot/YYYY-WW/ → Git:snapshots/

    参照規格: `/pj/pj2`、テンプレ: `/pj/pj5`
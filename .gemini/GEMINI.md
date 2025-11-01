# コーディングの手順
1. 要件を.gemini/.tmp/requirements.mdに書き出す。
2. 設計を.gemini/.tmp/design.mdに書き出す。
3. 実装のために必要なタスクを.gemini/.tmp/task.mdに書き出す。
4. 実装作業を始める前に作業者に差分を提示する。
5. 作業者の承認後、タスク通りにコードを修正する。
6. ファイル構成が変更された場合、README.mdのディレクトリ構成を書き換える。
- backendに関する変更：backend/README.md
- frontendに関する変更:frontend/README.md

# コードルール
- 環境に依存する値は.envファイルに切り出すこと。
- TypeScriptにおいて、any, unknown型を使用しないこと。
- TypeScriptにおいて、classは使用しないこと。
- フロントエンドで表示される単語は日本語にすること。


# mdファイルについて
ファイルを出力するときは日本語にすること。

# 読み書き禁止ファイル
.env
*/.env
frontend/*
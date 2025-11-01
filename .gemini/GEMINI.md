# コーディングの手順
1. .idea/order.mdを元に、要件を.gemini/.tmp/requirements.mdに書き出す。
2. 設計を.gemini/.tmp/design.mdに書き出す。
3. 実装のために必要なタスクを.gemini/.tmp/task.mdに書き出す。
4. 実装作業を始める前に作業者に差分を提示する。
5. 作業者の承認後、タスク通りにコードを修正する。
6. ファイル構成が変更された場合、README.mdのディレクトリ構成を書き換える。
- バックエンドに関する変更：backend/README.md
- フロントエンドに関する変更:frontend/README.md

# コードルール
## 共通
- 環境に依存する値は.envファイルに切り出すこと。

## フロントエンド
- TypeScriptにおいて、any型を使用しないこと。
- TypeScriptにおいて、classは使用しないこと。
- Web画面で表示される単語は日本語にすること。
- ファイルをimportする時に拡張子を含めないこと。

# mdファイルについて
ファイルを出力するときは日本語にすること。

# 禁止事項
- npm, npxコマンドの実行
- 以下のファイルの読み書き
.env
*/.env
frontend/*
# ディレクトリ構成

このドキュメントは、React フロントエンドのトップレベルのフォルダ構造を概説しています。

## 使用技術

- **Material-UI**: UI コンポーネントの実装に使用しています。

```
frontend/
├── .env                                : 環境変数定義ファイル
├── .react-router/
├── app/
│   ├── app.css                         : アプリケーション全体のスタイルシート
│   ├── root.tsx                        : アプリケーションのルートコンポーネント
│   ├── routes.ts                       : ルーティング定義
│   ├── features/                       : 機能ごとに分類されるファイル
│   │   └── tasks/                      : タスク機能関連のファイル
│   │       ├── api/                    : APIとの接続ロジック
│   │       │   ├── create-task.ts      : タスク作成APIのロジック
│   │       │   └── get-tasks.ts        : タスク取得APIのロジック
│   │       ├── components/             : 再利用可能なUIコンポーネント
│   │       │   ├── TaskForm.tsx        : タスク登録・編集フォームコンポーネント
│   │       │   ├── TaskList.tsx        : タスクリスト表示コンポーネント
│   │       │   └── TaskGraph.tsx       : タスク依存関係グラフコンポーネント
│   │       └── types.ts                : 型定義ファイル
│   └── routes/                         : ルートコンポーネント
│       ├── graph.tsx                   : タスク依存関係グラフページ
│       ├── taskform.tsx                : タスク登録ページ
│       ├── home.tsx                    : ホームページのルートコンポーネント
│       └── taskview.tsx                : タスク詳細ページ (仮)
├── node_modules/
├── public/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json
├── react-router.config.ts
├── README.md
├── tsconfig.json
└── vite.config.ts
```
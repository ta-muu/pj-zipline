# タスク

1. `reactflow`ライブラリをインストールする。
2. `backend`の`Task`モデルに`dependencies`フィールドを追加する。
3. `backend`の`Task`モデルの変更をデータベースに反映させる（マイグレーション）。
4. `backend`の`TaskSerializer`を更新し、`dependencies`フィールドを含める。
5. `frontend/app/routes.ts` にグラフ表示画面のルーティングを追加する。
6. `frontend/app/routes/tasks/layout.tsx` に「グラフ表示」へのリンクを追加する。
7. グラフ表示画面のルートコンポーネント `frontend/app/routes/tasks/graph.tsx` を作成する。
8. グラフ描画コンポーネント `frontend/app/features/tasks/components/TaskGraph.tsx` を作成する。
9. `frontend/app/features/tasks/types.ts` に `dependencies` を追加する。
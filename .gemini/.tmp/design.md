# 設計

## 変更内容

- `frontend/app/features/tasks/types.ts` の `Task` 型に `parent_task` プロパティを追加する。
- `frontend/app/features/tasks/components/TaskList.tsx` を修正し、テーブルに「親タスク」の列を追加する。
- 親タスクの列には、`parent_task` のタイトルを表示する。APIから取得する `parent_task` はIDのみであるため、タスクリスト全体の中からIDで検索してタイトルを取得する。

## 影響範囲

- `frontend/app/features/tasks/types.ts`
- `frontend/app/features/tasks/components/TaskList.tsx`
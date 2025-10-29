# テーブル設計

## `tasks` テーブル

タスクの本体を格納するテーブルです。

| カラム名         | データ型         | 制約・説明                                               |
| :--------------- | :--------------- | :------------------------------------------------------- |
| `id`             | `INTEGER`        | `PRIMARY KEY`, `AUTO_INCREMENT`                          |
| `title`          | `VARCHAR(255)`   | `NOT NULL`. タスクのタイトル。                           |
| `description`    | `TEXT`           | `NULLABLE`. タスクの詳細な説明。                         |
| `status`         | `VARCHAR(20)`    | `NOT NULL`, `DEFAULT 'todo'`. (`todo`, `in_progress`, `done`) |
| `due_date`       | `DATE`           | `NULLABLE`. タスクの期限日。                             |
| `estimated_effort` | `DECIMAL(5, 2)`  | `NULLABLE`. 見積もり工数（時間単位）。                   |
| `created_at`     | `DATETIME`       | `NOT NULL`. 作成日時。                                   |
| `updated_at`     | `DATETIME`       | `NOT NULL`. 更新日時。                                   |

## `tasks_dependencies` テーブル

タスク間の依存関係を管理するための中間テーブルです。

| カラム名         | データ型  | 制約・説明                                               |
| :--------------- | :-------- | :------------------------------------------------------- |
| `id`             | `INTEGER` | `PRIMARY KEY`, `AUTO_INCREMENT`                          |
| `from_task_id`   | `INTEGER` | `FOREIGN KEY` to `tasks.id`. 依存元のタスク。            |
| `to_task_id`     | `INTEGER` | `FOREIGN KEY` to `tasks.id`. 依存先のタスク。            |

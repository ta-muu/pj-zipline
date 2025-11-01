export type Task = {
	id: number;
	title: string;
	description: string;
	status: "todo" | "in_progress" | "done" | "hold" | "waiting";
	parent_task: number | null;
	task_path: string;
	due_date: string | null;
	estimated_effort: string | null;
	dependencies: number[];
	created_at: string;
	updated_at: string;
};

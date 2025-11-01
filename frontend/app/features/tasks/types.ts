export type Task = {
	id: number;
	title: string;
	description: string;
	status: "todo" | "in_progress" | "done" | "hold" | "waiting";
	due_date: string | null;
	estimated_effort: string | null;
	dependencies: number[];
	created_at: string;
	updated_at: string;
};

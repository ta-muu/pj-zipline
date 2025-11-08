import type { Task } from "../features/tasks/types";

export const statusToJapanese = (status: Task["status"]) => {
	switch (status) {
		case "todo":
			return "未着手";
		case "in_progress":
			return "作業中";
		case "done":
			return "完了";
		case "hold":
			return "保留";
		case "waiting":
			return "待ち";
		default:
			return status;
	}
};

export const statusColor = (status: Task["status"]) => {
	switch (status) {
		case "in_progress":
			return "warning";
		case "done":
			return "success";
		case "hold":
			return "info";
		case "waiting":
			return "secondary";
		default:
			return "default";
	}
};

export const getTaskIdFromPath = (
	taskPath: string,
	allTasks: Task[],
): number | undefined => {
	for (const task of allTasks) {
		if (task.task_path === taskPath) {
			return task.id;
		}
	}
	return undefined;
};

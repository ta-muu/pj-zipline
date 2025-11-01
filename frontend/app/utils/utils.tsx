import type { Task } from "../features/tasks/types.ts";

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
			
export const getTaskIdFromPath = (taskPath: string, allTasks: Task[]): number | undefined => {
const normalizedPath = taskPath.endsWith('/') ? taskPath.slice(0, -1) : taskPath;

for (const task of allTasks) {
	const pathComponents: string[] = [task.title];
	let currentTask = task;
	while (currentTask.parent_task) {
		const parentTask = allTasks.find(t => t.id === currentTask.parent_task);
		if (parentTask) {
			pathComponents.unshift(parentTask.title);
			currentTask = parentTask;
		} else {
			// Parent task not found, break the loop
			break;
		}
	}
	const currentTaskPath = pathComponents.join('/');
	if (currentTaskPath === normalizedPath) {
		return task.id;
	}
}
	return undefined;
};


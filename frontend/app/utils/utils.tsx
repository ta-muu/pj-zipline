import type { Task } from "../features/tasks/types.ts";

export const statusToJapanese = (status: Task["status"]) => {
	switch (status) {
		case "todo":
			return "未着手";
		case "in_progress":
			return "作業中";
		case "done":
			return "完了";
		default:
			return status;
	}
};

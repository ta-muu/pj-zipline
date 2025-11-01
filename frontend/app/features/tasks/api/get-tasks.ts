import type { Task } from "../types";

export const getTasks = async (): Promise<Task[]> => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/tasks/`,
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data: Task[] = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		throw error;
	}
};

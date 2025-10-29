import type { Task } from "../types";

export const getTasks = async (): Promise<Task[]> => {
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	console.log("Backend API URL:", backend_url);
	try {
		const response = await fetch(`${backend_url}/api/tasks/`);
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

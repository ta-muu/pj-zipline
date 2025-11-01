import type { Task } from "../types";

export const createTask = async (
	newTask: Omit<Task, "id" | "created_at" | "updated_at" | "dependencies">,
): Promise<Task> => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/tasks/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTask),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.detail || "Failed to create task");
		}

		const createdTask: Task = await response.json();
		return createdTask;
	} catch (error) {
		console.error("Failed to create task:", error);
		throw error;
	}
};

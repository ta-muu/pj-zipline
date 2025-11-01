import type { Task } from "../types";

export const updateTask = async (
	id: number,
	taskData: Partial<Omit<Task, "id" | "created_at" | "updated_at">>,
): Promise<Task> => {
	try {
		const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}/`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskData),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.detail || "Failed to update task");
		}

		const updateTask: Task = await response.json();
		return updateTask;
	} catch (error) {
		console.error("Failed to update task:", error);
		throw error;
	}
};

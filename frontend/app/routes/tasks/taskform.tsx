import React from "react";
import { useNavigate } from "react-router";
import { createTask } from "../../features/tasks/api/create-task";
import TaskForm from "../../features/tasks/components/TaskForm";
import type { Task } from "../../features/tasks/types";

export function meta() {
	return [
		{ title: "タスク新規作成" },
		{ name: "description", content: "タスクを新規作成するページ" },
	];
}

export default function TaskFormPage() {
	const navigate = useNavigate();

	const handleSubmit = async (
		newTask: Omit<Task, "id" | "created_at" | "updated_at" | "dependencies">,
	) => {
		try {
			await createTask(newTask);
			alert("タスクが正常に作成されました。");
			navigate("/"); // Navigate back to the task list
		} catch (error) {
			alert(
				`タスクの作成中にエラーが発生しました: ${error instanceof Error ? error.message : "不明なエラーが発生しました"}`,
			);
		}
	};

	return <TaskForm onSubmit={handleSubmit} />;
}

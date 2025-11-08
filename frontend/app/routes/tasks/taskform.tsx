import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { createTask } from "../../features/tasks/api/create-task";
import { getTasks } from "../../features/tasks/api/get-tasks";
import TaskForm from "../../features/tasks/components/TaskForm";
import type { Task } from "../../features/tasks/types";
import { useApi } from "../../hooks/useApi";

export function meta() {
	return [
		{ title: "タスク新規作成" },
		{ name: "description", content: "タスクを新規作成するページ" },
	];
}

export default function TaskFormPage() {
	const navigate = useNavigate();
	const { data: tasks, loading, error, request: fetchTasks } = useApi(getTasks);

	useEffect(() => {
		fetchTasks().catch(() => {
			// useApi will handle the error state
		});
	}, [fetchTasks]);

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

	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Typography color="error">エラー: {error}</Typography>
			</Box>
		);
	}

	return <TaskForm onSubmit={handleSubmit} allTasks={tasks || []} />;
}

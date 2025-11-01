import {
	Box,
	Button,
	Chip,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { getTasks } from "../api/get-tasks";
import type { Task } from "../types.ts";
import TaskEditModal from "./TaskEditModal";

const TaskList: React.FC = () => {
	const theme = useTheme();

	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchTasks = useCallback(async () => {
		try {
			setLoading(true);
			const data = await getTasks();
			setTasks(data);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const handleEditClick = (task: Task) => {
		setEditingTask(task);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setEditingTask(null);
		fetchTasks(); // モーダルを閉じたらタスクを再取得
	};

	const statusToJapanese = (status: Task["status"]) => {
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

	if (loading && tasks.length === 0) {
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

	return (
		<Box sx={{ mt: 3, mb: 3 }}>
			<TableContainer
				component={Paper}
				sx={{
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.text.primary,
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Table sx={{ minWidth: 650 }} aria-label="task table">
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									color: theme.palette.text.primary,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								タスク
							</TableCell>
							<TableCell
								sx={{
									color: theme.palette.text.primary,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								詳細
							</TableCell>
							<TableCell
								sx={{
									color: theme.palette.text.primary,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								状態
							</TableCell>
							<TableCell
								sx={{
									color: theme.palette.text.primary,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								締切
							</TableCell>
							<TableCell
								sx={{
									color: theme.palette.text.primary,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								予想所要時間
							</TableCell>
							<TableCell
								sx={{
									color: theme.palette.text.primary,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								前提タスク
							</TableCell>
							<TableCell
								sx={{
									color: theme.palette.text.primary,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}
							>
								操作
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.length > 0 ? (
							tasks.map((task) => (
								<TableRow key={task.id}>
									<TableCell
										component="th"
										scope="row"
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										{task.title}
									</TableCell>
									<TableCell
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										{task.description}
									</TableCell>
									<TableCell
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										<Chip
											label={statusToJapanese(task.status)}
											color={task.status === "in_progress" ? "warning" : task.status === "done" ? "success" : "default"}
											size="small"
										/>
									</TableCell>
									<TableCell
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										{task.due_date || "未設定"}
									</TableCell>
									<TableCell
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										{task.estimated_effort || "未設定"}
									</TableCell>
									<TableCell
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
											{task.dependencies.map((depId) => {
												const depTask = tasks.find((t) => t.id === depId);
												return (
													<Chip
														key={depId}
														label={depTask?.title || `ID: ${depId}`}
														size="small"
													/>
												);
											})}
										</Box>
									</TableCell>
									<TableCell
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										<IconButton
											onClick={() => handleEditClick(task)}
											size="small"
										>
											<EditIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={7}
									align="center"
									sx={{
										color: theme.palette.text.primary,
										borderBottom: `1px solid ${theme.palette.divider}`,
									}}
								>
									タスクがありません。
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TaskEditModal
				open={isModalOpen}
				onClose={handleModalClose}
				task={editingTask}
				allTasks={tasks}
			/>
		</Box>
	);
};

export default TaskList;

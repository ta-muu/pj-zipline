import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
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
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { statusToJapanese } from "../../../utils/utils";
import { getTasks } from "../api/get-tasks";
import type { Task } from "../types.ts";
import TaskDescriptionModal from "./TaskDescriptionModal";
import TaskEditModal from "./TaskEditModal";
import TaskStatusEditModal from "./TaskStatusEditModal";

const TaskList: React.FC = () => {
	const theme = useTheme();

	const { data: tasks, loading, error, request: fetchTasks } = useApi(getTasks);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusEditingTask, setStatusEditingTask] = useState<Task | null>(null);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [descriptionEditingTask, setDescriptionEditingTask] =
		useState<Task | null>(null);
	const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

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

	const handleStatusClick = (task: Task) => {
		setStatusEditingTask(task);
		setIsStatusModalOpen(true);
	};

	const handleStatusModalClose = () => {
		setIsStatusModalOpen(false);
		setStatusEditingTask(null);
		fetchTasks(); // モーダルを閉じたらタスクを再取得
	};

	const handleDescriptionClick = (task: Task) => {
		setDescriptionEditingTask(task);
		setIsDescriptionModalOpen(true);
	};

	const handleDescriptionModalClose = () => {
		setIsDescriptionModalOpen(false);
		setDescriptionEditingTask(null);
		fetchTasks(); // モーダルを閉じたらタスクを再取得
	};

	if (loading && !tasks) {
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
									width: "25%",
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
								予想所要時間（h）
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
						{tasks && tasks.length > 0 ? (
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
										<Chip
											label={statusToJapanese(task.status)}
											color={
												task.status === "in_progress"
													? "warning"
													: task.status === "done"
														? "success"
														: "default"
											}
											size="small"
											onClick={() => handleStatusClick(task)}
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
											{tasks && task.dependencies.map((depId) => {
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
											onClick={() => handleDescriptionClick(task)}
											size="small"
										>
											<DescriptionIcon />
										</IconButton>
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
									colSpan={6}
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
				allTasks={tasks || []}
			/>
			<TaskStatusEditModal
				open={isStatusModalOpen}
				onClose={handleStatusModalClose}
				task={statusEditingTask}
			/>
			<TaskDescriptionModal
				open={isDescriptionModalOpen}
				onClose={handleDescriptionModalClose}
				task={descriptionEditingTask}
			/>
		</Box>
	);
};

export default TaskList;

import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
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
import { useEffect, useMemo, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { statusColor, statusToJapanese } from "../../../utils/utils";
import { getTasks } from "../api/get-tasks";
import type { Task } from "../types";
import TaskDescriptionModal from "./TaskDescriptionModal";
import TaskEditModal from "./TaskEditModal";
import TaskStatusEditModal from "./TaskStatusEditModal";
import TaskMoveModal from "./TaskMoveModal";

interface TaskListProps {
	filterPath: string;
}

const TaskList: React.FC<TaskListProps> = ({ filterPath }) => {
	const theme = useTheme();

	const { data: tasks, loading, error, request: fetchTasks } = useApi(getTasks);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusEditingTask, setStatusEditingTask] = useState<Task | null>(null);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [descriptionEditingTask, setDescriptionEditingTask] =
		useState<Task | null>(null);
	const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

	const [movingTask, setMovingTask] = useState<Task | null>(null);
	const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);

	const tableCellSx = useMemo(
		() => ({
			color: theme.palette.text.primary,
			borderBottom: `1px solid ${theme.palette.divider}`,
		}),
		[theme.palette.text.primary, theme.palette.divider],
	);

	const taskMap = useMemo(
		() => new Map(tasks?.map((t) => [t.id, t]) ?? []),
		[tasks],
	);

	const filteredTasks = useMemo(() => {
		if (!tasks) return [];
		if (!filterPath) return tasks;
		return tasks.filter(task =>
			task.task_path?.includes(filterPath)
		);
	}, [tasks, filterPath]);

	useEffect(() => {
		fetchTasks().catch(() => {
			// useApi が error state を管理するため、ここでは追加処理不要
		});
	}, [fetchTasks]);

	const handleEditClick = (task: Task) => {
		setEditingTask(task);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setEditingTask(null);
	};

	const handleStatusClick = (task: Task) => {
		setStatusEditingTask(task);
		setIsStatusModalOpen(true);
	};

	const handleStatusModalClose = () => {
		setIsStatusModalOpen(false);
		setStatusEditingTask(null);
	};

	const handleDescriptionClick = (task: Task) => {
		setDescriptionEditingTask(task);
		setIsDescriptionModalOpen(true);
	};

	const handleDescriptionModalClose = () => {
		setIsDescriptionModalOpen(false);
		setDescriptionEditingTask(null);
	};

	const handleMoveClick = (task: Task) => {
		setMovingTask(task);
		setIsMoveModalOpen(true);
	};

	const handleMoveModalClose = () => {
		setIsMoveModalOpen(false);
		setMovingTask(null);
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
									...tableCellSx,
								}}
							>
								ID
							</TableCell>
							<TableCell
								sx={{
									...tableCellSx,
									width: "25%",
								}}
							>
								タスク
							</TableCell>
							<TableCell
								sx={{
									...tableCellSx,
								}}
							>
								状態
							</TableCell>
							<TableCell
								sx={{
									...tableCellSx,
								}}
							>
								締切
							</TableCell>
							<TableCell
								sx={{
									...tableCellSx,
								}}
							>
								予想所要時間（h）
							</TableCell>
							<TableCell
								sx={{
									...tableCellSx,
								}}
							>
								親タスク
							</TableCell>
							<TableCell
								sx={{
									...tableCellSx,
								}}
							>
								前提タスク
							</TableCell>
							<TableCell
								sx={{
									...tableCellSx,
								}}
							>
								操作
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks && tasks.length > 0 ? (
							filteredTasks.map((task) => (
								<TableRow key={task.id}>
									<TableCell
										component="th"
										scope="row"
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										{task.id}
									</TableCell>
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
											color={statusColor(task.status)}
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
										{task.parent_task ? taskMap.get(task.parent_task)?.title : ""}
									</TableCell>
									<TableCell
										sx={{
											color: theme.palette.text.primary,
											borderBottom: `1px solid ${theme.palette.divider}`,
										}}
									>
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
											{task.dependencies.map((depId) => {
												const depTask = taskMap.get(depId);
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
											aria-label="説明を表示"
										>
											<DescriptionIcon />
										</IconButton>
										<IconButton
											onClick={() => handleEditClick(task)}
											size="small"
											aria-label="タスクを編集"
										>
											<EditIcon />
										</IconButton>
										<IconButton
											onClick={() => handleMoveClick(task)}
											size="small"
											aria-label="タスクを移動"
										>
											<MoveToInboxIcon />
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
				onSave={() => fetchTasks().catch(() => {})}
				task={editingTask}
				allTasks={tasks || []}
			/>
			<TaskStatusEditModal
				open={isStatusModalOpen}
				onClose={handleStatusModalClose}
				onSave={() => fetchTasks().catch(() => {})}
				task={statusEditingTask}
			/>
			<TaskDescriptionModal
				open={isDescriptionModalOpen}
				onClose={handleDescriptionModalClose}
				onSave={() => fetchTasks().catch(() => {})}
				task={descriptionEditingTask}
			/>
			<TaskMoveModal
				open={isMoveModalOpen}
				onClose={handleMoveModalClose}
				onSave={() => fetchTasks().catch(() => {})}
				task={movingTask}
				allTasks={tasks || []}
			/>
		</Box>
	);
};

export default TaskList;

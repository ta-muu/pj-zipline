import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { updateTask } from "../api/update-task";
import type { Task } from "../types";

interface TaskMoveModalProps {
	open: boolean;
	onClose: () => void;
	onSave: () => void;
	task: Task | null;
	allTasks: Task[];
}

const TaskMoveModal: React.FC<TaskMoveModalProps> = ({
	open,
	onClose,
	onSave,
	task,
	allTasks,
}) => {
	const [selectedParentTaskId, setSelectedParentTaskId] = useState<
		number | null
	>(null);
	const [filterPath, setFilterPath] = useState("");

	// Filter out the current task and its subtasks to prevent circular dependencies
	const getSubtaskIds = useCallback(
		(currentTask: Task, tasks: Task[]): Set<number> => {
			const subtaskIds = new Set<number>();
			const queue: Task[] = [currentTask];
			let head = 0;
			while (head < queue.length) {
				const t = queue[head++];
				subtaskIds.add(t.id);
				for (const potentialSubtask of tasks) {
					if (
						potentialSubtask.parent_task === t.id &&
						!subtaskIds.has(potentialSubtask.id)
					) {
						queue.push(potentialSubtask);
					}
				}
			}
			return subtaskIds;
		},
		[],
	);

	const validParentTasks = React.useMemo(() => {
		if (!task) return [];
		const invalidIds = getSubtaskIds(task, allTasks);
		invalidIds.add(task.id); // Cannot be parent of itself

		const filtered = allTasks.filter((t) => !invalidIds.has(t.id));

		if (!filterPath) {
			return filtered;
		}

		const lowerCaseFilterPath = filterPath.toLowerCase();
		return filtered.filter((t) =>
			t.task_path?.toLowerCase().includes(lowerCaseFilterPath),
		);
	}, [task, allTasks, filterPath, getSubtaskIds]);

	React.useEffect(() => {
		if (task) {
			setSelectedParentTaskId(task.parent_task || null);
		}
	}, [task]);

	const handleSave = async () => {
		if (!task) return;

		const newParentTaskId: number | null = selectedParentTaskId;

		const updatedTaskData: Partial<Task> = { parent_task: newParentTaskId };

		// If the parent task is being changed, clear dependencies
		if (task.parent_task !== newParentTaskId) {
			updatedTaskData.dependencies = [];
		}

		try {
			await updateTask(task.id, updatedTaskData);
			onSave();
			onClose();
		} catch (error) {
			console.error("Failed to update task parent:", error);
			alert("親タスクの更新に失敗しました。");
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>タスクの移動</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="filterPath"
					label="パスでフィルタ"
					type="text"
					fullWidth
					variant="outlined"
					value={filterPath}
					onChange={(e) => setFilterPath(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<FormControl fullWidth margin="dense">
					<InputLabel id="parent-task-select-label">新しい親タスク</InputLabel>
					<Select
						labelId="parent-task-select-label"
						id="parent-task-select"
						value={selectedParentTaskId === null ? "" : selectedParentTaskId}
						label="新しい親タスク"
						onChange={(e) =>
							setSelectedParentTaskId(e.target.value as number | null)
						}
					>
						<MenuItem value="">なし</MenuItem>
						{validParentTasks.map((parentOption) => (
							<MenuItem key={parentOption.id} value={parentOption.id}>
								{parentOption.id} – {parentOption.title}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>キャンセル</Button>
				<Button onClick={handleSave}>保存</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskMoveModal;

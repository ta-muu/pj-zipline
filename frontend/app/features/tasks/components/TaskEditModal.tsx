import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { updateTask } from "../api/update-task";
import type { Task } from "../types";

interface TaskEditModalProps {
	open: boolean;
	onClose: () => void;
	task: Task | null;
	allTasks: Task[];
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
	open,
	onClose,
	task,
}) => {
	const [editedTitle, setEditedTitle] = useState("");
	const [editedDueDate, setEditedDueDate] = useState<string | null>(null);
	const [editedEstimatedEffort, setEditedEstimatedEffort] = useState<
		number | null
	>(null);

	useEffect(() => {
		if (task) {
			setEditedTitle(task.title);
			setEditedDueDate(task.due_date);
			setEditedEstimatedEffort(
				task.estimated_effort ? parseFloat(task.estimated_effort) : null,
			);
		}
	}, [task]);

	const handleSave = async () => {
		if (task) {
			try {
				await updateTask(task.id, {
					title: editedTitle,
					due_date: editedDueDate,
					estimated_effort: editedEstimatedEffort
						? editedEstimatedEffort.toFixed(1)
						: null,
				});
				onClose();
			} catch (error) {
				console.error("Failed to update task:", error);
			}
		}
	};

	if (!task) {
		return null;
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>タスクの編集: {task.title}</DialogTitle>
			<DialogContent>
				<TextField
					margin="dense"
					id="title"
					label="タスク名"
					type="text"
					fullWidth
					variant="outlined"
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
					sx={{ mt: 2 }}
				/>
				<TextField
					margin="dense"
					id="due_date"
					label="締切"
					type="date"
					fullWidth
					variant="outlined"
					value={editedDueDate || ""}
					onChange={(e) => setEditedDueDate(e.target.value || null)}
					InputLabelProps={{
						shrink: true,
					}}
					sx={{ mt: 2 }}
				/>
				<TextField
					label="予想所要時間（h）"
					fullWidth
					margin="normal"
					type="number"
					value={editedEstimatedEffort || ""}
					onChange={(e) =>
						setEditedEstimatedEffort(parseFloat(e.target.value) || null)
					}
					variant="outlined"
					inputProps={{ step: "0.1" }}
					sx={{ mt: 2 }}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>キャンセル</Button>
				<Button onClick={handleSave} variant="contained">
					保存
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskEditModal;

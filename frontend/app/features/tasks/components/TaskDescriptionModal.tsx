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
import type { Task } from "../types.ts";

interface TaskDescriptionModalProps {
	open: boolean;
	onClose: () => void;
	task: Task | null;
}

const TaskDescriptionModal: React.FC<TaskDescriptionModalProps> = ({
	open,
	onClose,
	task,
}) => {
	const [editedDescription, setEditedDescription] = useState("");

	useEffect(() => {
		if (task) {
			setEditedDescription(task.description);
		}
	}, [task]);

	const handleSave = async () => {
		if (task) {
			try {
				await updateTask(task.id, {
					description: editedDescription,
				});
				onClose();
			} catch (error) {
				console.error("Failed to update task description:", error);
			}
		}
	};

	if (!task) {
		return null;
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>メモ: {task.title}</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="description"
					label="詳細"
					type="text"
					fullWidth
					multiline
					rows={10}
					variant="outlined"
					value={editedDescription}
					onChange={(e) => setEditedDescription(e.target.value)}
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

export default TaskDescriptionModal;

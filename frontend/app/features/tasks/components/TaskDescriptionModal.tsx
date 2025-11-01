import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { updateTask } from "../api/update-task";
import type { Task } from "../types";

interface TaskDescriptionModalProps {
	open: boolean;
	onClose: () => void;
	task: Task | null;
	onSave?: () => void;
}

const TaskDescriptionModal: React.FC<TaskDescriptionModalProps> = ({
	open,
	onClose,
	task,
	onSave,
}) => {
	const [editedDescription, setEditedDescription] = useState("");
	const { error, request: updateTaskDescription } = useApi(updateTask);

	useEffect(() => {
		if (task) {
			setEditedDescription(task.description);
		}
	}, [task]);

	const handleSave = async () => {
		if (!task) {
			return;
		}
		try {
			await updateTaskDescription(task.id, {
				description: editedDescription,
			});
			onSave?.();
			onClose();
		} catch {
			// useApi が error state を更新するため追加処理は不要
		}
	};

	if (!task) {
		return null;
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>メモ: {task.title}</DialogTitle>
			<DialogContent>
				{error && <Alert severity="error">{error}</Alert>}
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

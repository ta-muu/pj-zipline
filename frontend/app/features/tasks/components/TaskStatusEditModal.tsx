import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { statusToJapanese } from "../../../utils/utils";
import { updateTask } from "../api/update-task";
import type { Task } from "../types";

interface TaskStatusEditModalProps {
	open: boolean;
	onClose: () => void;
	task: Task | null;
}

const TaskStatusEditModal: React.FC<TaskStatusEditModalProps> = ({
	open,
	onClose,
	task,
}) => {
	const [selectedStatus, setSelectedStatus] = useState<Task["status"]>("todo");
	const { error, request: updateTaskStatus } = useApi(updateTask);

	useEffect(() => {
		if (task) {
			setSelectedStatus(task.status);
		}
	}, [task]);

	const handleSave = async () => {
		if (task) {
			await updateTaskStatus(task.id, {
				status: selectedStatus,
			});
			onClose();
		}
	};

	const handleStatusChange = (event: SelectChangeEvent<Task["status"]>) => {
		setSelectedStatus(event.target.value as Task["status"]);
	};

	if (!task) {
		return null;
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle>状態の編集: {task.title}</DialogTitle>
			<DialogContent>
				{error && <Alert severity="error">{error}</Alert>}
				<FormControl sx={{ mt: 2, width: "100%" }}>
					<InputLabel id="status-select-label">状態</InputLabel>
					<Select
						labelId="status-select-label"
						id="status-select"
						value={selectedStatus}
						onChange={handleStatusChange}
						label="状態"
					>
						{(["todo", "in_progress", "done"] as const).map((status) => (
							<MenuItem key={status} value={status}>
								{statusToJapanese(status)}
							</MenuItem>
						))}
					</Select>
				</FormControl>
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

export default TaskStatusEditModal;

import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import type { Task } from "../types"; // Re-using the Task type

interface TaskFormProps {
	onSubmit: (
		task: Omit<Task, "id" | "created_at" | "updated_at" | "dependencies">,
	) => void;
	initialData?: Omit<Task, "id" | "created_at" | "updated_at" | "dependencies">;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
	const theme = useTheme();

	const [title, setTitle] = useState(initialData?.title || "");
	const [description, setDescription] = useState(
		initialData?.description || "",
	);
	const [status, setStatus] = useState<Task["status"]>(
		initialData?.status || "todo",
	);
	const [dueDate, setDueDate] = useState(initialData?.due_date || "");
	const [estimatedEffort, setEstimatedEffort] = useState(
		initialData?.estimated_effort || "",
	);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit({
			title,
			description,
			status,
			due_date: dueDate || null,
			estimated_effort: estimatedEffort || null,
		});
	};

	const formElementStyles = {
		"& .MuiInputBase-root": {
			color: theme.palette.text.primary,
			"& .MuiOutlinedInput-notchedOutline": {
				borderColor: theme.palette.divider,
			},
			"&:hover .MuiOutlinedInput-notchedOutline": {
				borderColor: theme.palette.text.primary,
			},
			"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
				borderColor: theme.palette.primary.main,
			},
		},
		"& .MuiInputLabel-root": {
			color: theme.palette.text.primary,
		},
		"& .MuiSelect-icon": {
			color: theme.palette.text.primary,
		},
	};

	const menuItemStyles = {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
	};

	return (
		<Container maxWidth="sm">
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					sx={{ color: theme.palette.text.primary }}
				>
					{initialData ? "タスク編集" : "タスク新規作成"}
				</Typography>
				<TextField
					label="タイトル"
					fullWidth
					margin="normal"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					variant="outlined"
					sx={formElementStyles}
				/>
				<TextField
					label="詳細"
					fullWidth
					margin="normal"
					multiline
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					variant="outlined"
					sx={formElementStyles}
				/>
				<FormControl fullWidth margin="normal" sx={formElementStyles}>
					<InputLabel id="status-label">ステータス</InputLabel>
					<Select
						labelId="status-label"
						value={status}
						label="ステータス"
						onChange={(e) => setStatus(e.target.value as Task["status"])}
						variant="outlined"
						sx={formElementStyles}
					>
						<MenuItem value="todo" sx={menuItemStyles}>
							未着手
						</MenuItem>
						<MenuItem value="in_progress" sx={menuItemStyles}>
							作業中
						</MenuItem>
						<MenuItem value="done" sx={menuItemStyles}>
							完了
						</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="期日"
					fullWidth
					margin="normal"
					type="date"
					InputLabelProps={{
						shrink: true,
					}}
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
					variant="outlined"
					sx={formElementStyles}
				/>
				<TextField
					label="予想所要時間（h）"
					fullWidth
					margin="normal"
					type="number"
					value={estimatedEffort}
					onChange={(e) => setEstimatedEffort(e.target.value)}
					variant="outlined"
					sx={formElementStyles}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ mt: 3, mb: 3 }}
				>
					{initialData ? "更新" : "作成"}
				</Button>
			</Box>
		</Container>
	);
};

export default TaskForm;

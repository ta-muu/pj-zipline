import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import TaskList from "../../features/tasks/components/TaskList";

export default function TaskView() {
	const [filterPath, setFilterPath] = useState("");

	return (
		<Box sx={{ display: "flex", backgroundColor: "transparent" }}>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<TextField
					label="タスクパス"
					fullWidth
					margin="normal"
					value={filterPath}
					onChange={(e) => setFilterPath(e.target.value)}
					variant="outlined"
				/>
				<TaskList filterPath={filterPath} />
				<Outlet />
			</Box>
		</Box>
	);
}

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TaskList from "../../features/tasks/components/TaskList";

export default function TaskView() {
	return (
		<Box sx={{ display: "flex", backgroundColor: "transparent" }}>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<TaskList />
				<Outlet />
			</Box>
		</Box>
	);
}

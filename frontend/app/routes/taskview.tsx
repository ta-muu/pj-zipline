import { Box, Stack } from "@mui/material";
import TaskList from "../features/tasks/components/TaskList";

export default function TaskView() {
	return (
		<Box sx={{ width: "100%" }}>
			<Stack spacing={5}>
				<TaskList />
			</Stack>
		</Box>
	);
}

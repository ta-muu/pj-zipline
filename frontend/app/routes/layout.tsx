import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router";

export default function Layout() {
	return (
		<Box sx={{ display: "flex" }} bgcolor="#FFFFFF;">
			<CssBaseline />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
}

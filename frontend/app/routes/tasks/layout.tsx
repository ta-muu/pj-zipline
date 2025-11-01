import {
	AppBar,
	Box,
	CssBaseline,
	createTheme,
	ThemeProvider,
	useMediaQuery,
} from "@mui/material";
import type React from "react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";

import AppToolbar from "../../features/toolbar/components/Toolbar";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
					...(prefersDarkMode
						? {
								// Dark mode palette
								primary: { main: "#ffffff" }, // White primary color
								text: { primary: "#ffffff", secondary: "#ffffff" }, // White text
								divider: "rgba(255, 255, 255, 0.12)", // White divider with transparency
							}
						: {
								// Light mode palette (default or custom)
								primary: { main: "#1976d2" }, // Default blue
								text: {
									primary: "rgba(0, 0, 0, 0.87)",
									secondary: "rgba(0, 0, 0, 60)",
								},
								divider: "rgba(0, 0, 0, 0.12)",
							}),
				},
			}),
		[prefersDarkMode],
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<AppToolbar />
				</AppBar>
			</Box>
			<Outlet />
		</ThemeProvider>
	);
};

export default Layout;

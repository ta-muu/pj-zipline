import { Button, Toolbar } from "@mui/material";
import type React from "react";
import { Link } from "react-router-dom";

const AppToolbar: React.FC = () => {
	return (
		<Toolbar>
			<Button color="inherit" component={Link} to="taskview">
				タスク一覧
			</Button>
			<Button color="inherit" component={Link} to="taskform">
				タスク作成
			</Button>
			<Button color="inherit" component={Link} to="graph">
				グラフ表示
			</Button>
		</Toolbar>
	);
};

export default AppToolbar;

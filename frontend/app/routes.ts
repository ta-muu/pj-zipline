import { index, layout, type RouteConfig } from "@react-router/dev/routes";

export default [
	index("./routes/home.tsx"),
	index("./routes/taskview.tsx"),
] satisfies RouteConfig;

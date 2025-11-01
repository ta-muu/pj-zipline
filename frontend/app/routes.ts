import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	index("./routes/home.tsx"), // This will now redirect to /taskview
	layout("./routes/tasks/layout.tsx", [
		route("taskform", "./routes/tasks/taskform.tsx"),
		route("taskview", "./routes/tasks/taskview.tsx"),
		route("graph", "./routes/tasks/graph.tsx"),
	]),
] satisfies RouteConfig;

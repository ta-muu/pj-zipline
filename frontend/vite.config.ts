import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		outDir: "build/client",
	},
	plugins: [
		tailwindcss(), // 最初に Tailwind のプラグイン
		reactRouter(), // React Router のプラグイン（react() は不要）
		tsconfigPaths(), // エイリアス対応
	],
});

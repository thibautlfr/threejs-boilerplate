import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

function getBasePath(): string {
	if (process.env.VITE_BASE_PATH) return process.env.VITE_BASE_PATH;
	if (process.env.npm_package_name) return `/${process.env.npm_package_name}/`;
	const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
	return `/${pkg.name}/`;
}

export default defineConfig(({ command }) => ({
	base: command === "serve" ? "/" : getBasePath(),
	build: {
		assetsInlineLimit: 8192,
	},
	server: {
		open: true,
	},
}));

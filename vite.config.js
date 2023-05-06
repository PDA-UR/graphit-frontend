// vite.config.js
export default {
	// config options
	build: {
		outDir: "dist",
		emptyOutDir: true,
		minify: false,
		sourcemap: true,
		mode: "development",
		rollupOptions: {
			input: {
				home: "./index.html",
				visTest: "./src/pages/visTest/index.html",
				propertyEditor: "src/pages/propertyEditor/index.html",
			},
		},
	},
};

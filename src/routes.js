const fs = require("fs");
const path = require("path");
const normalizedPath = require("path").resolve("src", "app");

const routes = [];

const folders = fs.readdirSync(normalizedPath);
folders.forEach(folder => {
	const actualPath = path.join(normalizedPath, folder);
	const modelPath = fs
		.readdirSync(actualPath)
		.filter(file => file.includes("route"));
	modelPath.forEach(model => {
		routes.push(require(path.join(actualPath, model)));
	});
});

module.exports = routes;

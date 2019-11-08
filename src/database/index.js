const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const dbConfig = require("../config/database");
const connection = new Sequelize(dbConfig);

initAllModels();

module.exports = connection;

function initAllModels() {
	// Equivaliente a importar e inicializar individualmente todos os models:
	// const User = require("../app/user/User.model.js");
	// User.init(connection)
	// User.sync()

	const normalizedPath = require("path").resolve("src", "app");
	const folders = fs.readdirSync(normalizedPath);
	folders.forEach(folder => {
		const actualPath = path.join(normalizedPath, folder);
		const modelPath = fs
			.readdirSync(actualPath)
			.filter(file => file.includes("model"));
		modelPath.forEach(modelFile => {
			const model = require(path.join(actualPath, modelFile));
			model.init(connection);
			model.sync();
			model.associate ? model.associate(connection) : null;
		});
	});
}

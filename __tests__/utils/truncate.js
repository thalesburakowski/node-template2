const database = require("../../src/database");

module.exports = () => {
	return Promise.all(
		Object.values(database.models).map(model => {
			return model.destroy({ truncate: true });
		})
	);
};

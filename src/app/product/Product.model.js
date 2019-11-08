const { Model, DataTypes } = require("sequelize");

class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				category: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
			}
		);
	}
}

module.exports = Product;

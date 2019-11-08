const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
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
				},
				email: {
					type: DataTypes.STRING,
					unique: true,
					allowNull: false,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
				hooks: {
					beforeSave: async user => {
						if (user.password) {
							user.password = await bcrypt.hash(user.password, 8);
						}
					},
				},
			}
		);
	}
}

module.exports = User;

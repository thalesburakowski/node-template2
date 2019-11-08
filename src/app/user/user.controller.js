const User = require("./User.model");

const create = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res
			.status(400)
			.send({ message: "Os campos devem ser preenchidos corretamente!" });
	}

	try {
		const userExists = await User.findOne({ where: { email } });
		if (userExists) {
			return res.status(400).send({ message: "Este email já foi cadastrado!" });
		}
		const user = await User.create({ name, email, password });
		return res.status(201).send(user);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Ocorreu um erro, contate o administrador do sistema!",
		});
	}
};

const listAll = async (req, res) => {
	const { page = 1, limit = 10 } = req.params;

	try {
		const users = await User.findAndCountAll({
			offset: (page - 1) * limit,
			limit,
		});

		const response = {
			pages: Math.ceil(users.count / limit),
			users: users.rows,
		};

		return res.send(response);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Ocorreu um erro, contate o administrador do sistema!",
		});
	}
};

const update = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res
			.status(400)
			.send({ message: "O email deve ser preenchido corretamente!" });
	}

	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res
				.status(400)
				.send({ message: "Este email não foi cadastrado!" });
		}

		const userUpdated = await user.update({ ...req.body });

		return res.send(userUpdated);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Ocorreu um erro, contate o administrador do sistema!",
		});
	}
};

const deleteUser = async (req, res) => {
	const { email } = req.params;

	try {
		await User.destroy({ where: { email } });
		res.send();
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Ocorreu um erro, contate o administrador do sistema!",
		});
	}
};

module.exports = {
	create,
	listAll,
	update,
	delete: deleteUser,
};

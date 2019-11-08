const Product = require("./Product.model");

const create = async (req, res) => {
	const { name, category } = req.body;

	if (!name || !category) {
		return res
			.status(400)
			.send({ message: "Os campos devem ser preenchidos corretamente!" });
	}

	try {
		const productExists = await Product.findOne({ where: { name } });
		if (productExists) {
			return res
				.status(400)
				.send({ message: "Este produto já foi cadastrado!" });
		}

		const product = await Product.create({ name, category });

		return res.status(201).send(product);
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
		const products = await Product.findAndCountAll({
			offset: (page - 1) * limit,
			limit,
		});

		const response = {
			pages: Math.ceil(products.count / limit),
			products: products.rows,
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
	const { id } = req.body;

	if (!id) {
		return res
			.status(400)
			.send({ message: "O id deve ser preenchido corretamente!" });
	}

	try {
		const product = await Product.findOne({ where: { id } });
		if (!product) {
			return res
				.status(400)
				.send({ message: "Este produto não foi cadastrado!" });
		}

		const productUpdated = await product.update({ ...req.body });

		return res.send(productUpdated);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Ocorreu um erro, contate o administrador do sistema!",
		});
	}
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;

	try {
		await Product.destroy({ where: { id } });
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
	delete: deleteProduct,
};

const faker = require("faker");
const { factory } = require("factory-girl");
const User = require("../src/app/user/User.model");
const Product = require("../src/app/product/Product.model");

factory.define("User", User, {
	name: faker.name.findName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
});

factory.define("Product", Product, {
	name: faker.commerce.productName(),
	category: faker.commerce.productAdjective(),
});

module.exports = factory;

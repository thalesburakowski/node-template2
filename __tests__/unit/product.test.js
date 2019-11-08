const Product = require("../../src/app/product/Product.model");
const truncate = require("../utils/truncate");

describe("Product", () => {
	beforeEach(async () => {
		await truncate();
	});

	it("shold create product", async () => {
		const product = await Product.create({
			name: "Produto",
			category: "legal",
		});

		expect(product.name).toBe("Produto");
	});
});

const routes = require("express").Router();
const productController = require("./product.controller");

routes.get("/product/:page?/:limit?", productController.listAll);
routes.post("/product", productController.create);
routes.put("/product", productController.update);
routes.delete("/product/:id", productController.delete);

module.exports = routes;

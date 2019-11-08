const routes = require("express").Router();
const userController = require("./user.controller");

routes.get("/user/:page?/:limit?", userController.listAll);
routes.post("/user", userController.create);
routes.put("/user", userController.update);
routes.delete("/user/:email", userController.delete);

module.exports = routes;

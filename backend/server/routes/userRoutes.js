const express = require("express");
const userController = require("../controllers/userController");

module.exports = (app) => {
  const router = express.Router();

  app.use("/api", router);

  app.route("/api/users").get(userController.getUsers);
};

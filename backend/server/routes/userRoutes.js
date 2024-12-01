const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
module.exports = (app) => {
  const router = express.Router();

  app.use("/api", router);

  //Ruta para registrar usuario
  app.route("/api/registerUser").post(userController.register);

  //Ingresar al sistema LOGIN
  app.route("/api/signin").post(userController.login);

  //Ruta para extraer los usuarios existentes bbin
  //Requiere autenticacion por eso ponemos verifyToken
  app.route("/api/users").get(verifyToken, userController.getUsers);
};

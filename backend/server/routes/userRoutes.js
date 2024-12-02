const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const rolController = require("../controllers/rolsController");
const especialistController = require("../controllers/especialitsController");
module.exports = (app) => {
  const router = express.Router();

  app.use("/api", router);

  //Crear nuevo rolsController
  app.route("/api/createRol").post(rolController.createRol);

  //Crear nueva especialidad :
  app
    .route("/api/createSpecialist")
    .post(especialistController.createEspecialidad);
  //Ruta para registrar usuario
  app.route("/api/registerUser").post(userController.register);

  //Ingresar al sistema LOGIN
  app.route("/api/signin").post(userController.login);

  //Ruta para extraer los usuarios existentes bbin
  //Requiere autenticacion por eso ponemos verifyToken
  app.route("/api/users").get(verifyToken, userController.getUsers);
};

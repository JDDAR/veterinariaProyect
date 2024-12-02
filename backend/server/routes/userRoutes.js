const express = require("express");
const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyPermisos,
} = require("../middlewares/authMiddleware");
const rolController = require("../controllers/rolsController");
const especialistController = require("../controllers/especialitsController");
const raceController = require("../controllers/raceController");
const petController = require("../controllers/petController");

module.exports = (app) => {
  const router = express.Router();

  app.use("/api", router);

  //Crear nuevo rolsController **********
  app.route("/api/createRol").post(rolController.createRol);

  //Actualizar contraseña

  app
    .route("/api/updatePassword")
    .put(verifyToken, userController.updatePassword);

  //Crear nueva createEspecialidad ********
  app
    .route("/api/createSpecialist")
    .post(especialistController.createEspecialidad);

  //Crear nueva raza ********
  app.route("/api/createRace").post(raceController.createRace);

  //Ruta para registrar Cliente con rol vereficado  ********
  app
    .route("/api/createUser")
    .post(
      verifyToken,
      verifyPermisos(["administrador", "veterinario"]),
      userController.createUsuario,
    );

  //Crear nueva mascota :
  app
    .route("/api/createPet")
    .post(
      verifyToken,
      verifyPermisos(["veterinario", "administrador"]),
      petController.createPet,
    );

  //Ruta para registrar usuario ********
  app.route("/api/registerUser").post(userController.register);

  //Ingresar al sistema LOGIN *********
  app.route("/api/signin").post(userController.login);

  //Ruta para extraer los usuarios existentes bbin
  //Requiere autenticacion por eso ponemos verifyToken
  app.route("/api/users").get(verifyToken, userController.getUsers);
};

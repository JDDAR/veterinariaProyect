const express = require("express");
const userController = require("../controllers/userController");
const rolController = require("../controllers/rolsController");
const especialistController = require("../controllers/especialitsController");
const raceController = require("../controllers/raceController");
const petController = require("../controllers/petController");
const filterController = require("../controllers/filterController");
const agendamientoController = require("../controllers/agendamientoController");
const historialController = require("../controllers/historialClinicoController");
const {
  verifyToken,
  verifyPermisos,
} = require("../middlewares/authMiddleware");

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
  app.route("/api/createPet").post(petController.createPet);

  //Ruta para registrar usuario ********
  app.route("/api/registerUser").post(userController.register);

  //Ingresar al sistema LOGIN *********
  app.route("/api/signin").post(userController.login);

  //Ruta para extraer los usuarios existentes bbin
  //Requiere autenticacion por eso ponemos verifyToken
  app.route("/api/users").get(verifyToken, userController.getUsers);

  /************ RUTAS DE VISTA ***********************/
  app.route("/api/filterClientes").get(filterController.getUserClientes);

  //************************************************AGENDAMIENTO **//

  // Crear un nuevo agendamiento
  app
    .route("/api/agendamientos")
    .post(agendamientoController.createAgendamiento);

  // Obtener la lista de veterinarios disponibles
  app
    .route("/api/veterinarios")
    .get(agendamientoController.obtenerVeterinarios);

  // Obtener todos los agendamientos
  app
    .route("/api/verAgendamientos")
    .get(agendamientoController.getAgendamientos);

  //Obteniendo las mascotas de los animales
  app.route("/api/mascotas").get(petController.getPetsClient);

  //Obteniendo citas associadas a veterinarios:
  app
    .route("/api/citas/veterinario/:id")
    .get(agendamientoController.obtenerCitasPorVeterinario);

  //Rutas Para Guardar Historial:
  app
    .route("/api/historialClinico")
    .post(historialController.saveHistorialClinico);

  // Rutas para filtrar historiaal
  app.route("/api/mascotasCliente").get(petController.filterPetUser);

  app.route("/api/historial").get(petController.historialPet);
};

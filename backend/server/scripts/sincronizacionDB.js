const { sequelize } = require("../config/database");
const Rol = require("../models/rolModel");
const User = require("../models/userModel");
const Mascota = require("../models/mascotaModel");
const Race = require("../models/raceModel");
const Especialidades = require("../models/especialidadesModel");

// Sincronizar modelos con la base de datos
sequelize
  .sync({ alter: true }) // `alter: true` realiza los cambios necesarios sin eliminar datos.
  .then(() => {
    console.log("¡Base de datos sincronizada con éxito!");
    process.exit(); // Finaliza el proceso tras sincronizar.
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
    process.exit(1);
  });

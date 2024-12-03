const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./userModel");
const Pet = require("./petModel");

const Agenda = sequelize.define("Agenda", {
  idAgenda: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horaFin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estadoAgenda: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "Pendiente", // Ejemplo de estado inicial
  },
});

Agenda.belongsTo(User, { foreignKey: "idUsuarioFk", as: "usuario" }); // Usuario que solicita la cita (cliente)
Agenda.belongsTo(User, { foreignKey: "idMedicoFk", as: "medico" }); // Veterinario que atenderá la cita
Agenda.belongsTo(Pet, { foreignKey: "idPetFk", as: "mascota" }); // Mascota asociada a la cita

module.exports = Agenda;

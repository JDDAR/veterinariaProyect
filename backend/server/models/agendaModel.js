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
  motivo: {
    type: DataTypes.STRING(200),
    allowNull: true, // Motivo opcional
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: true, // Duración en minutos
  },
  notaInicial: {
    type: DataTypes.STRING(300),
    allowNull: true, // Nota inicial opcional
  },
  estadoAgenda: {
    type: DataTypes.ENUM("Pendiente", "Confirmada", "Cancelada", "Activo"),
    allowNull: false,
    defaultValue: "pendiente",
  },
});

Agenda.belongsTo(User, { foreignKey: "idUsuarioFk", as: "usuario" }); // Usuario que solicita la cita
Agenda.belongsTo(User, { foreignKey: "idMedicoFk", as: "medico" }); // Veterinario
Agenda.belongsTo(Pet, { foreignKey: "idPetFk", as: "mascota" }); // Mascota

module.exports = Agenda;

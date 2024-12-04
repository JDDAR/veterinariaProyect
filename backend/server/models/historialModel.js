const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Agenda = require("./agendaModel");
const Pet = require("./petModel");
const User = require("./userModel");

const HistorialClinico = sequelize.define("HistorialClinico", {
  idHistorial: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fechaHistorial: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Fecha de creación por defecto
  },
  descripcionHistorial: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  estadoHistorial: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "Activo",
  },
  creadoPor: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  notas: {
    type: DataTypes.JSON, // Almacenaremos las notas como un JSON
    allowNull: true,
    defaultValue: [],
  },
  idAgendaFk: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  idPetFk: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  idUsuarioFk: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

HistorialClinico.belongsTo(Agenda, { foreignKey: "idAgendaFk", as: "agenda" }); // Relación con la agenda
HistorialClinico.belongsTo(Pet, { foreignKey: "idPetFk", as: "mascota" }); // Relación con la mascota
HistorialClinico.belongsTo(User, {
  foreignKey: "creadoPor",
  as: "veterinario",
}); // Relación con el veterinario

module.exports = HistorialClinico;

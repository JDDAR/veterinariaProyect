const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Agenda = require("./agendaModel");
const Pet = require("./petModel");

const HistorialClinico = sequelize.define("HistorialClinico", {
  idHistorial: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fechaHistorial: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descripcionHistorial: {
    type: DataTypes.TEXT,
    allowNull: true, // Descripción opcional
  },
  estadoHistorial: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "Activo", // Ejemplo de estado inicial
  },
});

HistorialClinico.belongsTo(Agenda, { foreignKey: "idAgendaFk", as: "agenda" }); // Relación con el agendamiento
HistorialClinico.belongsTo(Pet, { foreignKey: "idPetFk", as: "mascota" }); // Relación con la mascota

module.exports = HistorialClinico;

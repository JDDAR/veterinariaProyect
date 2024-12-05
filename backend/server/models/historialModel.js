const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const Agenda = require("./agendaModel");
const Pet = require("./petModel");
const User = require("./userModel");

class HistorialClinico extends Model {}

HistorialClinico.init(
  {
    idHistorial: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fechaHistorial: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
      type: DataTypes.JSON,
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
  },
  {
    sequelize,
    modelName: "HistorialClinico",
    tableName: "HistorialClinicos",
    timestamps: true,
  },
);

HistorialClinico.belongsTo(Agenda, { foreignKey: "idAgendaFk", as: "agenda" });
HistorialClinico.belongsTo(Pet, { foreignKey: "idPetFk", as: "mascota" });
HistorialClinico.belongsTo(User, {
  foreignKey: "creadoPor",
  as: "veterinario",
});

module.exports = HistorialClinico;
